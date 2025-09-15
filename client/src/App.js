import React, { useEffect } from 'react';
// BrowserRouter as Router has been removed from this import line
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Profile from './components/Profile';
import { fetchPosts } from './features/posts/postSlice';
import { setUser, logout } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    // The extra <Router> has been removed from here.
    // The div is now the top-level element.
    <div className="font-sans bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Mitt Arv Blog
            </Link>
            <div>
              {user ? (
                <>
                  <Link
                    to="/create"
                    className="text-gray-600 hover:text-blue-600 mr-4"
                  >
                    New Post
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-blue-600 mr-4"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 mr-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;