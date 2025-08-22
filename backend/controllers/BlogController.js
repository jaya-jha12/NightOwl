import { prisma } from '../lib/prismaClient';

export const createBlog = async (req, res) => {
  try {
    const { title, content, isDraft } = req.body;

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        isDraft: isDraft ?? false,   // allow drafts
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
    const { title, content, isDraft } = req.body;

    // Ensure only the author can edit
    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content, isDraft }
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

export const getUserBlogs = async (req, res) => {
  try {
    // userId comes from the authenticate middleware
    const userId = req.user.id;

    // extract filter (draft/published) if provided
    const { status } = req.query; // status=draft OR status=published

    const whereCondition = { authorId: userId };
    
    // add filter only if status is provided
    if (status) {
      whereCondition.status = status;  
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


