// import { Button } from '@/components/ui/button'
// import { Slider } from '@/components/ui/slider'
// import { ArrowRight, Clock, Edit, Sparkles, TrendingUp } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'

// interface activityDataTypes {
//   activityTitle: string
//   platformsPublished: number
//   publishedAt: number
//   image: string
//   activityStatus: string
// }

// const DashboardPage = () => {
//   const remainingCredits = 2

//   const recentActivityData: activityDataTypes[] = [
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
//     <div className="space-y-10">
//       {/* Greeting Card */}
//       <div className="bg-brand-gradient-soft flex items-center justify-between rounded-xl p-6 shadow-sm">
//         <div>
//           <h1 className="text-xl font-semibold md:text-2xl">Welcome back, Rahul! 👋</h1>
//           <p className="pt-2">
//             You have{' '}
//             <span className="text-brand-blue dark:text-brand-teal font-semibold">
//               {remainingCredits} repurposings
//             </span>{' '}
//             remaining this month. Keep creating!
//           </p>
//         </div>
//         <Link href={'/create-content'}>
//           <Button className="text-white">
//             <span>
//               <Edit />
//             </span>
//             Create Post
//           </Button>
//         </Link>
//       </div>

//       {/* Monthly Usage */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Posts Generated</h2>
//               <h3 className="text-3xl font-semibold">12</h3>
//               <h3 className="text-muted-foreground my-2 text-xs font-normal">
//                 of 25 monthly limit
//               </h3>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <Sparkles className="text-brand-teal" />
//             </div>
//           </div>

//           <Slider value={[22]} max={24} step={1} className="mt-4" />
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Time Saved</h2>
//               <h3 className="text-3xl font-semibold">180 min</h3>
//               <h3 className="text-muted-foreground my-2 text-xs font-normal">
//                 ~15 min saved per post
//               </h3>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <Clock className="text-brand-teal" />
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-muted-foreground">Current Plan</h2>
//               <h3 className="text-3xl font-semibold">Free</h3>
//               <h3 className="text-muted-foreground my-2 text-xs font-normal">
//                 Upgrade for unlimited posts
//               </h3>
//             </div>
//             <div className="bg-brand-teal/30 rounded-lg p-3">
//               <TrendingUp className="text-brand-teal" />
//             </div>
//           </div>
//           <Link href={'/pricing'}>
//             <Button className="text-xs text-white" size={'sm'}>
//               Upgrade
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Grid Section */}
//       {/* Recent Activity */}
//       <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
//         <div className="flex items-center justify-between font-sans">
//           <h2 className="text-lg font-semibold">Recent Activity</h2>
//           <Link href={'/history'}>
//             <Button variant={'link'} className="flex items-center gap-2 text-sm">
//               View all
//               <span>
//                 <ArrowRight className="text-xs" size={18} />
//               </span>
//             </Button>
//           </Link>
//         </div>

//         <div className="mt-6 space-y-6">
//           {recentActivityData.map((activity, index) => (
//             <div
//               key={index}
//               className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-700/40 dark:hover:bg-slate-700"
//             >
//               {/* Left */}
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
//                   ></div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium">{activity.activityTitle}</h3>
//                   <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
//                     <span>{activity.platformsPublished} platforms</span>
//                     <span className="h-1 w-1 rounded-full bg-slate-400"></span>
//                     <span>{activity.publishedAt} hours ago</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Status */}
//               <div
//                 className={`hidden rounded-full px-3 py-1 text-xs font-medium lg:block ${
//                   activity.activityStatus === 'Completed'
//                     ? 'bg-green-100 text-green-700 dark:bg-green-700/40 dark:text-green-200'
//                     : 'bg-red-100 text-red-700 dark:bg-red-700/40 dark:text-red-200'
//                 }`}
//               >
//                 {activity.activityStatus}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Platform Distribution
//       <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
//         <h2 className="text-lg font-semibold">Platform Distribution</h2>

//         <p className="mt-3 text-sm">
//           Total Posts Generated
//           <span className="text-brand-blue float-right font-semibold">22/24</span>
//         </p>

