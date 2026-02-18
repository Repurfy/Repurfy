// 'use client'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import axios from 'axios'
// import { Facebook, Instagram, Linkedin, Search, Twitch, Twitter, X, Youtube } from 'lucide-react'
// import { useEffect, useState } from 'react'

// const History = () => {
//   const ButtonsData = [
//     {
//       title: 'LinkedIn',
//       image: <Linkedin />,
//     },
//     {
//       title: 'X (Twitter)',
//       image: <Twitter />,
//     },
//     {
//       title: 'Instagram',
//       image: <Instagram />,
//     },
//     {
//       title: 'Facebook',
//       image: <Facebook />,
//     },
//     // {
//     //   title: 'Youtube',
//     //   image: <Youtube />,
//     // },
//     // {
//     //   title: 'Twitch',
//     //   image: <Twitch />,
//     // },
//   ]

//   const [history, setHistory] = useState([])

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/history`)

//       const data = await res.data

//       console.log('Hostory', data)
//       // setHistory(() => data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchHistory()
//   }, [])

//   return (
//     <div className="h-fit">
//       <h1 className="text-2xl font-bold tracking-tight">Content History</h1>
//       <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
//         View and manage your generated content
//       </p>

//       <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
//         <div className="flex items-center gap-3">
//           <div className="relative w-full md:w-1/2 lg:w-130">
//             <Input
//               type="text"
//               placeholder="Search by title or content..."
//               className="focus:border-brand-teal focus:ring-brand-teal w-full rounded-lg border-2 bg-transparent px-4 py-2 pl-8 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-gray-400 dark:text-white"
//             />
//             <Search
//               size={16}
//               className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-gray-400"
//             />
//           </div>
//           <Button>All</Button>
//           <div className="ml-auto flex space-x-3">
//             {ButtonsData.map((button, index) => (
//               <Button key={index} variant="outline" className="ml-2">
//                 <span>{button.image}</span>
//                 <span className="ml-2">{button.title}</span>
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default History

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Facebook, Instagram, Linkedin, Search, Twitter, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const History = () => {
  const ButtonsData = [
    { title: 'LinkedIn', image: <Linkedin size={16} /> },
    { title: 'X (Twitter)', image: <Twitter size={16} /> },
    { title: 'Instagram', image: <Instagram size={16} /> },
    { title: 'Facebook', image: <Facebook size={16} /> },
  ]

  const [history, setHistory] = useState<any[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // 🔥 FETCH HISTORY

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/history`)

        console.log('History API:', res.data)

        setHistory(res.data.data || [])
      } catch (error) {
        console.error('History fetch error:', error)
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className="h-fit">
      <h1 className="text-2xl font-bold tracking-tight">Content History</h1>
      <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
        View and manage your generated content
      </p>

      {/* 🔍 SEARCH + FILTER BAR */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-1/2 lg:w-130">
            <Input
              type="text"
              placeholder="Search by title or content..."
              className="focus:border-brand-teal focus:ring-brand-teal w-full rounded-lg border-2 bg-transparent px-4 py-2 pl-8 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:outline-none dark:border-gray-400 dark:text-white"
            />
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <Button>All</Button>

          <div className="ml-auto flex space-x-3">
            {ButtonsData.map((button, index) => (
              <Button key={index} variant="outline">
                {button.image}
                <span className="ml-2">{button.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 HISTORY CARDS */}
      <div className="mt-6 space-y-5">
        {history.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm dark:bg-slate-800">
            <p className="text-lg font-medium">No history yet 🚀</p>
            <p className="text-text-secondary text-sm">Generate content to see history here</p>
          </div>
        )}

        {history.map((item) => {
          const isOpen = expandedId === item._id

          return (
            <div
              key={item._id}
              className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-800"
            >
              {/* HEADER */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                {/* LEFT */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.originalInput?.slice(0, 90)}...</h3>

                  <div className="text-text-secondary mt-1 flex flex-wrap gap-3 text-sm">
                    <span>🎯 {item.tone}</span>
                    <span>👥 {item.audience}</span>
                    <span>⚡ {item.creditsUsed} credits</span>
                    <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap gap-2">
                  {item.platforms?.map((p: string) => (
                    <span
                      key={p}
                      className="bg-brand-teal/10 text-brand-teal rounded-full px-3 py-2 text-xs font-medium"
                    >
                      {p}
                    </span>
                  ))}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedId(isOpen ? null : item._id)}
                  >
                    {isOpen ? 'Hide' : 'View'}
                  </Button>
                </div>
              </div>

              {/* 🔥 EXPANDED CONTENT */}
              {isOpen && (
                <div className="mt-6 space-y-6 border-t pt-6">
                  {/* PLATFORM CONTENT */}
                  {Object.entries(item.generatedContent || {}).map(([platform, content]: any) => {
                    if (Array.isArray(content)) return null

                    return (
                      <div key={platform}>
                        <h4 className="text-brand-teal mb-2 text-sm font-semibold uppercase">
                          {platform}
                        </h4>

                        <div className="bg-surface-elevated rounded-lg p-4 text-sm leading-relaxed dark:bg-slate-900/60">
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="mb-2 text-lg font-bold">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-md mb-2 font-semibold">{children}</h2>
                              ),
                              p: ({ children }) => (
                                <p className="mb-3 leading-relaxed">{children}</p>
                              ),
                              li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
                              strong: ({ children }) => (
                                <strong className="font-semibold">{children}</strong>
                              ),
                            }}
                          >
                            {content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )
                  })}

                  {/* HOOKS */}
                  {item.generatedContent?.hooks && (
                    <div>
                      <h4 className="text-brand-teal mb-2 text-sm font-semibold">Hooks</h4>
                      <ul className="space-y-2">
                        {item.generatedContent.hooks.map((hook: string, i: number) => (
                          <li
                            key={i}
                            className="bg-surface-elevated rounded-lg p-3 text-sm dark:bg-slate-900/60"
                          >
                            <ReactMarkdown>{hook}</ReactMarkdown>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* HASHTAGS */}
                  {item.generatedContent?.hashtags && (
                    <div>
                      <h4 className="text-brand-teal mb-2 text-sm font-semibold">Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.generatedContent.hashtags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default History
