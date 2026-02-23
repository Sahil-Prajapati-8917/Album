const Photographer = require('../models/Photographer');

// Create photographer
exports.createPhotographer = async (req, res) => {
    try {
        const photographer = new Photographer({
            ...req.body,
            userId: req.user.id
        });
        await photographer.save();
        res.status(201).json({
            success: true,
            data: photographer
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
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
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Update photographer
exports.updatePhotographer = async (req, res) => {
    try {
        const photographer = await Photographer.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
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
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
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
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
