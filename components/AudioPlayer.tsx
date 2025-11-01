import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Governorate } from '../types';
import { PlayButtonIcon, PauseIcon } from './icons/Icons';
import { getWaveformData, drawWaveform } from '../utils/waveform';
import { GOVERNORATE_AR_MAP } from '../constants';

// --- Type Definitions ---
interface AudioPlayerProps {
  src: string;
  governorate: Governorate;
  compact?: boolean;
}

// --- Utility Functions ---
/**
 * Formats time in seconds to MM:SS format
 */
const formatTime = (time: number): string => {
  if (isNaN(time) || time === Infinity || time < 0) {
    return '0:00';
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Draws a generic, static waveform as a fallback when the real audio data cannot be fetched.
 * This is useful when CORS prevents fetching audio data or when audio processing fails.
 */
const drawFallbackWaveform = (canvas: HTMLCanvasElement, color: string): void => {
  const samples = 100;
  // A simple sine wave pattern for a visually appealing fallback
  const fakeData = Array.from({ length: samples }, (_, i) => {
    const x = i / (samples - 1); // progress from 0 to 1
    const sine = Math.sin(x * Math.PI * 2 * 2.5); // 2.5 full waves
    const envelope = Math.pow(Math.sin(x * Math.PI), 0.7); // Envelope to make ends taper
    return Math.abs(sine) * envelope * 0.8 + 0.15; // Combine and add base height
  });
  drawWaveform(canvas, fakeData, color);
};

// --- Component ---
const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, governorate, compact = false }) => {
  // --- Refs ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- State ---
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // --- Early Return Guard (after hooks) ---
  if (!src || src.trim() === '') {
    return null;
  }

  // --- Waveform Rendering Effect (runs once per src change) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src || isLoaded) {
      return;
    }

    const waveformColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim() || '#0D9488';

    // Fetch and draw waveform
    getWaveformData(src)
      .then((audioData) => {
        if (!canvasRef.current) return; // Guard against unmount

        if (audioData && audioData.length > 0) {
          drawWaveform(canvasRef.current, audioData, waveformColor);
        } else {
          // If fetching/processing fails (e.g., CORS), draw a fallback
          drawFallbackWaveform(canvasRef.current, waveformColor);
        }
        setIsLoaded(true);
      })
      .catch((error) => {
        console.warn('AudioPlayer: Failed to load waveform data:', error);
        if (canvasRef.current) {
          drawFallbackWaveform(canvasRef.current, waveformColor);
          setIsLoaded(true);
        }
      });
  }, [src]); // Only depend on src, not isLoaded (prevents double-running)

  // --- Audio Duration and Time Tracking Effect ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const setAudioData = (): void => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      if (audio.currentTime && !isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    const setAudioTime = (): void => {
      if (audio.currentTime && !isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []); // Only run once on mount

  // --- Play/Pause State Synchronization Effect ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = (): void => setIsPlaying(true);
    const handlePause = (): void => setIsPlaying(false);
    const handleEnded = (): void => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []); // Only run once on mount

  // --- Play/Pause Toggle Handler ---
  const togglePlayPause = useCallback((): void => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('AudioPlayer: Audio element not found.');
      return;
    }

    if (!src || src.trim() === '') {
      console.error('AudioPlayer: No source URL provided.');
      return;
    }

    if (isPlaying) {
      try {
        audio.pause();
      } catch (error) {
        console.error('AudioPlayer: Error pausing audio:', error);
      }
    } else {
      audio
        .play()
        .then(() => {
          // Play started successfully - state will update via event listener
        })
        .catch((error) => {
          console.error('AudioPlayer: Error playing audio:', error);
          setIsPlaying(false); // Ensure state is correct on error
          // Provide user feedback if needed
        });
    }
  }, [isPlaying, src]);

  // --- Computed Values ---
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const governorateLabel = GOVERNORATE_AR_MAP[governorate] || governorate;

  // --- Compact Mode Render ---
  if (compact) {
    return (
      <div className="flex items-center space-x-2 w-full max-w-[250px] text-on-primary">
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          crossOrigin="anonymous"
        />
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center bg-white/20 text-on-primary transition-transform hover:scale-105"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          type="button"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayButtonIcon className="w-5 h-5" />
          )}
        </button>
        <div className="flex-grow">
          <div className="relative h-8 w-full">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div
              className="absolute top-0 left-0 h-full bg-white/30"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-xs opacity-70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Default Mode Render ---
  return (
    <div className="my-4 glass-card rounded-lg p-4 flex items-center space-x-4">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        crossOrigin="anonymous"
      />
      <button
        onClick={togglePlayPause}
        className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-primary text-on-primary transition-transform hover:scale-105"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        type="button"
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayButtonIcon className="w-6 h-6" />
        )}
      </button>
      <div className="flex-grow">
        <div className="relative h-12 w-full">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div
            className="absolute top-0 left-0 h-full bg-primary/30"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1 text-xs text-theme-text-muted">
          <span>{formatTime(currentTime)}</span>
          <span className="font-arabic font-bold">{governorateLabel}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
