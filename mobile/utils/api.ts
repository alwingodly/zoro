import { useAuth } from "@clerk/clerk-expo";
import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = "https://zoro-ashy.vercel.app/api";

export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {
  const api = axios.create({ 
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
  });

  // Request interceptor
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        
        if (!token) {
          console.warn("No token available for request");
          throw new Error("Authentication token not available");
        }

        config.headers.Authorization = `Bearer ${token}`;
        console.log("Request with token:", config.url);
        
        return config;
      } catch (error) {
        console.error("Error getting token:", error);
        return Promise.reject(error);
      }
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for better error handling
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized request - token may be invalid or expired");
        // You could trigger a sign-out or token refresh here
      }
      
      console.error("API Error:", {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      return Promise.reject(error);
    }
  );

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
};

export const postApi = {
  createPost: (api: AxiosInstance, data: { content: string; image?: string }) =>
    api.post("/posts", data),
  getPosts: (api: AxiosInstance) => api.get("/posts"),
  getUserPosts: (api: AxiosInstance, username: string) => api.get(`/posts/user/${username}`),
  likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like`),
  deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}`),
};

export const commentApi = {
  createComment: (api: AxiosInstance, postId: string, content: string) =>
    api.post(`/comments/post/${postId}`, { content }),
};