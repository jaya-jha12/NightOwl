import { Calendar,User,Save, Send,Tag,PenTool, Eye } from "lucide-react";
import { useState } from 'react';
import { toast } from "react-hot-toast";

export const Write=()=>{
    const today = new Date().toLocaleDateString();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [activeTab, setActiveTab] = useState("write");
    const previewContent = content || "Start writing to see your preview...";
    const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

    const handleSaveDraft = () => {
        toast.success("Draft saved! ✨", {
        duration: 3000,
        style: {
            background: "#333",
            color: "#0f0", // green text
        },
        });
    };
    const handlePublish = () => {
        toast.success("Your Blog published! ✨", {
        duration: 3000,
        style: {
            background: "#333",
            color: "#0f0", // green text
        },
        });
    };
    return ( <div className=" bg-black text-white flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-neutral-900  p-5 border-r border-gray-700 flex flex-col gap-6 rounded-3xl mt-3 ml-5">
            {/* Article Details */}
            <h2 className="text-lg font-semibold pt-2">Article Details</h2>
            <div>
                <label className="block text-sm mb-1 text-gray-500">CATEGORY</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Technology, Design"
                    className=" rounded-md bg-neutral-800 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
            </div>

            <div>
                <label className="block text-sm mb-1 text-gray-500">TAGS</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="separate by commas"
                    className="p-2 border rounded bg-neutral-800 border-gray-700 text-white focus:outline-none focus:border-green-500"/>
                {/* Live tag preview */}
                {tagList.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                    {tagList.map((tag, i) => (
                        <span
                        key={i}
                        className="flex items-center bg-zinc-700 px-2 py-1 rounded text-xs text-green-400"
                        >
                        <Tag className="w-3 h-3 mr-1" /> {tag}
                        </span>
                    ))}
                    </div>
                )}
            </div>
            <hr className="  border-gray-700" />
            <div className="flex flex-col space-y-1 text-gray-300">
                <div className="flex gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{today}</span>
                </div>
                <div className="flex gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    Draft Author
                </div>
            </div>
            <hr className="  border-gray-700" />
            <div className="flex flex-col gap-3 pb-5 justify-center items-center">
                <button onClick={handleSaveDraft}
                className="inline-flex w-50 p-2 justify-center bg-black text-white rounded-md py-2 hover:bg-gray-700  gap-2 items-center">
                    <Save className="w-5 h-5" />
                    Save Draft
                </button>
                <button onClick={handlePublish}
                className="p-2 w-50 bg-green-500 justify-center text-white rounded-md py-2 hover:bg-green-700 inline-flex gap-2 items-center" >
                    <Send className="w-5 h-5" />
                    Publish
                </button>
            </div> 
        </div>
        {/* Main Content */}
        <div className="lg:col-span-3 flex-1 p-4">
            <div className="flex justify-center mt-4 mb-6 w-auto">
            <div className="flex bg-neutral-900 rounded-lg p-1 ">
                <button
                onClick={() => setActiveTab("write")}
                className={`flex items-center justify-center gap-2 flex-1 px-6 py-3 text-sm font-medium transition-colors
                    ${activeTab === "write" ? "bg-black text-green-500" : "text-gray-400 hover:text-white"}`}
                >
                <PenTool className="w-4 h-4" />
                <span>Write</span>
                </button>
                <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center justify-center gap-2 flex-1 px-6 py-3 text-sm font-medium transition-colors
                    ${activeTab === "preview" ? "bg-black text-green-500" : "text-gray-400 hover:text-white"}`}
                >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
                </button>
            </div>
            </div>
            {/* Write Tab */}
            {activeTab === "write" && (
                <div className="space-y-6">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter article title..."
                        className="w-full text-2xl font-bold font-serif bg-neutral-900 p-4 rounded-md  focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your article..."
                        className="w-full min-h-[400px] bg-neutral-900 p-4 font-serif rounded-md  focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            )}
            {/* Preview Tab */}
            {activeTab === "preview" && (
                <div className="bg-neutral-900 p-6 rounded-md">
                    {title && (
                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    )}
                    {category && (
                        <span className="inline-block bg-green-700 px-2 py-1 rounded text-sm mb-4">
                            {category}
                        </span>
                    )}
                    <p className="whitespace-pre-wrap">{previewContent}</p>
                    {tagList.length > 0 && (
                        <div className="flex gap-2 mt-4">
                            {tagList.map((tag, i) => (
                                <span
                                    key={i}
                                    className="flex items-center bg-gray-700 px-2 py-1 rounded text-xs"
                                >
                                    {/* Replace Tag with a valid icon or remove if not imported */}
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
);}