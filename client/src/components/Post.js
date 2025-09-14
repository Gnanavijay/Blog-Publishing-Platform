import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById } from '../features/posts/postSlice';
import { useParams, Link } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.currentPost);
    const token = useSelector(state => state.auth.token); // Assuming you might want to check ownership to show edit/delete

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Tags: {post.tags}</p>
            {/* Add logic to show edit/delete if the user is the author */}
            <Link to={`/edit-post/${post.id}`}>Edit</Link>
        </div>
    );
};

export default Post;
