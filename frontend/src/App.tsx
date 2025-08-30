// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Homes';
import { Write } from './pages/Write';
import { Toaster } from "react-hot-toast"; 
import { MyBlogs } from './pages/MyBlog';
import { Auth } from './pages/Auth';
import { ViewPage } from './pages/ViewPage';

function App() {

  return (
    <BrowserRouter>
    <div className="bg-black min-h-screen">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/blogs" element={<MyBlogs totalArticles={10} published={7} drafts={3} totalViews={1200}/>} />
          <Route path="/login" element={<Auth />} />
          <Route path="/blogs/:id" element={<ViewPage />} />
        </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
    </BrowserRouter> 
  )
}

export default App
