import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../../services/api';
import { formatDate } from '../../utils/dateFormatter';

interface BlogCardProps {
  blog: Blog;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, isAdmin = false, onDelete }) => {
  // Function to truncate content to 25 words
  const truncateContent = (content: string, wordLimit: number = 25): string => {
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>?/gm, '');
    
    // Split by words and limit
    const words = plainText.split(' ');
    if (words.length <= wordLimit) return plainText;
    
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ">
      {blog.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {formatDate(blog.created_at)}
        </p>
        <div className="text-gray-700 mb-4">
          {truncateContent(blog.content)}
        </div>
        <div className="flex justify-between items-center">
          <Link 
            to={`/blogs/${blog.id}`} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </Link>
          {isAdmin && onDelete && (
            <div className="flex space-x-2">
              <Link 
                to={`/admin/blogs/edit/${blog.id}`} 
                className="text-yellow-600 hover:text-yellow-800"
              >
                Edit
              </Link>
              <button 
                onClick={() => onDelete(blog.id)} 
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
