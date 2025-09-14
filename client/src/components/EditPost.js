import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../features/posts/postSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const post = useSelector(state => 
        state.posts.items.find(p => p.id === parseInt(id))
    );

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        tags: ''
    });

    useEffect(() => {
        if (post) {
            setPostData({
                title: post.title,
                content: post.content,
                tags: post.tags || ''
            });
        }
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost({ id: post.id, ...postData })).then(() => {
            navigate('/profile');
        });
    };

    if (!post) {
        return <div>Loading post...</div>;
    }

    return (
        <div className="form-container">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={postData.title}
                    onChange={handleChange}
                    required 
                />
                <textarea 
                    name="content" 
                    placeholder="Write your post content here..." 
                    value={postData.content}
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="text" 
                    name="tags" 
                    placeholder="Tags (comma-separated)" 
                    value={postData.tags}
                    onChange={handleChange}
                />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
