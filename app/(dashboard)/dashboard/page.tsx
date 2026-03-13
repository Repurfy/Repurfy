// // import { Button } from '@/components/ui/button'
// // import { Slider } from '@/components/ui/slider'
// // import { ArrowRight, Clock, Edit, Sparkles, TrendingUp } from 'lucide-react'
// // import Image from 'next/image'
// // import Link from 'next/link'

// // interface activityDataTypes {
// //   activityTitle: string
// //   platformsPublished: number
// //   publishedAt: number
// //   image: string
// //   activityStatus: string
// // }

// // const DashboardPage = () => {
// //   const remainingCredits = 2

// //   const recentActivityData: activityDataTypes[] = [
// //     {
// //       activityTitle: 'Product Launch Post',
// //       platformsPublished: 6,
// //       publishedAt: 2,
// //       image: '/logo.svg',
// //       activityStatus: 'Completed',
// //     },
// //     {
// //       activityTitle: 'Product Launch Post 2',
// //       platformsPublished: 6,
// //       publishedAt: 2,
// //       image: '/logo.svg',
// //       activityStatus: 'Incomplete',
// //     },
// //   ]

// //   return (
// //     <div className="space-y-10">
// //       {/* Greeting Card */}
// //       <div className="bg-brand-gradient-soft flex items-center justify-between rounded-xl p-6 shadow-sm">
// //         <div>
// //           <h1 className="text-xl font-semibold md:text-2xl">Welcome back, Rahul! 👋</h1>
// //           <p className="pt-2">
// //             You have{' '}
// //             <span className="text-brand-blue dark:text-brand-teal font-semibold">
// //               {remainingCredits} repurposings
// //             </span>{' '}
// //             remaining this month. Keep creating!
// //           </p>
// //         </div>
// //         <Link href={'/create-content'}>
// //           <Button className="text-white">
// //             <span>
// //               <Edit />
// //             </span>
// //             Create Post
// //           </Button>
// //         </Link>
// //       </div>

// //       {/* Monthly Usage */}
// //       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// //         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h2 className="text-muted-foreground">Posts Generated</h2>
// //               <h3 className="text-3xl font-semibold">12</h3>
// //               <h3 className="text-muted-foreground my-2 text-xs font-normal">
// //                 of 25 monthly limit
// //               </h3>
// //             </div>
// //             <div className="bg-brand-teal/30 rounded-lg p-3">
// //               <Sparkles className="text-brand-teal" />
// //             </div>
// //           </div>

// //           <Slider value={[22]} max={24} step={1} className="mt-4" />
// //         </div>

// //         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h2 className="text-muted-foreground">Time Saved</h2>
// //               <h3 className="text-3xl font-semibold">180 min</h3>
// //               <h3 className="text-muted-foreground my-2 text-xs font-normal">
// //                 ~15 min saved per post
// //               </h3>
// //             </div>
// //             <div className="bg-brand-teal/30 rounded-lg p-3">
// //               <Clock className="text-brand-teal" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h2 className="text-muted-foreground">Current Plan</h2>
// //               <h3 className="text-3xl font-semibold">Free</h3>
// //               <h3 className="text-muted-foreground my-2 text-xs font-normal">
// //                 Upgrade for unlimited posts
// //               </h3>
// //             </div>
// //             <div className="bg-brand-teal/30 rounded-lg p-3">
// //               <TrendingUp className="text-brand-teal" />
// //             </div>
// //           </div>
// //           <Link href={'/pricing'}>
// //             <Button className="text-xs text-white" size={'sm'}>
// //               Upgrade
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Grid Section */}
// //       {/* Recent Activity */}
// //       <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
// //         <div className="flex items-center justify-between font-sans">
// //           <h2 className="text-lg font-semibold">Recent Activity</h2>
// //           <Link href={'/history'}>
// //             <Button variant={'link'} className="flex items-center gap-2 text-sm">
// //               View all
// //               <span>
// //                 <ArrowRight className="text-xs" size={18} />
// //               </span>
// //             </Button>
// //           </Link>
// //         </div>

