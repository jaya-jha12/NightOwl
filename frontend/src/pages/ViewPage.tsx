import React from 'react';
import { useState,useEffect } from 'react';
import { useParams,Link } from "react-router-dom";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye
} from 'lucide-react';

type Blog={
    id: number;
    title: string;
    image: string;
    status: 'Published' | 'Draft';
    publishedDate: string;
    readTime: string;
    views: number;
    likes: number;
    comments: number;
    category: string;
    author: string;
    content: string;
}
export const ViewPage:React.FC =()=>{
    const { id } = useParams<{ id: string }>(); // Get the ID from the URL
    const [blog, setBlog] = useState<Blog>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        const loadArticle = async () => {
        try {
            const token = localStorage.getItem("token");
            setIsLoading(true);
            setError(null);

            if (id) {
            const response = await axios.get(`http://localhost:3000/api/blog/${id}`, {
                headers:{ Authorization: `Bearer ${token}` }
            });
            const rawBlog = response.data;
            const transformedBlogs: Blog ={
                id: rawBlog.id,
                title: rawBlog.title,
                content:rawBlog.content,
                status: rawBlog.draft ? "Draft" : "Published",
                publishedDate: new Date(rawBlog.createdAt).toLocaleDateString(),
                readTime: rawBlog.readTime || "5 min read",
                views: rawBlog.views || 0,
                likes: rawBlog.likes || 0,
                comments:rawBlog.comments || 0,
                category:rawBlog.category || "",
                author:rawBlog.author ||"",
                image: rawBlog.image || ""
                
            };
            setBlog(transformedBlogs);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to load article.");
        } finally {
            setIsLoading(false);
        }
        };

        loadArticle();
    }, [id]);
    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p>Loading article...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
            <p>Error: {error}</p>
        </div>
        );
    }

    if (!blog) {
        return (
        <div className="h-full bg-gray-50 flex items-center justify-center">
            <p>Article not found.</p>
        </div>
        );
    }
    return <div className="bg-zinc-900 text-white font-serif">
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link
            to="/blogs"
            className="inline-flex items-center text-white hover:text-green-500 mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition" />
            Back to All Posts
            </Link>
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {blog.category}
                    </span>
                    <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {blog.publishedDate}
                    </span>
                    <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5" />
                        {blog.readTime}
                    </span>
                    <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1.5" />
                        {blog.views.toLocaleString()} views
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-500 mb-6">
                    {blog.title}
                </h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{blog.author}</p>
                        <p className="text-sm text-gray-500">Senior Developer</p>
                    </div>
                    </div>
                </div>
            </header>
            <hr className="border-gray-200 mb-8" />
                {/* Use ReactMarkdown to safely render the content */}
                <article className="prose prose-lg max-w-none">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </article>
        </main>
    </div>
}