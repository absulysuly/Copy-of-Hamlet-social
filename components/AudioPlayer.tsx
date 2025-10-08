import React, { useState, useEffect, useRef } from 'react';
import { PlayButtonIcon, PauseIcon } from './icons/Icons.tsx';
import { Governorate } from '../types.ts';

interface AudioPlayerProps {
    duration: number; // in seconds
    governorate?: Governorate;
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration, governorate }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setProgress(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, duration]);
    
    useEffect(() => {
        // Reset progress if component re-renders with same duration (e.g. feed refresh)
        setProgress(0);
        setIsPlaying(false);
    }, [duration]);

    const togglePlay = () => {
        if (progress >= duration) {
            setProgress(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };
    
    const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

    return (
        <div className="my-4 p-3 bg-black/20 rounded-lg flex items-center space-x-4">
            <span className="text-2xl">🔊</span>
            <div className="flex-shrink-0">
                 <button 
                    onClick={togglePlay} 
                    className="w-10 h-10 flex items-center justify-center bg-brand-hot-pink text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-hot-pink"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayButtonIcon className="w-5 h-5" />}
                </button>
            </div>
            <div className="flex-grow flex flex-col justify-center">
                 <p className="text-sm font-semibold font-arabic text-slate-200">
                    {governorate ? `رسالة صوتية من ${governorate}` : 'رسالة صوتية'}
                </p>
                {/* Waveform and progress bar */}
                <div className="w-full bg-white/20 rounded-full h-2 relative overflow-hidden mt-1">
                    <div 
                        className="bg-brand-hot-pink h-full rounded-full"
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
            <div className="text-xs font-mono text-slate-400">
                {formatTime(progress)}/{formatTime(duration)}
            </div>
        </div>
    );
};

export default AudioPlayer;