//         <Slider value={[22]} max={24} step={1} className="text-brand-teal mt-4" />
//       </div>  */}
//     </div>
//   )
// }

// export default DashboardPage

'use client'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ArrowRight, Clock, Edit, Sparkles, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'

interface ActivityDataTypes {
  activityTitle: string
  platformsPublished: number
  publishedAt: number
  image: string
  activityStatus: string
}

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 26,
      staggerChildren: 0.08,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 28,
    },
  },
}

const DashboardPage = () => {
  const remainingCredits = 2

  const recentActivityData: ActivityDataTypes[] = [
    {
      activityTitle: 'Product Launch Post',
      platformsPublished: 6,
      publishedAt: 2,
      image: '/logo.svg',
      activityStatus: 'Completed',
    },
    {
      activityTitle: 'Product Launch Post 2',
      platformsPublished: 6,
      publishedAt: 2,
      image: '/logo.svg',
      activityStatus: 'Incomplete',
    },
  ]

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div
        variants={cardVariants}
        className="bg-brand-gradient-soft flex items-center justify-between rounded-xl p-6 shadow-sm"
      >
        <div className="">
          <h1 className="text-xl font-semibold md:text-2xl">Welcome back, Rahul! 👋</h1>
          <p className="pt-2">
            You have{' '}
            <span className="text-brand-blue dark:text-brand-teal font-semibold">
              {remainingCredits} repurposings
            </span>{' '}
            remaining this month. Keep creating!
          </p>
        </div>

        <Link href="/create-content">
          <Button className="text-white transition-transform hover:scale-105">
            <Edit />
            Create Post
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          variants={cardVariants}
          className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground">Posts Generated</h2>
              <h3 className="text-3xl font-semibold">12</h3>
              <p className="text-muted-foreground my-2 text-xs">of 25 monthly limit</p>
            </div>
            <div className="bg-brand-teal/30 rounded-lg p-3">
              <Sparkles className="text-brand-teal" />
            </div>
          </div>
          <Slider value={[22]} max={24} step={1} className="mt-4" />
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground">Time Saved</h2>
              <h3 className="text-3xl font-semibold">180 min</h3>
              <p className="text-muted-foreground my-2 text-xs">~15 min saved per post</p>
            </div>
            <div className="bg-brand-teal/30 rounded-lg p-3">
              <Clock className="text-brand-teal" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-muted-foreground">Current Plan</h2>
              <h3 className="text-3xl font-semibold">Free</h3>
              <p className="text-muted-foreground my-2 text-xs">Upgrade for unlimited posts</p>
            </div>
            <div className="bg-brand-teal/30 rounded-lg p-3">
              <TrendingUp className="text-brand-teal" />
            </div>
          </div>

          <Link href="/pricing">
            <Button size="sm" className="text-xs text-white transition-transform hover:scale-105">
              Upgrade
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        variants={cardVariants}
        className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Link href="/history">
            <Button variant="link" className="flex items-center gap-2 text-sm">
              View all
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="mt-6 space-y-6">
          {recentActivityData.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/40"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={activity.image}
                    width={50}
                    height={50}
                    alt={activity.activityTitle}
                    className="rounded-md border bg-white dark:border-slate-600"
                  />
                  <div
                    className={`absolute -right-1 bottom-0 h-3 w-3 rounded-full border border-white ${
                      activity.activityStatus === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>

                <div>
                  <h3 className="font-medium">{activity.activityTitle}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                    <span>{activity.platformsPublished} platforms</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>{activity.publishedAt} hours ago</span>
                  </div>
                </div>
              </div>

              <div
                className={`hidden rounded-full px-3 py-1 text-xs font-medium lg:block ${
                  activity.activityStatus === 'Completed'
                    ? 'bg-green-100 text-green-700 dark:bg-green-700/40 dark:text-green-200'
                    : 'bg-red-100 text-red-700 dark:bg-red-700/40 dark:text-red-200'
                }`}
              >
                {activity.activityStatus}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage
