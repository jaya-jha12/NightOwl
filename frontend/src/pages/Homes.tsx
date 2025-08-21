import { PenTool, Coffee,TrendingUp } from "lucide-react";
import { BlogCard } from '../components/BlogCard';
import { GiOwl } from "react-icons/gi";

export const Home=()=>{
    const blogPosts: BlogCardProps[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
      tag: 'React',
      title: 'Building a Scalable React Architecture: Lessons...',
      description: "After building dozens of React applications, I've learned some hard lessons about architecture. Here'...",
      author: 'Sarah Chen',
      date: 'Dec 15, 2024',
      readTimeInMinutes: 8,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop',
      tag: 'Web Dev',
      title: "The Future of Web Development: What's...",
      description: "From WebAssembly to Server Components, the web development landscape is evolving rapidly. Let'...",
      author: 'Marcus Johnson',
      date: 'Dec 12, 2024',
      readTimeInMinutes: 6,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1964&auto=format&fit=crop',
      tag: 'Design',
      title: 'Design Systems That Scale: A Practical Guide',
      description: 'Creating a design system is more than just collecting UI components. Learn how to build systems that...',
      author: 'Elena Rodriguez',
      date: 'Dec 10, 2024',
      readTimeInMinutes: 12,
    }
  ];
    return <div className="py-10">
        <div className=" flex flex-col items-center justify-center text-center px-6 pt-20 pr-3 pl-3">
      {/* Icon at top */}
      <div className=" pb-4 rounded-2xl mb-6">
        <img src='/animal.png' alt='NightOwl logo' className='w-30 h-30' />
      </div>

      {/* Title */}
      <h1 className="text-7xl md:text-6xl font-bold font-serif text-white mb-6">
        Where Great Ideas{" "}
        <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">Come to Life</span>
      </h1>

      {/* Subtitle */}
      <p className="text-2xl text-gray-300 font-serif max-w-2xl mb-10">
        Discover insightful articles, tutorials, and stories from developers,
        designers, and innovators. Join our community of writers and share your
        knowledge with the world.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-2xl  hover:bg-green-600  shadow-[0_0_30px_rgba(34,197,94,0.7)] hover:shadow-[0_0_25px_rgba(200,200,200,0.8)] transition duration-300">
          <PenTool className="w-5 h-5" />
          Start Writing
        </button>

        <button className="flex items-center gap-2 px-6 py-3 bg-black border border-gray-700 text-white font-medium rounded-2xl hover:bg-zinc-800 shadow-[0_0_15px_rgba(200,200,200,0.5)] hover:shadow-[0_0_25px_rgba(200,200,200,0.8)] transition duration-300">
          <Coffee className="w-5 h-5" />
          Explore Stories
        </button>
      </div>
    </div>
    {/* Trending section */}
    <div className="bg-black text-white py-16 px-8 mt-12 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
        <TrendingUp className="w-10 h-12 text-green-500" />
        <h2 className="text-3xl font-bold font-serif tracking-wide">Trending Stories</h2>
        </div>
        {/* Cards Container - This is where you map the data */}
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
    </div>
    {/*Ready to share story */}
    <div className="bg-zinc-900 w-1full text-white rounded-2xl justify-center text-center px-10 py-12 mt-16 max-w-4xl mx-auto shadow-lg">
          <div className="font-bold text-4xl font-serif mb-6">Ready to Share Your Story?</div>
          <div className="text-gray-300 text-xl mb-8">Join thousands of writers who are sharing their knowledge and experiences.<br/>Your voice matters in the community.</div>
          <div className="flex gap-4 items-center justify-center p-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-2xl  hover:bg-green-600  shadow-[0_0_30px_rgba(34,197,94,0.7)] hover:shadow-[0_0_25px_rgba(200,200,200,0.8)] transition duration-300">Create Account</button>
          <button className="flex items-center gap-2 px-6 py-3 bg-black border border-gray-700 text-white font-medium rounded-2xl hover:bg-zinc-800 shadow-[0_0_15px_rgba(200,200,200,0.5)] hover:shadow-[0_0_25px_rgba(200,200,200,0.8)] transition duration-300">Sign In</button>
          </div>
          
    </div>
        </div>
}