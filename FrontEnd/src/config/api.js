const API_BASE_URL = 'http://localhost:5001/api';

export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    
    // User endpoints
    GET_PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
    
    // Advocate endpoints
    GET_ADVOCATES: `${API_BASE_URL}/advocates`,
    GET_ADVOCATE: (id) => `${API_BASE_URL}/advocates/${id}`,
    UPDATE_ADVOCATE_PROFILE: `${API_BASE_URL}/advocates/profile`,
    ADD_ADVOCATE_REVIEW: (id) => `${API_BASE_URL}/advocates/${id}/reviews`,
    
    // Intern endpoints
    GET_INTERNS: `${API_BASE_URL}/interns`,
    GET_INTERN: (id) => `${API_BASE_URL}/interns/${id}`,
    UPDATE_INTERN_PROFILE: `${API_BASE_URL}/interns/profile`,
    ADD_INTERN_ACHIEVEMENT: `${API_BASE_URL}/interns/achievements`,
    ADD_INTERN_CERTIFICATION: `${API_BASE_URL}/interns/certifications`,
};

export default API_ENDPOINTS; 