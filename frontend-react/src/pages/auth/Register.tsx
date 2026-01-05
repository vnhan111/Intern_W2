import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { AuthService } from "../../service/authService";
import type { RegisterRequest } from "../../api/authAPI";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterRequest>({
    userName: "",
    fullName: "",
    email: "",
    passWord: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate confirm password
    if (formData.passWord !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);

    const result = await AuthService.register(formData);

    setLoading(false);

    if (result.success) {
      alert("Đăng ký thành công!"); // Hoặc dùng toast nếu có
      navigate("/login");
    } else {
      setError(result.error || "Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordConfirmVisibilityToggle = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mr-[750px] mt-[-20px]">
      <img
        src="/Picture1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-[105%] object-cover -z-10"
      />
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-2">
          Register WBS System
        </h2>
        <br></br>

        {/* Thông báo lỗi */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Email <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Full Name <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter fullname"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Username <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700">
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
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordVisible ? (
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
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
                type={passwordConfirmVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Enter confirm password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />

              <button
                type="button"
                onClick={handlePasswordConfirmVisibilityToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {passwordConfirmVisible ? (
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 text-white font-semibold py-3 rounded-lg hover:bg-green-500 transition duration-200 shadow-md hover:shadow-lg disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng ký..." : "Register"}
          </button>
        </form>
        <br />
        <hr />
        <br />
        <p className="text-center text-gray-600 text-sm mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;