import React, { useState } from 'react';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from "../../service/authService";
import { type LoginRequest } from "../../api/authAPI";
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Controlled inputs
    const [formData, setFormData] = useState<LoginRequest>({
        loginName: "",
        passWord: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await AuthService.login(formData);

            if (result.success) {
                toast.success("Đăng nhập thành công!"); 
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            } else {
                alert(result.error || "Đăng nhập thất bại!");
            }
        } catch (error) {
            alert("Lỗi kết nối hoặc hệ thống. Vui lòng thử lại!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center px-4 mr-[750px] mt-[-50px]">
            <img
                src="/Picture1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-[100%] object-cover -z-10"
            />

            <div className="absolute inset-0 -z-10"></div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-8">
                        Login WBS System
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                Username <span className="text-red-600 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="loginName"
                                value={formData.loginName}
                                onChange={handleChange}
                                required
                                placeholder="Enter username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                Password <span className="text-red-600 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="passWord"
                                    value={formData.passWord}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={handlePasswordVisibilityToggle}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                >
                                    {passwordVisible ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-green-600 font-medium hover:underline transition"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-400 text-white font-bold py-3.5 rounded-lg hover:bg-green-500 transition duration-200 shadow-md hover:shadow-lg text-lg"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-8">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-green-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 py-6 px-8">
                <div className="max-w-4xl mx-auto text-left text-gray-600">
                    <img
                        src="/logo.png"
                        alt="WBS Logo"
                        className="h-12 mx-auto mb-3 object-contain"
                    />
                    <p className="font-semibold text-gray-800 mb-2">Contact us:</p>
                    <div className="text-sm space-y-1">
                        <p>TEL: +84 (0)234 658332</p>
                        <p>SALE: +84 971 652 334</p>
                        <p>EMAIL: sales@brycen.com.vn</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;