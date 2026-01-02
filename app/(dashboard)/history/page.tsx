import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Linkedin, Search, Twitch, Twitter, X, Youtube } from 'lucide-react'

const History = () => {
  const ButtonsData = [
    {
      title: 'LinkedIn',
      image: <Linkedin />,
    },
    {
      title: 'X (Twitter)',
      image: <Twitter />,
    },
    {
      title: 'Instagram',
      image: <Instagram />,
    },
    {
      title: 'Facebook',
      image: <Facebook />,
    },
    // {
    //   title: 'Youtube',
    //   image: <Youtube />,
    // },
    // {
    //   title: 'Twitch',
    //   image: <Twitch />,
    // },
  ]

  return (
    <div className="h-fit">
      <h1 className="text-2xl font-bold tracking-tight">Content History</h1>
      <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
        View and manage your generated content
      </p>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-1/2 lg:w-[520px]">
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
              <Button key={index} variant="outline" className="ml-2">
                <span>{button.image}</span>
                <span className="ml-2">{button.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
