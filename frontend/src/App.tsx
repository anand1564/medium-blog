
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Blogs from './pages/blogs'
import UploadBlogs from './pages/UploadBlogs'
import Landing from './pages/Landing'
import { Blog } from './pages/blog'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin />}/>
    <Route path='/blogs' element={<Blogs/>}/>
    <Route path='/blogs/create' element={<UploadBlogs />}/>
    <Route path='/' element={<Landing />} />
    <Route path='/blogs/:id' element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
