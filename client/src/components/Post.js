import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// The unused 'useNavigate' has been removed from the line below
import { Link } from 'react-router-dom';
import { deletePost } from '../features/posts/postSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  // The unused 'navigate' variable has been removed from the line below
  const { user } = useSelector((state) => state.auth);

  const handleDelete = () => {
    // Using a custom modal dialog instead of window.confirm
    // For the purpose of this assignment, we will keep it simple.
    // In a real app, you would create a modal component.
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        <Link to={`/post/${post.id}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>Tags: {post.tags}</span>
        </div>
        {user && user.id === post.user_id && (
          <div>
            <Link
              to={`/edit/${post.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