// //         <div className="mt-6 space-y-6">
// //           {recentActivityData.map((activity, index) => (
// //             <div
// //               key={index}
// //               className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-700/40 dark:hover:bg-slate-700"
// //             >
// //               {/* Left */}
// //               <div className="flex items-center gap-4">
// //                 <div className="relative">
// //                   <Image
// //                     src={activity.image}
// //                     width={50}
// //                     height={50}
// //                     alt={activity.activityTitle}
// //                     className="rounded-md border bg-white dark:border-slate-600"
// //                   />
// //                   <div
// //                     className={`absolute -right-1 bottom-0 h-3 w-3 rounded-full border border-white ${
// //                       activity.activityStatus === 'Completed' ? 'bg-green-500' : 'bg-red-500'
// //                     }`}
// //                   ></div>
// //                 </div>

// //                 <div>
// //                   <h3 className="font-medium">{activity.activityTitle}</h3>
// //                   <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
// //                     <span>{activity.platformsPublished} platforms</span>
// //                     <span className="h-1 w-1 rounded-full bg-slate-400"></span>
// //                     <span>{activity.publishedAt} hours ago</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Status */}
// //               <div
// //                 className={`hidden rounded-full px-3 py-1 text-xs font-medium lg:block ${
// //                   activity.activityStatus === 'Completed'
// //                     ? 'bg-green-100 text-green-700 dark:bg-green-700/40 dark:text-green-200'
// //                     : 'bg-red-100 text-red-700 dark:bg-red-700/40 dark:text-red-200'
// //                 }`}
// //               >
// //                 {activity.activityStatus}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Platform Distribution
// //       <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
// //         <h2 className="text-lg font-semibold">Platform Distribution</h2>

// //         <p className="mt-3 text-sm">
// //           Total Posts Generated
// //           <span className="text-brand-blue float-right font-semibold">22/24</span>
// //         </p>

// //         <Slider value={[22]} max={24} step={1} className="text-brand-teal mt-4" />
// //       </div>  */}
// //     </div>
// //   )
// // }

// // export default DashboardPage

// 'use client'

// import { Button } from '@/components/ui/button'
// import { Slider } from '@/components/ui/slider'
// import { ArrowRight, Clock, Edit, Sparkles, TrendingUp } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { motion, type Variants } from 'framer-motion'

// interface ActivityDataTypes {
//   activityTitle: string
//   platformsPublished: number
//   publishedAt: number
//   image: string
//   activityStatus: string
// }

// const pageVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       stiffness: 140,
//       damping: 26,
//       staggerChildren: 0.08,
//     },
//   },
// }

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'spring',
//       stiffness: 140,
//       damping: 28,
//     },
//   },
// }

// const DashboardPage = () => {
//   const remainingCredits = 2

//   const recentActivityData: ActivityDataTypes[] = [
//     {
//       activityTitle: 'Product Launch Post',
//       platformsPublished: 6,
//       publishedAt: 2,
//       image: '/logo.svg',
//       activityStatus: 'Completed',
//     },
//     {
//       activityTitle: 'Product Launch Post 2',
//       platformsPublished: 6,
//       publishedAt: 2,
//       image: '/logo.svg',
//       activityStatus: 'Incomplete',
//     },
//   ]

//   return (
//     <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-10">
//       <motion.div
//         variants={cardVariants}
//         className="bg-brand-gradient-soft flex items-center justify-between rounded-xl p-6 shadow-sm"
//       >
//         <div className="">
//           <h1 className="text-xl font-semibold md:text-2xl">Welcome back, Rahul! 👋</h1>
//           <p className="pt-2">
//             You have{' '}
//             <span className="text-brand-blue dark:text-brand-teal font-semibold">
//               {remainingCredits} repurposings
//             </span>{' '}
//             remaining this month. Keep creating!
//           </p>
//         </div>

//         <Link href="/create">
//           <Button className="text-white transition-transform hover:scale-105">
//             <Edit />
//             Create Post
//           </Button>
//         </Link>
//       </motion.div>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <motion.div
//           variants={cardVariants}
//           className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Posts Generated</h2>
//               <h3 className="text-3xl font-semibold">12</h3>
//               <p className="text-muted-foreground my-2 text-xs">of 25 monthly limit</p>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <Sparkles className="text-brand-teal" />
//             </div>
//           </div>
//           <Slider value={[22]} max={24} step={1} className="mt-4" />
//         </motion.div>

//         <motion.div
//           variants={cardVariants}
//           className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Time Saved</h2>
//               <h3 className="text-3xl font-semibold">180 min</h3>
//               <p className="text-muted-foreground my-2 text-xs">~15 min saved per post</p>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <Clock className="text-brand-teal" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={cardVariants}
//           className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Current Plan</h2>
//               <h3 className="text-3xl font-semibold">Free</h3>
//               <p className="text-muted-foreground my-2 text-xs">Upgrade for unlimited posts</p>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <TrendingUp className="text-brand-teal" />
//             </div>
//           </div>

