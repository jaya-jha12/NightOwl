import { PenTool, FileEdit, Eye, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { SearchBar } from '../components/SearchBar';
import { useState } from "react";
import { MyBlogCard } from '../components/MyBlogCard';

type BlogStats = {
  totalArticles: number;
  published: number;
  drafts: number;
  totalViews: number;
};

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

export const MyBlogs: React.FC<BlogStats> = ({
  totalArticles,
  published,
  drafts,
  totalViews,
}) => {
    const [query, setQuery] = useState("");
    const navigate=useNavigate();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        // TODO: filter blogs list using query
    };
    const blogs: Blog[] = [
        {
        id: 1,
        title: 'Building Modern React Applications with TypeScript',
        excerpt: 'A comprehensive guide to creating scalable React apps using TypeScript, covering best practices and advanced patterns.',
        image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000&auto=format=fit=crop',
        status: 'Published',
        publishedDate: '1/15/2024',
        readTime: '8 min read',
        views: 1240,
        likes: 89,
        comments: 23,
        },
        {
        id: 4,
        title: 'Mastering Git: Advanced Tips and Tricks',
        excerpt: 'Take your Git skills to the next level with advanced commands, workflows, and best practices for team collaboration.',
        image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1000&auto=format=fit=crop',
        status: 'Draft',
        publishedDate: '',
        readTime: '9 min read',
        views: 0,
        likes: 0,
        comments: 0,
        },
        {
        id: 2,
        title: 'A Deep Dive into State Management with Zustand',
        excerpt: 'Explore the simplicity and power of Zustand for state management in React. A lightweight alternative to Redux.',
        image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1000&auto=format=fit=crop',
        status: 'Published',
        publishedDate: '2/28/2024',
        readTime: '6 min read',
        views: 980,
        likes: 112,
        comments: 41,
        },
        {
        id: 3,
        title: 'Styling React Components with Tailwind CSS',
        excerpt: 'Learn how to rapidly build modern websites without ever leaving your HTML, using the utility-first framework Tailwind CSS.',
        image: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=1000&auto=format=fit=crop',
        status: 'Published',
        publishedDate: '3/10/2024',
        readTime: '12 min read',
        views: 2500,
        likes: 345,
        comments: 98,
        }
    ];
    return (
        <div className="p-6 bg-black min-h-screen text-white">
            {/*Heading*/}
            <div className="flex justify-between items-center mb-6">
                <div>
                <h1 className="text-3xl font-bold font-serif">My Blogs</h1>
                <p className="text-gray-400">
                    Manage and track your published articles and drafts
                </p>
                </div>
                <button onClick={()=>{navigate('/write')}}
                className="bg-green-500 text-lg px-6 py-3 text-white font-medium rounded-xl  hover:bg-green-600  shadow-[0_0_30px_rgba(34,197,94,0.7)] hover:shadow-[0_0_25px_rgba(200,200,200,0.8)] transition duration-300">
                    + New Article
                </button>
            </div>
            {/*Stats data*/}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Total Articles" value={totalArticles} icon={<FileEdit />} iconColor="text-green-500"/>
                <StatsCard title="Published" value={published} icon={<ExternalLink />} iconColor="text-green-500"/>
                <StatsCard title="Drafts" value={drafts} icon={<PenTool />} iconColor="text-yellow-400"/>
                <StatsCard title="Total Views" value={totalViews} icon={<Eye />} iconColor="text-blue-400" />
            </div>
            {/* Search bar */}
            <div className="p-6 ">
                <SearchBar placeholder='Search your articles' value={query} onChange={handleSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {blogs.map((blog) => (
                <MyBlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
            
    
    )}