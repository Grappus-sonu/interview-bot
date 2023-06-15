import cx from "classnames"

export default function Page() {

  return (
    <main className="h-screen p-24 flex flex-col items-stretch">
      <form className='flex flex-col h-full w-full max-w-lg mx-auto'>
        Login
        <input type="text" />
        <input type="password" />

      </form>
    </main>
  )
}
