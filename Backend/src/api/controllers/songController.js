const SongService = require('../../core/services/SongService');

exports.search = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, message: 'Query is required' });
        }
        const results = await SongService.searchYouTube(query);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error('Error searching YouTube:', error);
        res.status(500).json({ success: false, message: 'Failed to search YouTube' });
    }
};

exports.download = async (req, res) => {
    try {
        const { videoId, title, author, thumbnail, durationSeconds } = req.body;
        if (!videoId) {
            return res.status(400).json({ success: false, message: 'Video ID is required' });
        }
        const song = await SongService.downloadSong(videoId, title, author, thumbnail, durationSeconds);
        res.status(200).json({ success: true, data: song });
    } catch (error) {
        console.error('Error downloading song:', error);
        res.status(500).json({ success: false, message: 'Failed to download song. It might be age-restricted or unavailable.' });
    }
};