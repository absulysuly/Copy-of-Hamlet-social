import React, { useState, useEffect, useRef } from 'react';
import { PlayButtonIcon, PauseIcon } from './icons/Icons.tsx';
import { Governorate } from '../types.ts';

interface AudioPlayerProps {
    src: string;
    governorate?: Governorate;
}

const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, governorate }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Effect to setup audio element and its event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0); // Reset on end for replayability
        };

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Preload metadata to get duration
        audio.load();

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [src]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(error => console.error("Audio play failed:", error));
        }
        setIsPlaying(!isPlaying);
    };
    
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = progressBarRef.current;
        const audio = audioRef.current;
        if (!progressBar || !audio) return;

        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * duration;
        
        if (isFinite(newTime)) {
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="my-4 p-3 bg-black/20 rounded-lg flex items-center space-x-4">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={src} preload="metadata" />
            
            <span className="text-2xl">🔊</span>
            <div className="flex-shrink-0">
                 <button 
                    onClick={togglePlayPause} 
                    className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    disabled={!src || duration === 0}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayButtonIcon className="w-5 h-5" />}
                </button>
            </div>
            <div className="flex-grow flex flex-col justify-center">
                 <p className="text-sm font-semibold font-arabic text-theme-text-muted">
                    {governorate ? `رسالة صوتية من ${governorate}` : 'رسالة صوتية'}
                </p>
                {/* Waveform and progress bar */}
                <div 
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                    className="w-full bg-white/20 rounded-full h-2 relative overflow-hidden mt-1 cursor-pointer group"
                >
                    <div 
                        className="bg-primary h-full rounded-full transition-all duration-100"
                        style={{ width: `${progressPercentage}%` }}
                    />
                     {/* Fake waveform SVG */}
                    <svg className="absolute inset-0 w-full h-full text-white/30" width="100%" height="100%" preserveAspectRatio="none">
                        <rect y="4" width="2" height="6" fill="currentColor" x="2%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="5%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="8%"></rect>
                        <rect y="1" width="2" height="12" fill="currentColor" x="11%"></rect>
                        <rect y="3" width="2" height="8" fill="currentColor" x="14%"></rect>
                        <rect y="0" width="2" height="14" fill="currentColor" x="17%"></rect>
                        <rect y="4" width="2" height="6" fill="currentColor" x="20%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="23%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="26%"></rect>
                        <rect y="1" width="2" height="12" fill="currentColor" x="29%"></rect>
                        <rect y="3" width="2" height="8" fill="currentColor" x="32%"></rect>
                        <rect y="0" width="2" height="14" fill="currentColor" x="35%"></rect>
                        <rect y="4" width="2" height="6" fill="currentColor" x="38%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="41%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="44%"></rect>
                        <rect y="1" width="2" height="12" fill="currentColor" x="47%"></rect>
                        <rect y="3" width="2" height="8" fill="currentColor" x="50%"></rect>
                        <rect y="0" width="2" height="14" fill="currentColor" x="53%"></rect>
                         <rect y="4" width="2" height="6" fill="currentColor" x="56%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="59%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="62%"></rect>
                        <rect y="1" width="2" height="12" fill="currentColor" x="65%"></rect>
                        <rect y="3" width="2" height="8" fill="currentColor" x="68%"></rect>
                        <rect y="0" width="2" height="14" fill="currentColor" x="71%"></rect>
                        <rect y="4" width="2" height="6" fill="currentColor" x="74%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="77%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="80%"></rect>
                        <rect y="1" width="2" height="12" fill="currentColor" x="83%"></rect>
                        <rect y="3" width="2" height="8" fill="currentColor" x="86%"></rect>
                        <rect y="0" width="2" height="14" fill="currentColor" x="89%"></rect>
                        <rect y="4" width="2" height="6" fill="currentColor" x="92%"></rect>
                        <rect y="2" width="2" height="10" fill="currentColor" x="95%"></rect>
                        <rect y="5" width="2" height="4" fill="currentColor" x="98%"></rect>
                    </svg>
                </div>
            </div>
            <div className="text-xs font-mono text-theme-text-muted">
                {formatTime(currentTime)}/{formatTime(duration)}
            </div>
        </div>
    );
};

export default AudioPlayer;
