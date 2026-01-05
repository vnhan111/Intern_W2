import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Đang xác nhận email...");

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setMessage("Link không hợp lệ.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5201/api/auth/verify-email?token=${token}&email=${email}`
        );
        setMessage(res.data || "Email đã được xác nhận thành công!");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err: any) {
        setMessage(
          err.response?.data || "Xác nhận thất bại. Link có thể đã hết hạn."
        );
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Xác nhận Email</h2>
        <p className="text-lg">{message}</p>
        {message.includes("thành công") && (
          <p className="mt-4 text-green-600">Đang chuyển về trang đăng nhập...</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;