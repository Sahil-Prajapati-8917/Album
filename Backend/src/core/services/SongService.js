const yts = require('yt-search');
const ytDlp = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');
const Song = require('../../data/models/Song');

class SongService {
    async searchYouTube(query) {
        const r = await yts(query);
        // Return top 10 results
        return r.videos.slice(0, 10).map(v => ({
            videoId: v.videoId,
            title: v.title,
            author: v.author.name,
            thumbnail: v.thumbnail,
            duration: v.seconds,
            durationTimestamp: v.timestamp
        }));
    }

    async downloadSong(videoId, title, author, thumbnail, durationSeconds) {
        // Check if song already exists in DB
        let song = await Song.findOne({ videoId });
        if (song) {
            return song;
        }

        const fileName = `song-${videoId}-${Date.now()}.m4a`; // Use native m4a
        // Need to correctly resolve the uploads directory. It's at Backend/uploads
        const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads', 'songs');

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, fileName);

        try {
            // Using yt-dlp to natively download m4a (supported by all browsers, avoids ffmpeg dependency)
            await ytDlp(`https://www.youtube.com/watch?v=${videoId}`, {
               format: 'bestaudio[ext=m4a]',
                output: filePath,
                noWarnings: true,
                noCheckCertificates: true
            });

            // Save to DB
            const relativePath = `/uploads/songs/${fileName}`;
            song = await Song.create({
                videoId,
                title,
                author,
                thumbnail,
                filePath: relativePath,
                durationSeconds
            });
            return song;

        } catch (error) {
            // Clean up partial file if error
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new Error(`Failed to download audio from YouTube: ${error.message}`);
        }
    }
}

module.exports = new SongService();