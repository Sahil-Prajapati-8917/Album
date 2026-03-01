import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Music, Volume2, VolumeX } from 'lucide-react'
import './ThreeDFlipBook.css'

const ThreeDFlipBook = ({ images = [], musicUrl = null, musicTrack = null, musicStartTime = 0 }) => {
    const [currentSheetIndex, setCurrentSheetIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hasTurnedFirstPage, setHasTurnedFirstPage] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Audio references for page flip
    const flipAudioRef = useRef(new Audio('/assets/Page-flipix-sound.mp3'))
    flipAudioRef.current.onerror = () => { }

    // Background music reference
    const bgMusicRef = useRef(null)

    // Setup background music
    useEffect(() => {
        if (musicUrl && !bgMusicRef.current) {
            const url = musicUrl.startsWith('http') ? musicUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'}${musicUrl}`
            bgMusicRef.current = new Audio(url)
            bgMusicRef.current.loop = true
            bgMusicRef.current.volume = 0.5 // Default volume
            bgMusicRef.current.muted = isMuted
            bgMusicRef.current.currentTime = musicStartTime || 0
        } else if (!musicUrl && musicTrack && !bgMusicRef.current) {
            // Fallback for default tracks
            bgMusicRef.current = new Audio(`/assets/${musicTrack}`)
            bgMusicRef.current.loop = true
            bgMusicRef.current.volume = 0.5
            bgMusicRef.current.muted = isMuted
        }

        return () => {
            if (bgMusicRef.current) {
                bgMusicRef.current.pause()
            }
        }
    }, [musicUrl, musicTrack, musicStartTime])

    // Sync mute state
    useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = isMuted
        }
    }, [isMuted])

    // Trigger music on first page turn
    useEffect(() => {
        if (currentSheetIndex > 0 && !hasTurnedFirstPage) {
            setHasTurnedFirstPage(true)
            if (bgMusicRef.current) {
                bgMusicRef.current.play().catch(e => console.log('Audio autoplay blocked:', e))
            }
        }
    }, [currentSheetIndex, hasTurnedFirstPage])

    // Component container ref for fullscreen
    const containerRef = useRef(null)

    // Map flat images array into physical sheets (2 pages per sheet: front and back)
    // [Cover, S1Left, S1Right, S2Left, S2Right, BackCover]
    // Sheet 0: Front=Cover, Back=S1Left
    // Sheet 1: Front=S1Right, Back=S2Left
    // Determine how many pages we need and how they map to spreads.
    // 1. First spread (after cover) -> Left is Blank, Right is First Inner Image (fit entirely)
    // 2. Middle spreads -> 32:9 panorama spanning both left and right pages
    // 3. Last spread -> Left is Last Inner Image (fit entirely), Right is Blank
    // Exception: If only 1 inner image is uploaded, it spans BOTH pages of the first spread.
    const sheets = []

    if (images.length === 0) {
        // Handle empty
    } else if (images.length === 1) {
        sheets.push({ front: images[0], back: null })
    } else if (images.length === 2) {
        sheets.push({ front: images[0], back: null })
        sheets.push({ front: null, back: images[1] })
    } else if (images.length === 3) {
        // Exactly 1 inner image -> span both pages
        sheets.push({ 
            front: images[0], 
            back: images[1], 
            backClass: 'spread-left' 
        })
        sheets.push({ 
            front: images[1], 
            frontClass: 'spread-right', 
            back: images[2] 
        })
    } else {
        // 2 or more inner images
        // Sheet 0: Cover / Blank
        sheets.push({
            front: images[0],
            back: null
        })

        // Middle sheets
        for (let i = 1; i < images.length - 2; i++) {
            const isFirstInner = (i === 1)
            const isLastInner = (i === images.length - 3)
            
            sheets.push({
                front: images[i],
                frontClass: isFirstInner ? '' : 'spread-right',
                back: images[i + 1],
                backClass: isLastInner ? '' : 'spread-left'
            })
        }

        // Last sheet: Blank / BackCover
        sheets.push({
            front: null,
            back: images[images.length - 1]
        })
    }

    const numSheets = sheets.length

    const playFlipSound = () => {
        try {
            flipAudioRef.current.currentTime = 0
            const playPromise = flipAudioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.catch(_error => {
                    // Playback failed (e.g., file missing or browser blocked autoplay), silently ignore
                })
            }
        } catch (err) {
            // Ignored
        }
    }

    const nextPage = useCallback(() => {
        setCurrentSheetIndex(prev => {
            if (prev < numSheets) {
                playFlipSound()
                return prev + 1
            }
            return prev
        })
    }, [numSheets])

    const prevPage = useCallback(() => {
        setCurrentSheetIndex(prev => {
            if (prev > 0) {
                playFlipSound()
                return prev - 1
            }
            return prev
        })
    }, [])

    // Auto-play logic
    useEffect(() => {
        let interval
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSheetIndex(prev => {
                    if (prev < numSheets) {
                        playFlipSound()
                        return prev + 1
                    } else {
                        // Reached end, loop back or stop
                        setIsPlaying(false)
                        return prev
                    }
                })
            }, 2500) // 2.5s per page
        }
        return () => clearInterval(interval)
    }, [isPlaying, numSheets])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
            })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const toggleMute = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    // Monitor real fullscreen changes (e.g., if user preses ESC)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    // Calculate container class based on state (for shifting the book to center)
    let containerClass = 'book-container '
    if (currentSheetIndex === 0) {
        containerClass += 'closed-front'
    } else if (currentSheetIndex === numSheets) {
        containerClass += 'closed-back'
    } else {
        containerClass += 'open'
    }

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-[75vh] relative"
            ref={containerRef}
            style={{ backgroundColor: isFullscreen ? '#171717' : 'transparent', padding: isFullscreen ? '40px' : '0' }}
        >
            <div className="flipbook-wrapper">
                <div className={containerClass}>
                    {sheets.map((sheet, idx) => {
                        const isFlipped = idx < currentSheetIndex
                        const zIndex = isFlipped ? idx + 1 : numSheets - idx

                        return (
                            <div
                                key={idx}
                                className={`book-sheet ${isFlipped ? 'flipped' : ''}`}
                                style={{ zIndex }}
                                onClick={() => isFlipped ? prevPage() : nextPage()}
                            >
                                {/* Front Side */}
                                <div className="page-side front overflow-hidden">
                                    <div className="page-shadow" />
                                    {sheet.front ? (
                                        <img
                                            src={sheet.front.src}
                                            alt={sheet.front.label || 'Page image'}
                                            className={`page-image ${sheet.isSpread ? 'spread-right' : ''}`}
                                            draggable="false"
                                            onError={e => { e.target.style.display = 'none' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
                                        </div>
                                    )}
                                </div>

                                {/* Back Side */}
                                <div className="page-side back overflow-hidden">
                                    <div className="page-shadow" />
                                    {sheet.back ? (
                                        <img
                                            src={sheet.back.src}
                                            alt={sheet.back.label || 'Page image'}
                                            className={`page-image ${sheet.isSpread ? 'spread-left' : ''}`}
                                            draggable="false"
                                            onError={e => { e.target.style.display = 'none' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden">
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Floating Navigation Controls */}
            <div className="floating-controls">
                <button
                    className="control-btn"
                    onClick={prevPage}
                    disabled={currentSheetIndex === 0}
                    title="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="page-counter">
                    {Math.min(currentSheetIndex * 2, images.length)} / {images.length}
                </div>

                <button
                    className={`control-btn ${isPlaying ? 'play-active' : ''}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause Autoplay' : 'Autoplay'}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                </button>

                {(musicUrl || musicTrack) && (
                    <button
                        className="control-btn"
                        onClick={toggleMute}
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                )}

                <button
                    className="control-btn"
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                >
                    <Maximize size={18} />
                </button>

                <button
                    className="control-btn"
                    onClick={nextPage}
                    disabled={currentSheetIndex >= numSheets}
                    title="Next Page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default ThreeDFlipBook
