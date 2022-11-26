import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './utils/NotFound'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import SearchPage from './pages/SearchPage'
import UpdatePage from './pages/adminPage/UpdatePage'
import CreatePostPage from './pages/adminPage/CreatePostPage'

function MainPage({user, setUser}) {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage user={user}  />} />
        <Route path='/login' element={Object.keys(user).length === 0 ? <Login user={user} setUser={setUser} /> : <NotFound />} />
        <Route path='/register' element={Object.keys(user).length === 0 ? <Register user={user} setUser={setUser} /> : <NotFound />} />
        <Route path='/category/:slug' element={<CategoryPage user={user} setUser={setUser} />}  />
        <Route path='/detail/:slug' element={<DetailPage user={user} />} />
        <Route path='/search' element={<SearchPage user={user} />} />
        <Route path='/update/:slug' element={<UpdatePage />} />
        <Route path='/create-post' element={<CreatePostPage />} />
      </Routes>
    </div>
  )
}

export default MainPage