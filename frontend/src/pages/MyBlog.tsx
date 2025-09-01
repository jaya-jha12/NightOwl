import { PenTool, FileEdit, Eye, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { SearchBar } from '../components/SearchBar';
import { useState,useEffect } from "react";
import { MyBlogCard } from '../components/MyBlogCard';
import axios from 'axios';

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

function generateExcerpt(content: string, length: number = 150): string {
  if (!content) return "";
  return content.length > length ? content.substring(0, length) + "..." : content;
}

export const MyBlogs: React.FC<BlogStats> = () => {
    const [query, setQuery] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalArticles: 0, published: 0, drafts: 0, totalViews: 0 });
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        // TODO: filter blogs list using query
    };
    useEffect(() => {
        const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem("token"); // you store token after login
            const res = await axios.get("https://nightowl-twys.onrender.com/api/blog/", {
            headers: { Authorization: `Bearer ${token}` }
            });
            const transformedBlogs: Blog[] = res.data.map((blog: any) => ({
                id: blog.id,
                title: blog.title,
                excerpt: generateExcerpt(blog.content),
                status: blog.draft ? "Draft" : "Published",
                publishedDate: new Date(blog.createdAt).toLocaleDateString(),
                readTime: blog.readTime || "5 min read",
                views: blog.views || 0,
                likes: blog.likes || 0,
                comments:blog.comments || 0,
            }));
            setBlogs(transformedBlogs);
            console.log(transformedBlogs);
        } catch (err:any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };
        fetchBlogs();
    }, []);
    useEffect(() => {
        const totalArticles = blogs.length;
        const published = blogs.filter(b => b.status === "Published").length;
        const drafts = blogs.filter(b => b.status === "Draft").length;
        const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
        setStats({ totalArticles, published, drafts, totalViews });
    }, [blogs]);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleDeleteBlog = async (id: number) => {
        // Optional: Ask for confirmation before deleting
        if (!window.confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token=localStorage.getItem("token");
            await axios.delete(`https://nightowl-twys.onrender.com/api/blog/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            // If successful, update the state to remove the blog post
            // This will cause React to re-render the component without the deleted item
            setBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== id));

        } catch (err:any) {
            console.error("Deletion failed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleEditBlog = async (id: number) => {
        navigate(`/write`,{ state: { id: id } });
    };

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
                <StatsCard title="Total Articles" value={stats.totalArticles} icon={<FileEdit />} iconColor="text-green-500"/>
                <StatsCard title="Published" value={stats.published} icon={<ExternalLink />} iconColor="text-green-500"/>
                <StatsCard title="Drafts" value={stats.drafts} icon={<PenTool />} iconColor="text-yellow-400"/>
                <StatsCard title="Total Views" value={stats.totalViews} icon={<Eye />} iconColor="text-blue-400" />
            </div>
            {/* Search bar */}
            <div className="p-6 ">
                <SearchBar placeholder='Search your articles' value={query} onChange={handleSearch} />
            </div>
            {/* Blog cards */}
            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBlogs.map((blog:any) => (
                    <MyBlogCard key={blog.id} blog={blog} onDelete={handleDeleteBlog} onEdit={handleEditBlog}/>
                ))}
                </div>
            )}
        </div>
    )}