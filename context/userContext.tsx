'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import { handleApiError } from '@/utils/handleAxiosToastErrors'

interface UserData {
  name: string
  email: string
  plan: string
  creditsRemaining: number
  totalUsage: number
}

interface ContentItem {
  _id: string
  originalInput: string
  tone: string
  platforms: string[]
  createdAt: string
  creditsUsed: number
  imageUrl?: string | null
}

interface UserContextType {
  userData: UserData | null
  recentHistory: ContentItem[]
  loading: boolean
  refreshUser: () => Promise<void>
  refreshHistory: () => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isLoaded } = useAuth()

  const [userData, setUserData] = useState<UserData | null>(null)
  const [recentHistory, setRecentHistory] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)


  const fetchUserProfile = async () => {
    try {
      const token = await getToken();
  
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUserData(res.data.user);
    } catch (error) {
      handleApiError(error);
      console.error("Profile Error:", error);
    }
  };
  
  const fetchUserCreationHistory = async () => {
    try {
      const token = await getToken();
  
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/history?limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setRecentHistory(res.data.data);
    } catch (error) {
      handleApiError(error);
      console.error("History Error:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true)

      await Promise.all([fetchUserProfile(), fetchUserCreationHistory()])
    } catch (error) {
      handleApiError(error)
      console.error('Context Fetch Error:', error)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    if (isLoaded) {
      fetchAllData()
    }
  }, [isLoaded])

  return (
    <UserContext.Provider
      value={{
        userData,
        recentHistory,
        loading,
        refreshUser: fetchUserProfile,
        refreshHistory: fetchUserCreationHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used inside UserProvider')
  }

  return context
}
