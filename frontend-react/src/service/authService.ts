import Store from "../store/Store";
import { loginAPI, registerAPI, type LoginRequest, type RegisterRequest } from "../api/authAPI";
import { successLogin, failLogin, successRegister, failRegister, logout } from "../redux/slice/authSlice";

const { dispatch } = Store;

export class AuthService {
  static async login(userData: LoginRequest) {
    try {
      console.log("AuthService: Start login");
      const response = await loginAPI(userData);
      if (response) {
        console.log("AuthService: Login successful");
        dispatch(
          successLogin({
            token: response.token,
            userName: response.loginName,
            message: response.message,
          })
        );
        return { success: true, data: response };
      } else {
        console.log("AuthService: Login failed");
        dispatch(failLogin("Login failed"));
        return { success: false };
      }
    } catch (err: unknown) { 
      console.error("AuthService: Login error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed";
      dispatch(failLogin(errorMessage));
      return { success: false, error: errorMessage };
    }
  }

  static async register(userData: RegisterRequest) {
    try {
      console.log("AuthService: Start register");
      const response = await registerAPI(userData);
      if (response) {
        console.log("AuthService: Register successful");
        dispatch(
          successRegister({
            token: response.token,
            userName: response.loginName,
            message: response.message,
          })
        );
        return { success: true, data: response };
      } else {
        console.log("AuthService: Register failed");
        dispatch(failRegister("Register failed"));
        return { success: false };
      }
    } catch (err: unknown) { // ← Thay any thành unknown
      console.error("AuthService: Register error:", err);
      // An toàn type: giả sử err có thể là AxiosError hoặc Error
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Register failed";
      dispatch(failRegister(errorMessage));
      return { success: false, error: errorMessage };
    }
  }

  static logout() {
    try {
      console.log("AuthService: Start logout");
      dispatch(logout());
      console.log("AuthService: Logout successful");
      return { success: true };
    } catch (err: unknown) {
      console.error("AuthService: Logout error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Logout failed";
      return { success: false, error: errorMessage };
    }
  }
}