const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
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

        const fileName = `song-${videoId}-${Date.now()}.mp4`; // m4a/mp4 audio works well in browser
        // Need to correctly resolve the uploads directory. It's at Backend/uploads
        const uploadsDir = path.join(__dirname, '../../../../uploads/songs');
        
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, fileName);

        return new Promise((resolve, reject) => {
            // It will log warnings but will successfully download standard m4a audio
            const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
                filter: 'audioonly',
                // lowestaudio bypasses some aggressive cypher blocks while still being acceptable for background music
                quality: 'lowestaudio' 
            });

            stream.pipe(fs.createWriteStream(filePath))
                .on('finish', async () => {
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
                    resolve(song);
                })
                .on('error', (err) => {
                    // Clean up partial file if error
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                    reject(err);
                });
        });
    }
}

module.exports = new SongService();