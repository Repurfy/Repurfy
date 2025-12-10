import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'

interface activityDataTypes {
  activityTitle: string
  platformsPublished: number
  publishedAt: number
  image: string
  activityStatus: string
}

const DashboardPage = () => {
  const remainingCredits = 2

  const recentActivityData: activityDataTypes[] = [
    {
      activityTitle: 'Product Lauch Post',
      platformsPublished: 6,
      publishedAt: 2,
      image: '/logo.svg',
      activityStatus: 'Completed',
    },
    {
      activityTitle: 'Product Lauch Post 2',
      platformsPublished: 6,
      publishedAt: 2,
      image: '/logo.svg',
      activityStatus: 'Incomplete',
    },
  ]

  return (
    <div>
      <div className="bg-brand-gradient-soft rounded-xl p-6">
        <h1 className="text-lg sm:text-xl md:text-2xl">Welcome back, Rahul! 👋</h1>
        <p className="pt-2">
          You have{' '}
          <span className="text-brand-blue dark:text-brand-teal font-semibold">
            {remainingCredits} repurposings
          </span>{' '}
          remaining this month. Keep creating!
        </p>
      </div>

      <div className="mt-10 rounded-xl bg-slate-200 p-6 dark:bg-slate-700">
        <h2 className="mb-4 font-sans font-semibold">
          Monthly Usage{' '}
          <span className="float-end">
            <Button size="sm" className="text-xs font-medium text-white sm:text-[14px]">
              Upgrade Plan
            </Button>
          </span>
        </h2>
        <p className="text-text-secondary my-3 py-1 text-sm">
          Total Posts Generated <span className="text-primary float-end font-semibold">22/24</span>
        </p>

        <Slider
          value={[22]}
          max={24}
          step={1}
          // disabled
          className="pointer-events-none opacity-100 select-none"
        />
      </div>

      <div className="grid w-full grid-cols-1 items-baseline gap-6 lg:grid-cols-[1fr_auto]">
        <div className="mt-10 w-full rounded-xl bg-slate-200 p-6 dark:bg-slate-700">
          <h2 className="font-sans font-semibold">Recent Activity</h2>

          <div className="mt-6 space-y-6">
            {recentActivityData.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg transition hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {/* Left Section */}
                <div className="relative flex items-center gap-4">
                  <div className="relative">
                    <Image
                      className="overflow-hidden rounded-md border border-slate-200 bg-white/75 dark:border-slate-500"
                      src={activity.image}
                      width={50}
                      height={50}
                      alt={activity.activityTitle}
                    />
                    <div
                      className={`absolute -right-1 bottom-0 h-3 w-3 rounded-full border border-white ${activity.activityStatus === 'Completed' ? 'bg-green-500' : 'bg-red-500'} dark:border-slate-800`}
                    ></div>
                  </div>

                  <div className="">
                    <h3 className="font-medium text-slate-800 dark:text-white">
                      {activity.activityTitle}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-600 md:gap-2 md:text-sm dark:text-slate-300">
                      <span>{activity.platformsPublished} platforms</span>
                      <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                      <span>{activity.publishedAt} hours ago</span>
                    </div>
                  </div>
                </div>

                {/* Status Pill */}
                {activity.activityStatus === 'Completed' ? (
                  <div className="hidden rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-700 lg:block dark:bg-green-700/50 dark:text-green-300">
                    {activity.activityStatus}
                  </div>
                ) : (
                  <div className="hidden rounded-full bg-red-200 px-3 py-1 text-xs font-medium text-red-700 lg:block dark:bg-red-700/50 dark:text-red-300">
                    {activity.activityStatus}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden min-w-96 rounded-xl bg-slate-200 p-6 lg:ml-auto lg:block dark:bg-slate-700">
          <h2 className="font-sans">Platform Distribution</h2>
          <p className="text-text-secondary my-3 py-1 text-sm">
            Total Posts Generated{' '}
            <span className="text-primary float-end font-semibold">22/24</span>
          </p>

          <Slider
            value={[22]}
            max={100}
            step={1}
            // disabled
            className="pointer-events-none opacity-100 select-none"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
