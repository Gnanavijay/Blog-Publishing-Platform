import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/create-post">Create Post</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/edit-post/:id" element={<EditPost />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
