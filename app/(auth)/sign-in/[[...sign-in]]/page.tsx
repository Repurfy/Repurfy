import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1120]">
      <SignIn
        appearance={{
          elements: {
            card: 'bg-[#0b1120] border border-white/10 shadow-2xl',
          },
        }}
      />
    </div>
  )
}
