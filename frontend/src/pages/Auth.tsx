import React,{ useState } from "react";
import type { FC } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import OwlIcon from "/animal.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange?:(e:any)=>void;
}

const InputField: FC<InputFieldProps> = ({ id, label, type, placeholder, icon: Icon, showPassword, onTogglePassword,onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-colors"
        required/>
      {onTogglePassword && (
        <button
          type="button"
          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-white transition-colors"
          onClick={onTogglePassword}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  </div>
);

export const Auth:FC=()=>{
    const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const navigate=useNavigate();


    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setIsLoading(true);
        if(activeTab=="signup"){
            try{
                const response=await axios.post(`http://localhost:3000/api/user/register`,{
                    name:name,
                    email:email,
                    password:password,
                    confirmPassword:confirmPassword
                })
                const message = response.data?.message
                console.log("response:",response.data);
                localStorage.setItem("token",response.data.token);
                setTimeout(() => {
                    setIsLoading(false);
                    toast.success(message);
                    }, 1000);
                navigate('/');
            }catch (err:any){
                console.error(err);
                const message = err.response?.data?.message || "Signup failed!";
                toast.error(message);
            }finally{
                setIsLoading(false);
            }
        }else{
            try{
                const response=await axios.post(`http://localhost:3000/api/user/login`,{
                    email:email,
                    password:password
                })
                const message = response.data?.message
                console.log("response:",response.data);
                localStorage.setItem("token",response.data.token);
                setTimeout(() => {
                    setIsLoading(false);
                    toast.success(message);
                    }, 1000);
                navigate('/')
            }catch (err:any){
                console.error("error:",err);
                console.error(err);
                const message = err.response?.data?.message || "Signin failed!";
                toast.error(message);
            }finally{
                setIsLoading(false);
            }
        }
  };
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#001a00] to-green-900 flex items-center justify-center p-4 font-sans overflow-auto">
            <div className="relative w-full max-w-md">
                <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-green-700/50 shadow-2xl rounded-lg items-center transition duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                    {/* welcome and logo*/}
                    <div className="p-6 text-center">
                        <img src={OwlIcon} alt='logo' className="w-20 h-20 mx-auto mb-4"></img>
                        <h2 className="text-2xl font-bold text-white font-serif ">Welcome</h2>
                        <p className="text-gray-400">Sign in or create a new account</p>
                    </div>
                    <div className="px-6 pb-6">
                        {/* --- Tabs --- */}
                        <div className="grid w-full grid-cols-2 bg-zinc-800 p-1 rounded-md mb-6">
                        <button
                            onClick={() => setActiveTab("signin")}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'signin' ? 'bg-green-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'
                            }`}>
                            Log In
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'signup' ? 'bg-green-500 text-gray-900' : 'text-gray-300 hover:bg-gray-700'
                            }`}>
                            Create Account
                        </button>
                        </div>
                        {/* --- Form --- */}
                        <form  className="space-y-4">
                        {activeTab === 'signin' ? (
                            <>
                            <InputField id="signin-email" label="Email" type="email" placeholder="Enter your email" icon={Mail} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <InputField 
                                id="signin-password" 
                                label="Password" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password" 
                                icon={Lock}
                                showPassword={showPassword}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                                onChange={(e)=>{setPassword(e.target.value)}}/>
                            </>
                        ) : (
                            <>
                            <InputField id="signup-name" label="Full Name" type="text" placeholder="Enter your full name" icon={User} onChange={(e)=>{setName(e.target.value)}} />
                            <InputField id="signup-email" label="Email" type="email" placeholder="Enter your email" icon={Mail} onChange={(e)=>{setEmail(e.target.value)}} />
                            <InputField 
                                id="signup-password" 
                                label="Password" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password" 
                                icon={Lock}
                                showPassword={showPassword}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <InputField 
                                id="signup-confirm-password" 
                                label="Confirm Password" 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password" 
                                icon={Lock}
                                showPassword={showConfirmPassword}
                                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                />
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2.5 rounded-md shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center"
                            disabled={isLoading}
                            onClick={handleSubmit}>
                            {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin mr-2" />
                                <span>Processing...</span>
                            </>
                            ) : (
                            <>
                                <span>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                            )}
                        </button>
                        </form>
                    </div>
                    
                </div>
            </div>

        </div>
    )};