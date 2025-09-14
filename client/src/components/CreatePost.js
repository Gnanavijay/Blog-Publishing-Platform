import React from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title: e.target.title.value,
            content: e.target.content.value,
            tags: e.target.tags.value,
        };
        dispatch(createPost(postData)).then(() => {
            navigate('/profile');
        });
    };

    return (
        <div className="form-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" required />
                <textarea name="content" placeholder="Write your post content here..." required />
                <input type="text" name="tags" placeholder="Tags (comma-separated)" />
                <button type="submit">Publish Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
