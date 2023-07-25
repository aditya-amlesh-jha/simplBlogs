import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from './context/authContext'

import Navbar from './Navbar'

import LoginPage from './authComponents/LoginPage'
import SignupPage from './authComponents/SignupPage'

import BlogPage from './blogComponents/BlogPage'
import BlogList from './blogComponents/BlogList'
import AddBlogPage from './blogComponents/AddBlogPage'
import EditBlogPage from './blogComponents/EditBlogPage'
import ProtectedBlogList from './blogComponents/ProtectedBlogList'

import ResetPassword from './resetComponents/ResetPassword'
import ChangePassword from './resetComponents/ChangePassword'

import ProtectedRoute from './routes/ProtectedRoutes'
import LoggedRoute from './routes/LoggedRoutes'

import NotFound from './NotFound'

import './css/App.css'






function App() {

  const { state } = useContext(AuthContext);
  const { isLogged } = state;

  return (
    <>
      <div className='app-page'>
        <BrowserRouter>
          <Navbar />
          {/* This is basically used to render different pages on routing to different endpoints  */}
          <div className="content">
            <Routes>
              <Route path="/" element={<BlogList />}></Route>
              <Route path="/login" element={
                <LoggedRoute isLogged={isLogged}>
                  <LoginPage />
                </LoggedRoute>}>
              </Route>
              <Route path="/signup" element={
                <LoggedRoute isLogged={isLogged}>
                  <SignupPage />
                </LoggedRoute>}>
              </Route>
              <Route path="/blogs" element={
                <ProtectedRoute isLogged={isLogged}>
                  <ProtectedBlogList url={"getByAuthor"} />
                </ProtectedRoute>}>
              </Route>
              <Route path="/blogs/:id" element={<BlogPage />}></Route>
              <Route path="/add-blog" element={
                <ProtectedRoute isLogged={isLogged}>
                  <AddBlogPage />
                </ProtectedRoute>}>
              </Route>
              <Route path="/edit-blog/:id" element={
                <ProtectedRoute isLogged={isLogged}>
                  <EditBlogPage />
                </ProtectedRoute>}>
              </Route>
              <Route path="/reset-password" element={
                <LoggedRoute isLogged={isLogged}>
                  <ResetPassword />
                </LoggedRoute>}>
              </Route>
              <Route path="/change-password" element={
                <ProtectedRoute isLogged={isLogged}>
                  <ChangePassword />
                </ProtectedRoute>}>
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
