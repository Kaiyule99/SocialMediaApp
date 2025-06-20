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

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
    }

    if (!response.ok) {
        console.error("API Error Response:", data); 
        const errorMsg = data?.msg || data?.error || data?.message || `An error occurred with status: ${response.status}`;
        throw new Error(errorMsg);
    }

    if (response.status === 204 || response.status === 201) {
        return { success: true };
    }

    return data;
};

// --- NEW HELPER FOR FILE UPLOADS ---
const requestWithFormData = async (endpoint, method = 'PATCH', formData, token) => {
    const headers = { 'Accept': 'application/json' };
    const config = { method, headers, body: formData };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Note: 'Content-Type' is not set manually. The browser will automatically set it
    // to 'multipart/form-data' and include the boundary.

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        console.error("API Error Response:", data); 
        const errorMsg = data?.msg || data?.error || data?.message || `An error occurred with status: ${response.status}`;
        throw new Error(errorMsg);
    }

    return data;
};


// --- AUTH ---
export const registerUserApi = (fName, lName, email, password) => request('/register', 'POST', { fName, lName, email, password });
export const loginUserApi = (email, password) => request('/sign-in', 'POST', { email, password });
export const getUserDataApi = (token) => request('/user', 'GET', null, token);

// --- NEW FUNCTION TO UPDATE PROFILE PICTURE ---
export const updateProfilePictureApi = (token, file) => {
    const formData = new FormData();
    formData.append('profile', file); // 'profile' is the key the API expects
    return requestWithFormData('/user/profile-picture', 'PATCH', formData, token);
};

// --- POSTS ---
export const fetchPostsApi = (token, page = 1) => request(`/post?page=${page}`, 'GET', null, token);
export const createPostApi = (token, content) => request('/post', 'POST', { content }, token);
export const likePostApi = (token, postId) => request(`/post/${postId}/likes`, 'POST', {}, token);
export const unlikePostApi = (token, postId) => request(`/post/${postId}/likes`, 'DELETE', null, token);
