import React, { useState, useRef, useEffect } from 'react';
import { Governorate } from '../types.ts';
import { PlayButtonIcon, PauseIcon } from './icons/Icons.tsx';
import { GOVERNORATE_AR_MAP } from '../constants.ts';

interface AudioPlayerProps {
    src: string;
    governorate: Governorate;
    compact?: boolean;
}

const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, governorate, compact = false }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Effect to setup audio event listeners for time updates
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const setAudioData = () => {
                setDuration(audio.duration);
                setCurrentTime(audio.currentTime);
            }

            const setAudioTime = () => setCurrentTime(audio.currentTime);

            audio.addEventListener("loadeddata", setAudioData);
            audio.addEventListener("timeupdate", setAudioTime);

            return () => {
                audio.removeEventListener("loadeddata", setAudioData);
                audio.removeEventListener("timeupdate", setAudioTime);
            }
        }
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (!audio.src || audio.currentSrc === "") {
                console.error("AudioPlayer: No source URL provided.");
                return;
            }
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(error => console.error("Error playing audio:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    // Effect to sync component state with audio element state
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);

            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handlePause);

            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handlePause);
            };
        }
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (compact) {
        return (
            <div className="flex items-center space-x-2 w-full max-w-[250px] text-on-primary">
                <audio ref={audioRef} src={src} preload="metadata"></audio>
                <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center bg-white/20 text-on-primary transition-transform hover:scale-105"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayButtonIcon className="w-5 h-5" />}
                </button>
                <div className="flex-grow">
                    <div className="relative h-8 w-full flex items-center">
                        <div className="w-full h-1.5 bg-white/30 rounded-full">
                            <div
                                className="h-1.5 bg-white/60 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                     <div className="flex justify-between items-center mt-1 text-xs opacity-70">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="my-4 glass-card rounded-lg p-4 flex items-center space-x-4">
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            <button
                onClick={togglePlayPause}
                className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-primary text-on-primary transition-transform hover:scale-105"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayButtonIcon className="w-6 h-6" />}
            </button>
            <div className="flex-grow">
                <div className="relative h-12 w-full flex items-center">
                    <div className="w-full h-2 bg-slate-700/50 rounded-full">
                        <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                 <div className="flex justify-between items-center mt-1 text-xs text-theme-text-muted">
                    <span>{formatTime(currentTime)}</span>
                     <span className="font-arabic font-bold">{GOVERNORATE_AR_MAP[governorate] || governorate}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;