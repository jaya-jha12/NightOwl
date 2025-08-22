import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from '../lib/prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const registerUser=async (req,res)=>{
    try{
        const { name,email,password,confirmPassword } =req.body;
        // check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" } // token valid for 7 days
        );
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }catch(error){
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser=async (req,res)=>{
    try{
        const { email, password } = req.body;
        // check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
            return res.status(404).json({ message: "No user found with this email" });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        // generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logoutUser = async (req, res) => {
  try {
    // On frontend we just need to delete the token
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
