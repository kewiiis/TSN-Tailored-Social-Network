import { api } from './api';

export const getPosts = () => api.get('/posts');
export const createPost = (content) => api.post('/posts', { content });
export const updatePost = (id, content) => api.put(`/posts/${id}`, { content });
export const deletePost = (id) => api.delete(`/posts/${id}`);
