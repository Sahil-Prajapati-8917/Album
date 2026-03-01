const userRepository = require('../../data/repositories/UserRepository');
const { generateToken } = require('../../common/middleware/auth');
const { normalizeEmail, sanitizeString } = require('../../common/middleware/validation');

class AuthService {
    async registerUser(userData) {
        const {
            email,
            password,
            personalName,
            accountType,
            city,
            state,
            country,
            district,
            studioName,
            specialty,
            ownerName,
            teamSize,
            photographersServed,
            gstNumber,
            mobileNumber,
            address
        } = userData;

        if (!accountType || !['photographer', 'lab'].includes(accountType)) {
            const error = new Error('Valid accountType (photographer or lab) is required.');
            error.statusCode = 400;
            throw error;
        }

        const normalizedEmail = normalizeEmail(email);
        const userExists = await userRepository.findOne({
            $or: [
                { email: email.toLowerCase().trim() },
                { normalizedEmail: normalizedEmail }
            ]
        });

        if (userExists) {
            const error = new Error('User already exists with this email');
            error.statusCode = 400;
            throw error;
        }

        let initialCredits = 0;
        const validityDate = new Date();
        validityDate.setDate(validityDate.getDate() + 7); // 7 days from today

        if (accountType === 'photographer') {
            initialCredits = 5;
        } else if (accountType === 'lab') {
            initialCredits = 10;
        }

        const user = await userRepository.create({
            email: email.toLowerCase().trim(),
            normalizedEmail,
            password,
            personalName: sanitizeString(personalName || ''),
            accountType,
            credits: initialCredits,
            creditValidity: validityDate,
            city: sanitizeString(city || ''),
            state: sanitizeString(state || ''),
            country: sanitizeString(country || ''),
            district: sanitizeString(district || ''),
            studioName: sanitizeString(studioName || ''),
            specialty: sanitizeString(specialty || ''),
            ownerName: sanitizeString(ownerName || ''),
            teamSize: teamSize || '',
            photographersServed: photographersServed || '',
            gstNumber: sanitizeString(gstNumber || ''),
            mobileNumber: mobileNumber ? mobileNumber.trim() : '',
            address: sanitizeString(address || '')
        });

        const token = generateToken(user._id);

        return { user, token };
    }

    async loginUser(email, password) {
        const user = await userRepository.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = generateToken(user._id);

        return { user, token };
    }

    async adminLogin(email, password) {
        if (typeof email !== 'string' || typeof password !== 'string') {
            const error = new Error('Invalid input');
            error.statusCode = 400;
            throw error;
        }

        const user = await userRepository.findOne({ email: email.toLowerCase().trim() });
        if (!user || user.role !== 'admin') {
            const error = new Error('Invalid credentials or insufficient privileges');
            error.statusCode = 401;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid credentials or insufficient privileges');
            error.statusCode = 401;
            throw error;
        }

        const token = generateToken(user._id);

        return { user, token };
    }
}

module.exports = new AuthService();
