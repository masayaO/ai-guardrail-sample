import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4 sm:px-8">
          <h1 className="text-base font-semibold text-zinc-900 sm:text-lg">ToDo サンプル</h1>
          <Link className="text-sm font-medium text-zinc-700 hover:text-zinc-900" to="/todos">
            ToDo
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
