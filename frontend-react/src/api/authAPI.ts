import axios from "axios";
export interface LoginRequest {
    loginName: string;
    passWord: string;
}
export interface RegisterRequest {
    loginName: string;
    memberFullName: string;
    email: string;
    passWord: string;
}
export interface LoginResponse {
    token: string;
    message: string;
    loginName: string;
}

export const loginAPI = async (body: LoginRequest) => {
    try {
        const url = `http://localhost:5075/api/auth/login`;
        const response = await axios.post<LoginResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const registerAPI = async (body: RegisterRequest) => {
    try {
        const url = `http://localhost:5075/api/auth/register`;
        const response = await axios.post<LoginResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}