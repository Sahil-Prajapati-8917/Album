import apiClient from '../../services/apiClient';

const userService = {
    getProfile: async () => {
        const response = await apiClient.get('/users/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await apiClient.put('/users/profile', data);
        return response.data;
    }
};

export default userService;
