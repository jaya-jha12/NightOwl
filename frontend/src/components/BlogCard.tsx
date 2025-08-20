import { User, Calendar, Clock } from 'lucide-react';
interface BlogCardProps {
  imageUrl: string;
  tag: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTimeInMinutes: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  tag,
  title,
  description,
  author,
  date,
  readTimeInMinutes,
}) => {
    return (
        <div className="max-w-sm w-full rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent p-px transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#282828] text-white rounded-[11px] overflow-hidden">
            {/* Card Image */}
            <img 
                className="w-full h-60 object-cover p-3" 
                src={imageUrl} 
                alt={title} 
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src='https://placehold.co/600x400/282828/FFFFFF?text=Image+Not+Found';
                }}
            />
            <div className="p-6">
            {/* Tag */}
            <span className="inline-block bg-green-800 text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {tag}
            </span>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-100 mb-2 leading-tight pb-3 pr-3 pl-3">
            {title}
            </h2>
            {/* Description */}
            <p className="text-gray-400 text-base p-3">
            {description}
            </p>
            {/* Footer with Author, Date, and Read Time */}
            <div className="mt-6 flex items-center justify-between text-gray-400 text-sm p-3">
            <div className="flex items-center space-x-2">
                <User className="h-5 w-5"/>
                <span>{author}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5"/>
                <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5"/>
                <span>{readTimeInMinutes} min read</span>
            </div>
        </div>
        </div>
        </div>    
    );
}