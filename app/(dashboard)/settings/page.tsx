import { Button } from '@/components/ui/button'

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Account Settings</h2>

      <div className="rounded-xl border bg-red-50 p-6 shadow-sm dark:border-red-800 dark:bg-red-900/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-black dark:text-red-300">Danger Zone</h2>
        </div>

        <Button size="sm" variant="destructive" className="mt-4 text-xs font-medium">
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default Settings
