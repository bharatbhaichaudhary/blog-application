import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import BlogCart from "./page/BlogCart";
import AddBlog from "./page/AddBlog";
import Navbar from "./page/Navbar";
import Blog from "./page/Blog";
import EditeBlog from "./page/EditeBlog";
import AdminBlog from './page/AdminBlog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<BlogCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/edite-blog/:id" element={<EditeBlog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/admin-blog" element={<AdminBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
