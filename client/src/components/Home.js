import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="post-list">
            <h2>All Blog Posts</h2>
            {posts.map(post => (
                <div key={post.id}>
                    <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                    <p>{post.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
