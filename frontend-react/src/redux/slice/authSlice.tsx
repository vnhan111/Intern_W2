import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userName: string | null; 
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

// Helper to load from localStorage
const loadFromStorage = (): { token: string | null; userName: string | null } => {
  try {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    return { token, userName };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return { token: null, userName: null };
  }
};

const initialState: AuthState = {
  token: loadFromStorage().token,
  userName: loadFromStorage().userName,
  isAuthenticated: !!loadFromStorage().token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login thành công
    successLogin: (state, action: PayloadAction<{ token: string; userName: string; message: string }>) => {
      const { token, userName } = action.payload;

      state.token = token;
      state.userName = userName;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
    },

    // Login thất bại
    failLogin: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },

    // Register thành công (backend trả cùng dạng LoginResponse → có token + userName)
    successRegister: (state, action: PayloadAction<{ token: string; userName: string; message: string }>) => {
      const { token, userName } = action.payload;

      state.token = token;
      state.userName = userName;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
    },

    // Register thất bại
    failRegister: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.userName = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },

    // Xóa error (khi đóng thông báo lỗi)
    clearError: (state) => {
      state.error = null;
    },

    // Nếu sau này có API get profile riêng để lấy thông tin user đầy đủ
    setUser: (state, action: PayloadAction<{ userName: string }>) => {
      state.userName = action.payload.userName;
      localStorage.setItem("userName", action.payload.userName);
    },

    // Reset toàn bộ state (nếu cần)
    reset: (state) => {
      state.token = null;
      state.userName = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
  },
});

export const {
  successLogin,
  failLogin,
  successRegister,
  failRegister,
  logout,
  clearError,
  setUser,
  reset,
} = authSlice.actions;

export default authSlice.reducer;