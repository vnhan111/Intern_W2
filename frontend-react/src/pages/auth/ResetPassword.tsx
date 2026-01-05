import React, { useState } from 'react';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react';
const ResetPassword: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    }
    const handleConfirmPasswordVisibilityToggle = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 mr-[750px] mt-20">
            <img
                src="/Picture1.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-[120%] object-cover -z-10"
            />
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-2">
                    Reset Password
                </h2>
                <br></br>
                <h1 className=" text-gray-600 mb-6 text-left">
                    Password requires 8 characters or more, with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.
                </h1>
                <br></br>
                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            Password <span className="text-red-600 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                required
                                placeholder="Enter password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
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
                    </div>
                    <div className="space-y-1">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                            Confirm Password <span className="text-red-600 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                required
                                placeholder="Enter confirm password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                            <button
                                type="button"
                                onClick={handleConfirmPasswordVisibilityToggle}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            >
                                {confirmPasswordVisible ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-400 text-white font-bold py-3.5 rounded-lg hover:bg-green-500 transition duration-200 shadow-md hover:shadow-lg text-lg"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ResetPassword;