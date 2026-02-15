import apiClient from '../../services/apiClient';

const albumService = {
    getAllAlbums: async () => {
        const response = await apiClient.get('/albums');
        return response.data;
    },
    createAlbum: async (data) => {
        const response = await apiClient.post('/albums', data);
        return response.data;
    },
    getAlbumById: async (id) => {
        const response = await apiClient.get(`/albums/${id}`);
        return response.data;
    }
};

export default albumService;
