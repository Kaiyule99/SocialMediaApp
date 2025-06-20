const API_BASE_URL = 'https://supabase-socmed.vercel.app';

const request = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true' 
    };
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
        return { success: true };
    }

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

    return data;
};

const requestWithFormData = async (endpoint, method, formData, token) => {
    const headers = { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true' 
    };
    const config = { method, headers, body: formData };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed with no error details.' }));
        console.error("API Form Data Error Response:", errorData); 
        throw new Error(errorData.msg || errorData.message);
    }
    
    try {
        return await response.json();
    } catch (error) {
        console.log("Upload successful, but response was empty. Re-fetching user data.");
        return await getUserDataApi(token);
    }
};

export const registerUserApi = (fName, lName, email, password) => request('/register', 'POST', { fName, lName, email, password });
export const loginUserApi = (email, password) => request('/sign-in', 'POST', { email, password });
export const getUserDataApi = (token) => request('/user', 'GET', null, token);
export const updateProfilePictureApi = (token, file) => {
    const formData = new FormData();
    formData.append('profile', file);
    return requestWithFormData('/user/profile-picture', 'PATCH', formData, token);
};
export const fetchPostsApi = (token, page = 1) => request(`/post?page=${page}`, 'GET', null, token);
export const createPostApi = (token, content) => request('/post', 'POST', { content }, token);
export const likePostApi = (token, postId) => request(`/post/${postId}/likes`, 'POST', {}, token);
export const unlikePostApi = (token, postId) => request(`/post/${postId}/likes`, 'DELETE', null, token);
export const createReplyApi = (token, postId, content) => request(`/post/${postId}/replies`, 'POST', { content }, token);
