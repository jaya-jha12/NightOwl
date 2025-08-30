import { prisma } from '../lib/prismaClient.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, draft,category } = req.body;

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        draft: draft ?? false,   // allow drafts
        category,
        authorId: req.user.id        // comes from JWT middleware
      }
    });

    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const { title, content, draft,category } = req.body;

    // Ensure only the author can edit
    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content, draft,category }
    });

    return res.json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: "Error editing blog", error: error.message });
  }
};

export const deleteBlog= async (req,res)=>{
    try{
        const { id }=req.params;
        const blog=await prisma.blog.findUnique({ where :{ id: Number(id)}});
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        await prisma.blog.delete({ where: { id: Number(id) } });

        return res.json({ message: "Blog deleted successfully" });
    }catch(error){
        return res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
}

export const getBlogs = async (req, res) => {
  try {
    // userId comes from the authenticate middleware
    const userId = req.user.id;

    // extract filter (draft/published) if provided
    const { status,category } = req.query; // status=draft OR status=published

    const whereCondition = { authorId: userId };
    
    // add filter only if status is provided
    if (status === "draft") {
      whereCondition.draft = true;
    }else if (status === "published") {
      whereCondition.draft = false;
    }
    //  add category filter if provided
    if (category) {
      whereCondition.category = category;
    }

    const blogs = await prisma.blog.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" }, // latest first
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export const getBlogById=async (req,res)=>{
 try {
    const blogId = parseInt(req.params.id, 10);

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

