"use client"
import { CgCommunity, CgAdd } from "react-icons/cg"
import { LuTimer, LuLogOut } from "react-icons/lu"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen">
      <div className=''>
        <Header />
      </div>
      <div className='h-full w-full overflow-y-auto'>{children}</div>
    </main>
  )
}

const Header = () => (
  <div className='p-1 flex flex-col justify-center items-center h-full border-r border-slate-600'>
    <div className='text-6xl'>
      <CgCommunity />
    </div>
    <div className='mt-auto'>
      <button className='text-xl p-4'><LuLogOut /></button>
    </div>
  </div>
)

