import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Music, Volume2, VolumeX } from 'lucide-react'
import './ThreeDFlipBook.css'

const ThreeDFlipBook = ({ images = [], musicUrl = null, musicTrack = null, musicStartTime = 0 }) => {
    const [turnedPages, setTurnedPages] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [hasTurnedFirstPage, setHasTurnedFirstPage] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [scale, setScale] = useState(1)
    const [showHint, setShowHint] = useState(true) // For the cover animation

    // Audio references
    const flipAudioRef = useRef(new Audio('/assets/Page-flipix-sound.mp3'))
    flipAudioRef.current.onerror = () => { }
    const bgMusicRef = useRef(null)

    // Calculate responsive scale
    useEffect(() => {
        const calculateScale = () => {
            const isDesktop = window.innerWidth >= 1100
            const bookOpenWidth = isDesktop ? 1000 : 592
            const bookOpenHeight = isDesktop ? 666 : 394

            // Target 90% of screen to leave margins
            const targetWidth = window.innerWidth * 0.95
            const targetHeight = window.innerHeight * 0.85

            const scaleX = targetWidth / bookOpenWidth
            const scaleY = targetHeight / bookOpenHeight

            // Only scale down, never up (or max 1)
            const finalScale = Math.min(1, scaleX, scaleY)
            setScale(finalScale)
        }

        calculateScale()
        window.addEventListener('resize', calculateScale)
        return () => window.removeEventListener('resize', calculateScale)
    }, [])

    // Setup background music
    useEffect(() => {
        if (musicUrl && !bgMusicRef.current) {
            const url = musicUrl.startsWith('http') ? musicUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'}${musicUrl}`
            bgMusicRef.current = new Audio(url)
            bgMusicRef.current.loop = true
            bgMusicRef.current.volume = 0.5
            bgMusicRef.current.muted = isMuted
            bgMusicRef.current.currentTime = musicStartTime || 0
        } else if (!musicUrl && musicTrack && !bgMusicRef.current) {
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

    useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = isMuted
        }
    }, [isMuted])

    useEffect(() => {
        if (turnedPages > 0 && !hasTurnedFirstPage) {
            setHasTurnedFirstPage(true)
            setShowHint(false) // Stop hint animation if user interacts
            if (bgMusicRef.current) {
                bgMusicRef.current.play().catch(e => console.log('Audio autoplay blocked:', e))
            }
        }
    }, [turnedPages, hasTurnedFirstPage])

    const containerRef = useRef(null)

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`)
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

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])


    // Preload images
    useEffect(() => {
        if (!images) return
        images.forEach(img => {
            if (img && img.src) {
                const i = new Image()
                i.src = img.src
            }
        })
    }, [images])

    const playFlipSound = () => {
        try {
            flipAudioRef.current.currentTime = 0
            const playPromise = flipAudioRef.current.play()
            if (playPromise !== undefined) playPromise.catch(() => { })
        } catch (err) { }
    }

    // Book geometry calculations matching Flipix
    const innerImages = images.length > 2 ? images.slice(1, -1) : []
    const numPages = innerImages.length
    // const totalTurnableSheets = numPages > 0 ? numPages + 1 : 1 // Cover + Inners
    // const isSingleImage = images.length === 1
    const totalSheetsCount = numPages + 1 // Number of physical pages including front and back

    const nextPage = useCallback(() => {
        setTurnedPages(prev => {
            if (prev < totalSheetsCount) {
                playFlipSound()
                setShowHint(false)
                return prev + 1
            }
            return prev
        })
    }, [totalSheetsCount])

    const prevPage = useCallback(() => {
        setTurnedPages(prev => {
            if (prev > 0) {
                playFlipSound()
                return prev - 1
            }
            return prev
        })
    }, [])

    const handleSheetClick = useCallback((isFlipped) => {
        setShowHint(false)
        isFlipped ? prevPage() : nextPage()
    }, [prevPage, nextPage])

    // Auto-play logic
    useEffect(() => {
        let interval
        if (isPlaying) {
            interval = setInterval(() => {
                setTurnedPages(prev => {
                    if (prev < totalSheetsCount) {
                        playFlipSound()
                        return prev + 1
                    } else {
                        setIsPlaying(false)
                        return prev
                    }
                })
            }, 2500)
        }
        return () => clearInterval(interval)
    }, [isPlaying, totalSheetsCount])

    // Flipix Container States
    const isBookOpen = turnedPages > 0 && turnedPages < totalSheetsCount
    const isBookClosed = turnedPages === totalSheetsCount

    let bookStateClass = ''
    if (isBookOpen) bookStateClass = 'open'
    if (isBookClosed) bookStateClass = 'close'

    // Flipix calculates the EXACT CSS physics overlap threshold
    let firstHalf = 0
    if (numPages % 2 !== 0) { // If the number is odd
        firstHalf = Math.floor(numPages / 2) + 1
    } else { // If the number is even
        firstHalf = Math.floor(numPages / 2)
    }

    if (!images || images.length === 0) return null

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-[75vh] relative"
            ref={containerRef}
            style={{ backgroundColor: isFullscreen ? '#171717' : 'transparent', padding: isFullscreen ? '40px' : '0' }}
        >
            <div className="flipbook-wrapper">
                {/* Scaler Wrapper */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        pointerEvents: 'none'
                    }}
                >
                    <div className={`book ${bookStateClass}`} style={{ pointerEvents: 'auto' }}>

                  
                        <div
                            id="frontCover"
                            className={`front-cover page ${1 > (firstHalf + 1) ? 'last-half' : 'first-half'} ${turnedPages >= 1 ? 'turn' : ''} ${showHint && turnedPages === 0 ? 'hint-anim' : ''}`}
                            style={{ '--count': 1, '--reverse-count': numPages + 2 }}
                            onClick={() => handleSheetClick(turnedPages >= 1)}
                        >
                            <div className="front-page">
                                <img src={images[0].src} alt="Cover" draggable="false" />
                            </div>
                            <div className="back-page blank" />
                        </div>

                      
                        {Array.from({ length: numPages }).map((_, i) => {
                            const count = i + 2
                            const reverseCount = numPages + 1 - i
                            const isLastHalf = count > (firstHalf + 1)
                            const isTurned = turnedPages >= count

                            const frontImage = innerImages[i]
                            const backImage = innerImages[i + 1]

                            const isFirstInner = i === 0;
                            const isLastInnerFront = numPages === i + 1 ;
                           

                            return (
                                <div
                                    key={`page${i + 1}`}
                                    id={`page${i + 1}`}
                                    className={`inner page ${isLastHalf ? 'last-half' : 'first-half'} ${isTurned ? 'turn' : ''}`}
                                    style={{ '--count': count, '--reverse-count': reverseCount }}
                                    onClick={() => handleSheetClick(isTurned)}
                                >
                                    {frontImage && i + 1 !== numPages ? (
                                        <div className="front-page">
                                            <img src={frontImage.src} alt={`Page ${i + 1}`} draggable="false" className={isFirstInner || isLastInnerFront  ? 'single-img' : ''} />
                                        </div>
                                    ) : (
                                        <div className="front-page blank" />
                                    )}

                                    {backImage ? (
                                        <div className="back-page">
                                            <img src={backImage.src} alt={`Page ${i + 1}`} draggable="false" className={ (i === numPages - 2)  ? 'single-img' : ''} />
                                        </div>
                                    ) : (
                                        <div className="back-page blank" />
                                    )}
                                </div>
                            )
                        })}

                        {/* BACK COVER */}
                        {images.length > 1 && (
                            <div
                                id="backCover"
                                className={`back-cover page ${(numPages + 2) > (firstHalf + 1) ? 'last-half' : 'first-half'} ${turnedPages >= totalSheetsCount ? 'turn' : ''}`}
                                style={{ '--count': numPages + 2, '--reverse-count': 1 }}
                                onClick={() => handleSheetClick(turnedPages >= totalSheetsCount)}
                            >
                                <div className="front-page blank" />
                                <div className="back-page">
                                    <img src={images[images.length - 1].src} alt="Back Cover" draggable="false" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Navigation Controls */}
            <div className="floating-controls">
                <button
                    className="control-btn"
                    onClick={prevPage}
                    disabled={turnedPages === 0}
                    title="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>

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
                    disabled={turnedPages >= totalSheetsCount}
                    title="Next Page"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default ThreeDFlipBook
