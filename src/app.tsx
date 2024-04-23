import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Button, NextUIProvider } from '@nextui-org/react'
import './app.css'
import { Toaster } from 'react-hot-toast'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Home from './pages/home'
import About from './pages/about'

/**
 *
 */
function App() {
  return (
    <div className="app">
      <div className="pointer-events-none fixed inset-0 select-none bg-[url('/grid.svg')] bg-top bg-repeat" />
      <span className="pointer-events-none fixed top-0 block h-[800px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)]" />
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-3xl lg:px-8">
          <div className="w-full bg-zinc-50/90 ring-1 ring-zinc-100" />
        </div>
      </div>
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between w-full pl-32 pr-8 bg-gray-500 min-[320px]:pl-16 min-h-14">
        <div className="flex items-center justify-between w-full mx-auto">
          <div>ArcBlock</div>
          <div className="sign">
            <SignedOut>
              <SignInButton>
                <Button color="primary">SignIn</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

/**
 *
 */
export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/'

  return (
    <Router basename={basename}>
      <NextUIProvider>
        <App />
        <Toaster />
      </NextUIProvider>
    </Router>
  )
}
