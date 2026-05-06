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
  Images,
} from 'lucide-react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@/context/userContext'

import { useTour } from '@/context/tourContext'
import { Joyride } from "react-joyride"
import { useEffect, useState } from 'react'
import { JoyrideTooltip } from '@/components/JoyrideTooltip'

interface demo {
  zIndex: number;
  overlayColor: string;
  arrowColor: string;
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
  linkedin: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20',
  twitter: 'bg-[#000000]/10 text-[#000000] dark:text-white border-[#000000]/20',
  instagram: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20',
  facebook: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20',
}

const DashboardPage = () => {
  const router = useRouter()

  const { userData, loading, recentHistory } = useUser()

  const firstName = userData?.name?.split(' ')[0] || 'Guest User'
  const PLAN_CREDITS = {
    free: 30,
    pro: 100,
    enterprise: 500,
  }

  const totalCredits = PLAN_CREDITS[userData?.plan as keyof typeof PLAN_CREDITS] || 30

  const creditUsagePercent = userData
    ? Math.min(((totalCredits - userData.creditsRemaining) / totalCredits) * 100, 100)
    : 0

  const timeSaved = (userData?.totalUsage ?? 0) * 15

  const stats = [
    {
      id: "post-generated-btn",
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
      id: "time-saved-btn",
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
      id: "credits-btn-tour",
      label: 'Credits Left',
      value: userData?.creditsRemaining ?? 0,
      suffix: '',
      icon: Zap,
      color:
        creditUsagePercent < 20
          ? 'text-red-400'
          : creditUsagePercent < 40
            ? 'text-orange-400'
            : 'text-emerald-400',
      bg:
        creditUsagePercent < 20
          ? 'bg-red-500/10'
          : creditUsagePercent < 40
            ? 'bg-orange-500/10'
            : 'bg-emerald-500/10',
      border:
        creditUsagePercent < 20
          ? 'border-red-500/20'
          : creditUsagePercent < 40
            ? 'border-orange-500/20'
            : 'border-emerald-500/20',
      desc: 'Available this month',
    },
    {
      id: "current-plan-btn",
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
      id: "create-btn-tour",
      label: 'Create new post',
      icon: Edit,
      href: '/create',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
    {
      id: "view-history-btn-tour",
      label: 'View history',
      icon: BarChart3,
      href: '/history',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      id: "upgrade-btn-tour",
      label: 'Upgrade plan',
      icon: TrendingUp,
      href: '/pricing',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  const { runTour, setRunTour, stepIndex, setStepIndex } = useTour();
  const [isReady, setIsReady] = useState(false);

  // const steps = [
  //   {
  //     title: "Welcome to Repurfy! 🚀",
  //     content: "Let's take a quick tour of your new content command center.",
  //     target: "body",
  //     placement: "center" as const
  //   },
  //   {
  //     title: "Credit Balance",
  //     content: "This is your current credit balance. Every post consumes 5 credits.",
  //     target: "#credits-btn-tour"
  //   },
  //   {
  //     title: "Repurpose Your Post",
  //     content: "Click here to turn your ideas into social media posts instantly.",
  //     target: "#create-btn-tour"
  //   },
  //   {
  //     title: "View History",
  //     content: "Click here to view your repurposed posts.",
  //     target: "#view-history-btn-tour"
  //   },
  //   {
  //     title: "Upgrade Your Plan",
  //     content: "Click here to upgrade your plan and get more credits.",
  //     target: "#upgrade-btn-tour"
  //   }
  // ]

  const steps = [
    {
      title: "Welcome to Repurfy 👋",
      content:
        "Turn one idea into content for multiple platforms in seconds. Let’s show you around.",
      target: "body",
      placement: "center" as const,
      disableBeacon: true,
    },
    {
      title: "Your Credits",
      content:
        `Every generation uses credits. You currently have ${userData?.creditsRemaining} free credits to explore Repurfy.`,
      target: "#credits-btn-tour",
    },
    {
      title: "Create Content",
      content:
        "Start here to transform your ideas into platform-ready social media posts instantly.",
      target: "#create-btn-tour",
    },
    {
      title: "Content History",
      content:
        "All your generated posts are saved here so you can revisit or reuse them anytime.",
      target: "#view-history-btn-tour",
    },
    {
      title: "Upgrade Anytime",
      content:
        "Need more generations or advanced features? You can upgrade your plan anytime.",
      target: "#upgrade-btn-tour",
    },
  ];


  useEffect(() => {
    if (!loading && userData) {
      setIsReady(true);
    }
  }, [loading, userData]);

  useEffect(() => {
    const hasSeen = localStorage.getItem("tourCompleted");
    if (isReady && !hasSeen) {
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;

    if (status === "finished") {
      setRunTour(false);
      localStorage.setItem("tourCompleted", "true");
    } else if (status === "skipped") {
      setRunTour(false);
    }
  };

  return (
    <>

      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        tooltipComponent={JoyrideTooltip}
        onEvent={handleJoyrideCallback}
        styles={{
          beaconInner: {
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
          },
          beaconOuter: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
        }}
      />

      <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6 pb-10">
        {/* ── Hero greeting ── */}
        <motion.div
          variants={item}
          className="relative rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 sm:p-8"
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="absolute -bottom-10 left-1/3 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-3 -ml-1.5 py-1 text-xs font-semibold text-teal-400 capitalize">
                  {loading ? '...' : `${userData?.plan ?? 'Free'} Plan`}
                </span>
              </div>
              <h1 className="text-2xl font-bold  text-white sm:text-3xl">
                Welcome back, {loading ? '...' : firstName}! 👋
              </h1>
              <p className="mt-1.5 text-[14px] font-ai text-slate-400">
                {loading
                  ? 'Loading your stats...'
                  : userData?.creditsRemaining === 0
                    ? "You're out of credits. Upgrade to keep creating!"
                    : `You have ${userData?.creditsRemaining} credits remaining. Keep creating!`}
              </p>

              {/* Credit progress bar */}
              {userData && (
                <div className="mt-4 w-full font-ai max-w-xs">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
                    <span>Credits used</span>
                    <span>{userData.totalUsage} / 30</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${creditUsagePercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      className={`h-1.5 rounded-full ${creditUsagePercent < 20
                        ? 'bg-red-500'
                        : creditUsagePercent < 40
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
              <div>
                <Link href="/create" onClick={() => {
                  localStorage.setItem("tourSeen", "true");
                  setRunTour(false);
                }}>
                  <Button className="bg-teal-500 text-white hover:bg-teal-600">
                    <Edit className="h-4 w-4" />
                    Create Post
                  </Button>
                </Link>
              </div>
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
                className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-slate-800/60 p-4 transition-all hover:bg-slate-800`}
              >
                <div id={stat.id || ""} className="flex items-start justify-between h-fit">
                  <div>
                    <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                    <p className={`mt-2 text-2xl font-bold ${stat.color} capitalize`}>
                      {loading ? '—' : `${stat.value}${stat.suffix}`}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{stat.desc}</p>
                  </div>
                  <div className={`rounded-xl ${stat.bg} p-2.5`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>

                {/* Upgrade button for plan card */}
                {stat.label === 'Current Plan' && userData?.plan === 'free' && (
                  <Link href="/pricing">
                    <button className="absolute bottom-4 right-4 cursor-pointer text-xs font-medium text-amber-400 transition-colors hover:text-amber-300">
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

          {/* Recent Activity */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5 lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-white">Recent Activity</p>
              <Link href="/history">
                <button className="flex cursor-pointer items-center gap-1 text-sm text-teal-400 transition-colors hover:text-teal-300">
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
                <p className="font-medium text-slate-400">No content yet</p>
                <p className="mt-1 text-sm text-slate-600">
                  Generate your first post to see activity
                </p>
                <Link href="/create" className="mt-4">
                  <Button className="bg-teal-500 text-sm text-white hover:bg-teal-600">
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
                    transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
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
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-700">
                        <Images className="h-4 w-4 text-slate-500 lg:h-6 lg:w-6" />
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


          {/* Quick Actions */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5"
          >
            <p className="mb-4 font-semibold text-white">Quick Actions</p>
            <div className="space-y-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.label} href={action.href}>
                    <div id={action.id} className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700/40 p-3 transition-all hover:border-slate-600 hover:bg-slate-700/40">
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


        </div>
      </motion.div>
    </>
  )
}

export default DashboardPage
