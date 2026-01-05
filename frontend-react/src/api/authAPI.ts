import axios from "axios";
export interface LoginRequest {
    userName: string;
    passWord: string;
}
export interface RegisterRequest {
    userName: string;
    fullName: string;
    email: string;
    passWord: string;
}
export interface LoginResponse {
    token: string;
    message: string;
    userName: string;
}

export const loginAPI = async (body: LoginRequest) => {
    try {
        const url = `http://localhost:5201/api/auth/login`;
        const response = await axios.post<LoginResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const registerAPI = async (body: RegisterRequest) => {
    try {
        const url = `http://localhost:5201/api/auth/register`;
        const response = await axios.post<LoginResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}