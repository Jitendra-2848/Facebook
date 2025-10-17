import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './Comp/Login'
import Register from './Comp/Register'
import Homepage from './Comp/Homepage'
import Profile from './Comp/Profile'
import { Loader } from "lucide-react"
import { Store } from './Comp/store/check'
import X from './Comp/X'
import ProfilePage from './Comp/Profile'

const App = () => {
  const { Authuser, checkAuth, ischeckingAuth } = Store();
  
  useEffect(() => {
    checkAuth();
  }, [])
  
  if (ischeckingAuth) {
    return (
      <div className='justify-center w-full h-screen items-center flex animate-spin'>
        <Loader />
      </div>
    )
  }
  
  return (
    <div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/log' element={!Authuser ? <Login /> : <Homepage />} />
          <Route path='/' element={Authuser ? <Homepage /> : <Login />} />
          <Route path='/reg' element={!Authuser ? <Register /> : <Homepage />} />
          <Route path="/pro" element={Authuser ? <Profile /> : <Login />} />
          <Route path="/update_profile" element={Authuser ? <X /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