//           <Link href="/pricing">
//             <Button size="sm" className="text-xs text-white transition-transform hover:scale-105">
//               Upgrade
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       <motion.div
//         variants={cardVariants}
//         className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
//       >
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Recent Activity</h2>
//           <Link href="/history">
//             <Button variant="link" className="flex items-center gap-2 text-sm">
//               View all
//               <ArrowRight size={18} />
//             </Button>
//           </Link>
//         </div>

//         <div className="mt-6 space-y-6">
//           {recentActivityData.map((activity, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/40"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <Image
//                     src={activity.image}
//                     width={50}
//                     height={50}
//                     alt={activity.activityTitle}
//                     className="rounded-md border bg-white dark:border-slate-600"
//                   />
//                   <div
//                     className={`absolute -right-1 bottom-0 h-3 w-3 rounded-full border border-white ${
//                       activity.activityStatus === 'Completed' ? 'bg-green-500' : 'bg-red-500'
//                     }`}
//                   />
//                 </div>

//                 <div>
//                   <h3 className="font-medium">{activity.activityTitle}</h3>
//                   <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
//                     <span>{activity.platformsPublished} platforms</span>
//                     <span className="h-1 w-1 rounded-full bg-slate-400" />
//                     <span>{activity.publishedAt} hours ago</span>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`hidden rounded-full px-3 py-1 text-xs font-medium lg:block ${
//                   activity.activityStatus === 'Completed'
//                     ? 'bg-green-100 text-green-700 dark:bg-green-700/40 dark:text-green-200'
//                     : 'bg-red-100 text-red-700 dark:bg-red-700/40 dark:text-red-200'
//                 }`}
//               >
//                 {activity.activityStatus}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default DashboardPage

'use client'

import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Clock,
  Edit,
  Sparkles,
  TrendingUp,
  Zap,
  BarChart3,
  FileText,
  // Target,
} from 'lucide-react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 160, damping: 26 },
  },
}

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  twitter: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  instagram: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  facebook: 'bg-blue-600/10 text-blue-500 border-blue-600/20',
}

const DashboardPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [recentHistory, setRecentHistory] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken()
        const headers = { Authorization: `Bearer ${token}` }

        const [userRes, historyRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, { headers }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/history?limit=4`, { headers }),
        ])

        setUserData(userRes.data.user || null)
        setRecentHistory(historyRes.data.data || [])
      } catch (error) {
        console.error('Dashboard fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [getToken])

  const firstName = userData?.name?.split(' ')[0] || 'there'
  const creditPercent = userData ? Math.min((userData.creditsRemaining / 30) * 100, 100) : 0
  const timeSaved = (userData?.totalUsage ?? 0) * 15

  const stats = [
    {
      label: 'Posts Generated',
      value: userData?.totalUsage ?? 0,
      suffix: '',
      icon: FileText,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/20',
      desc: 'Total content created',
    },
    {
      label: 'Time Saved',
      value: timeSaved,
      suffix: ' min',
      icon: Clock,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      desc: '~15 min saved per post',
    },
    {
      label: 'Credits Left',
      value: userData?.creditsRemaining ?? 0,
      suffix: '',
      icon: Zap,
      color:
        creditPercent < 20
          ? 'text-red-400'
          : creditPercent < 40
            ? 'text-orange-400'
            : 'text-emerald-400',
      bg:
        creditPercent < 20
          ? 'bg-red-500/10'
          : creditPercent < 40
            ? 'bg-orange-500/10'
            : 'bg-emerald-500/10',
      border:
        creditPercent < 20
          ? 'border-red-500/20'
          : creditPercent < 40
            ? 'border-orange-500/20'
            : 'border-emerald-500/20',
      desc: 'Available this month',
    },
    {
      label: 'Current Plan',
      value: userData?.plan ?? 'Free',
      suffix: '',
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      desc: 'Active subscription',
      isText: true,
    },
  ]

  const quickActions = [
    {
      label: 'Create new post',
      icon: Edit,
      href: '/create',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
    {
      label: 'View history',
      icon: BarChart3,
      href: '/history',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Upgrade plan',
      icon: TrendingUp,
      href: '/pricing',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6 pb-10">
      {/* ── Hero greeting ── */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 sm:p-8"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-0.5 text-xs font-medium text-teal-400">
                {loading ? '...' : `${userData?.plan ?? 'Free'} Plan`}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome back, {loading ? '...' : firstName}! 👋
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              {loading
                ? 'Loading your stats...'
                : userData?.creditsRemaining === 0
                  ? "You're out of credits. Upgrade to keep creating!"
                  : `You have ${userData?.creditsRemaining} credits remaining. Keep creating!`}
            </p>

            {/* Credit progress bar */}
            {userData && (
              <div className="mt-4 w-full max-w-xs">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Credits used</span>
                  <span>{30 - (userData.creditsRemaining ?? 0)} / 30</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - creditPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    className={`h-1.5 rounded-full ${
                      creditPercent < 20
                        ? 'bg-red-500'
                        : creditPercent < 40
                          ? 'bg-orange-500'
                          : 'bg-teal-500'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {userData?.creditsRemaining === 0 && (
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="border-orange-500/40 text-orange-400 hover:bg-orange-500/10"
                >
                  <Zap className="h-4 w-4" />
                  Upgrade
                </Button>
              </Link>
            )}
            <Link href="/create">
              <Button className="bg-teal-500 text-white hover:bg-teal-600">
                <Edit className="h-4 w-4" />
                Create Post
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-slate-800/60 p-5 transition-all hover:bg-slate-800`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className={`mt-1.5 text-2xl font-bold ${stat.color} capitalize`}>
                    {loading ? '—' : `${stat.value}${stat.suffix}`}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{stat.desc}</p>
                </div>
                <div className={`rounded-xl ${stat.bg} p-2.5`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>

              {/* Upgrade button for plan card */}
              {stat.label === 'Current Plan' && userData?.plan === 'free' && (
                <Link href="/pricing">
                  <button className="mt-3 text-xs font-medium text-amber-400 transition-colors hover:text-amber-300">
                    Upgrade →
                  </button>
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── Quick actions + Recent Activity ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Quick Actions */}
        <motion.div
          variants={item}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5"
        >
          <p className="mb-4 text-sm font-semibold text-white">Quick Actions</p>
          <div className="space-y-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.label} href={action.href}>
                  <div className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700/40 p-3 transition-all hover:border-slate-600 hover:bg-slate-700/40">
                    <div className={`rounded-lg ${action.bg} p-2`}>
                      <Icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="text-sm text-slate-300">{action.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-600" />
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={item}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent Activity</p>
            <Link href="/history">
              <button className="flex items-center gap-1 text-xs text-teal-400 transition-colors hover:text-teal-300">
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-700/40" />
              ))}
            </div>
          ) : recentHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 rounded-full bg-slate-700/40 p-4">
                <Sparkles className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-400">No content yet</p>
              <p className="mt-1 text-xs text-slate-600">
                Generate your first post to see activity
              </p>
              <Link href="/create" className="mt-4">
                <Button size="sm" className="bg-teal-500 text-xs text-white hover:bg-teal-600">
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((historyItem) => (
                <motion.div
                  key={historyItem._id}
                  whileHover={{ x: 3 }}
                  onClick={() => router.push(`/results/${historyItem._id}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700/40 p-3 transition-all hover:border-slate-600 hover:bg-slate-700/30"
                >
                  {/* Thumbnail or placeholder */}
                  {historyItem.imageUrl ? (
                    <Image
                      src={historyItem.imageUrl}
                      alt="thumbnail"
                      width={10}
                      height={10}
                      className="h-10 w-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-700">
                      <FileText className="h-4 w-4 text-slate-500" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {historyItem.originalInput?.slice(0, 60)}
                      {historyItem.originalInput?.length > 60 ? '...' : ''}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {new Date(historyItem.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <div className="flex gap-1">
                        {historyItem.platforms?.slice(0, 3).map((p) => (
                          <span
                            key={p}
                            className={`rounded-full border px-2 py-0.5 text-xs capitalize ${PLATFORM_COLORS[p] || 'border-slate-600 bg-slate-700 text-slate-400'}`}
                          >
                            {p}
                          </span>
                        ))}
                        {historyItem.platforms?.length > 3 && (
                          <span className="rounded-full border border-slate-600 bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
                            +{historyItem.platforms.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardPage
