const authService = require('../../../src/core/services/AuthService');
const userRepository = require('../../../src/data/repositories/UserRepository');
const { generateToken } = require('../../../src/common/middleware/auth');

// Mock the dependencies
jest.mock('../../../src/data/repositories/UserRepository');
jest.mock('../../../src/common/middleware/auth');

describe('AuthService Unit Tests', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        comparePassword: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should login successfully with correct credentials', async () => {
        userRepository.findOne.mockResolvedValue(mockUser);
        mockUser.comparePassword.mockResolvedValue(true);
        generateToken.mockReturnValue('mock-token');

        const result = await authService.loginUser(email, password);

        expect(result.user).toEqual(mockUser);
        expect(result.token).toBe('mock-token');
        expect(mockUser.comparePassword).toHaveBeenCalledWith(password);
    });

    test('should throw error with incorrect password', async () => {
        userRepository.findOne.mockResolvedValue(mockUser);
        mockUser.comparePassword.mockResolvedValue(false);

        await expect(authService.loginUser(email, password))
            .rejects.toThrow('Invalid email or password');
    });

    test('should throw error if user not found', async () => {
        userRepository.findOne.mockResolvedValue(null);

        await expect(authService.loginUser(email, password))
            .rejects.toThrow('Invalid email or password');
    });
});
