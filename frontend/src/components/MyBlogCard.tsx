import { useState } from 'react';
import { 
    MoreHorizontal, 
    CalendarDays, 
    ChevronDown, 
    Eye, 
    Heart, 
    MessageCircle,
    Edit,
    ExternalLink,
    Trash2 
} from 'lucide-react';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  status: 'Published' | 'Draft';
  publishedDate: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
};

type MyBlogCardProps = {
  blog: Blog;
  onDelete: (id: number) => void; // Function to handle deletion
};

export const MyBlogCard = ({ blog,onDelete }:MyBlogCardProps) => {
    const isPublished = blog.status === 'Published';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<div className="group bg-[#1e1e1e] border border-gray-700/50 rounded-2xl w-full max-w-sm shadow-lg font-sans flex flex-col">
            {/* Image container */}
            <div className="relative h-52 overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Content Section */}
            <div className="p-5 text-white flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    {/* Dynamic status pill */}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isPublished 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                        {blog.status}
                    </span>
                    <div className="relative">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            onBlur={() => setTimeout(() => setIsMenuOpen(false), 100)} // Close menu when it loses focus
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 top-8 mt-1 w-40 bg-[#2a2a2a] border border-gray-700/50 rounded-lg shadow-xl z-10">
                                <ul className="py-1">
                                    <li>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50">
                                            <Edit className="w-4 h-4 mr-2" /> Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50">
                                            <ExternalLink className="w-4 h-4 mr-2" /> View
                                        </a>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => {
                                                onDelete(blog.id);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-green-400 transition-colors">
                    {blog.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {blog.excerpt}
                </p>

                <div className="flex items-center text-gray-400 text-sm mb-4">
                    <span className="flex items-center mr-4">
                        <CalendarDays className="w-4 h-4 mr-1.5" />
                        {isPublished ? blog.publishedDate : 'Not published'}
                    </span>
                    <span className="flex items-center">
                        {blog.readTime}
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </span>
                </div>
                {/* --- Conditional Footer --- */}
                <div className="border-t border-gray-700/50 pt-4 mt-auto">
                    {isPublished ? (
                        <div className="flex items-center space-x-5 text-gray-300 text-sm">
                            <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1.5 text-gray-400" />
                                {blog.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1.5 text-gray-400" />
                                {blog.likes}
                            </span>
                            <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1.5 text-gray-400" />
                                {blog.comments}
                            </span>
                        </div>
                    ) : (
                        <button className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
                            <Edit className="w-4 h-4 mr-2" />
                            Continue Writing
                        </button>
                    )}
                </div>
            </div>
    </div>
)}