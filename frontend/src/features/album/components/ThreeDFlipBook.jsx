import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Music } from 'lucide-react'
import './ThreeDFlipBook.css'

const ThreeDFlipBook = ({ images = [] }) => {
    const [currentSheetIndex, setCurrentSheetIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Audio references (optional)
    const flipAudioRef = useRef(new Audio('/assets/Page-flipix-sound.mp3'))
    // Mute errors on audio play if the file doesn't exist
    flipAudioRef.current.onerror = () => { }

    // Component container ref for fullscreen
    const containerRef = useRef(null)

    // Map flat images array into physical sheets (2 pages per sheet: front and back)
    // [Cover, S1Left, S1Right, S2Left, S2Right, BackCover]
    // Sheet 0: Front=Cover, Back=S1Left
    // Sheet 1: Front=S1Right, Back=S2Left
    const sheets = []
    for (let i = 0; i < images.length; i += 2) {
        sheets.push({
            front: images[i],
            back: images[i + 1] || null
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
            className="flex flex-col items-center justify-center w-full"
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
                                <div className="page-side front">
                                    <div className="page-shadow" />
                                    {sheet.front ? (
                                        <img
                                            src={sheet.front.src}
                                            alt={sheet.front.label || 'Page image'}
                                            className="page-image"
                                            draggable="false"
                                            onError={e => { e.target.style.display = 'none' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                                            Blank Page
                                        </div>
                                    )}
                                </div>

                                {/* Back Side */}
                                <div className="page-side back">
                                    <div className="page-shadow" />
                                    {sheet.back ? (
                                        <img
                                            src={sheet.back.src}
                                            alt={sheet.back.label || 'Page image'}
                                            className="page-image"
                                            draggable="false"
                                            onError={e => { e.target.style.display = 'none' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                                            Blank Page
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ThreeDFlipBook
