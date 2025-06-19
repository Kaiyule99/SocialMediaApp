// This file contains the API configuration with your provided link.
const API_BASE_URL = 'https://supabase-socmed.vercel.app';

const request = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = { 'Accept': 'application/json' };
    const config = { method, headers };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.body = new URLSearchParams(body).toString();
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 204 || response.status === 201) {
        return { success: true, status: response.status };
    }
    
    const data = await response.json();

    if (!response.ok) {
        const errorMsg = data.msg || `An error occurred with status: ${response.status}`;
        throw new Error(errorMsg);
    }

    return data;
};

// --- AUTH ---
export const registerUserApi = (name, email, password) => request('/register', 'POST', { name, email, password });
export const loginUserApi = (email, password) => request('/sign-in', 'POST', { email, password });
export const getUserDataApi = (token) => request('/user', 'GET', null, token);

// --- POSTS ---
export const fetchPostsApi = (token, page = 1) => request(`/post?page=${page}`, 'GET', null, token);
export const createPostApi = (token, content) => request('/post', 'POST', { content }, token);
export const likePostApi = (token, postId) => request(`/post/${postId}/likes`, 'POST', {}, token);
export const unlikePostApi = (token, postId) => request(`/post/${postId}/likes`, 'DELETE', null, token);
