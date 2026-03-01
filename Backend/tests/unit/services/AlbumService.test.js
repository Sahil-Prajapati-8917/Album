const albumService = require('../../../src/core/services/AlbumService');
const albumRepository = require('../../../src/data/repositories/AlbumRepository');
const userRepository = require('../../../src/data/repositories/UserRepository');

// Mock the repositories
jest.mock('../../../src/data/repositories/AlbumRepository');
jest.mock('../../../src/data/repositories/UserRepository');
jest.mock('../../../src/infrastructure/storage');

describe('AlbumService Unit Tests', () => {
    const userId = 'user123';
    const albumData = {
        clientName: 'Test Client',
        functionDate: '2024-03-01',
        functionType: 'Wedding',
        photographerId: 'none'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully create an album when user has sufficient credits', async () => {
        // Mock userRepository.findOneAndUpdate for credit deduction
        userRepository.findOneAndUpdate.mockResolvedValue({ _id: userId, credits: 4 });
        
        // Mock albumRepository.create
        albumRepository.create.mockResolvedValue({ albumId: 'PF-TEST', ...albumData });

        const result = await albumService.createAlbum(userId, albumData, null);

        expect(result).toBeDefined();
        expect(userRepository.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({ _id: userId, credits: { $gte: 1 } }),
            expect.objectContaining({ $inc: { credits: -1 } }),
            expect.any(Object)
        );
        expect(albumRepository.create).toHaveBeenCalled();
    });

    test('should throw error when user has insufficient credits', async () => {
        // Mock userRepository.findOneAndUpdate to return null (insufficient credits)
        userRepository.findOneAndUpdate.mockResolvedValue(null);

        await expect(albumService.createAlbum(userId, albumData, null))
            .rejects.toThrow('Insufficient credits or credits expired');
            
        expect(albumRepository.create).not.toHaveBeenCalled();
    });
});
