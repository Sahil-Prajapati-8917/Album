const Photographer = require('../models/Photographer');
const { sanitizeString } = require('../middleware/validation');

// Create photographer — with field whitelist (API-07)
exports.createPhotographer = async (req, res) => {
    try {
        const { name, mobile, city, state, address } = req.body;

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Photographer name is required' });
        }

        if (!mobile || typeof mobile !== 'string' || mobile.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Mobile number is required' });
        }

        const photographer = new Photographer({
            name: sanitizeString(name).substring(0, 100),
            mobile: mobile.trim().substring(0, 20),
            city: sanitizeString(city || '').substring(0, 100),
            state: sanitizeString(state || '').substring(0, 100),
            address: sanitizeString(address || '').substring(0, 500),
            userId: req.user.id
        });

        await photographer.save();

        res.status(201).json({
            success: true,
            data: photographer
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all photographers for user
exports.getMyPhotographers = async (req, res) => {
    try {
        const photographers = await Photographer.find({ userId: req.user.id }).sort({ name: 1 });
        res.status(200).json({
            success: true,
            data: photographers
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update photographer — with field whitelist
exports.updatePhotographer = async (req, res) => {
    try {
        // Whitelist allowed fields
        const allowedFields = ['name', 'mobile', 'city', 'state', 'address', 'status'];
        const sanitizedUpdates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                if (field === 'status' && !['Active', 'Inactive'].includes(req.body[field])) {
                    return res.status(400).json({
                        success: false,
                        message: 'Status must be Active or Inactive'
                    });
                }
                sanitizedUpdates[field] = typeof req.body[field] === 'string'
                    ? sanitizeString(req.body[field])
                    : req.body[field];
            }
        }

        const photographer = await Photographer.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            sanitizedUpdates,
            { new: true, runValidators: true }
        );
        if (!photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }
        res.status(200).json({
            success: true,
            data: photographer
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete photographer
exports.deletePhotographer = async (req, res) => {
    try {
        const photographer = await Photographer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!photographer) {
            return res.status(404).json({ success: false, message: 'Photographer not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Photographer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
