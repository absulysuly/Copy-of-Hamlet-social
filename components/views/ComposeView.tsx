

import React, { useState, useRef } from 'react';
// Fix: added .ts extension to types import
import { User, Post } from '../../types.ts';
// Fix: added .tsx extension to Icons import
import { SparklesIcon, PhotoIcon, VideoIcon, MicIcon } from '../icons/Icons.tsx';
// Fix: added .ts extension to geminiService import
import { generatePostSuggestion } from '../../services/geminiService.ts';

// Add SpeechRecognition to the window interface for TypeScript
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}


interface ComposeViewProps {
    user: User;
    onPost: (postDetails: Partial<Post>) => void;
}

const ComposeView: React.FC<ComposeViewProps> = ({ user, onPost }) => {
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<any>(null);
    const contentOnRecordStartRef = useRef('');

    const handleGenerateSuggestion = async () => {
        if (!topic) {
            alert("Please enter a topic for the post suggestion.");
            return;
        }
        setIsGenerating(true);
        const suggestion = await generatePostSuggestion(topic);
        setContent(suggestion);
        setIsGenerating(false);
    };

    const handlePost = () => {
        if (content.trim()) {
            onPost({ content, type: 'Post' });
            setContent('');
            setTopic('');
        }
    };
    
    const handleToggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'ar-IQ'; // Iraqi Arabic
        recognitionRef.current.interimResults = true;
        recognitionRef.current.continuous = true;

        contentOnRecordStartRef.current = content;

        recognitionRef.current.onstart = () => {
            setIsRecording(true);
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
            recognitionRef.current = null;
        };
        
        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsRecording(false);
        };

        recognitionRef.current.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
             // Use a space to ensure separation of words
            const separator = contentOnRecordStartRef.current.length > 0 ? ' ' : '';
            setContent(contentOnRecordStartRef.current + separator + finalTranscript + interimTranscript);
        };

        recognitionRef.current.start();
    };

    return (
        <div className="glass-card rounded-lg p-4 text-white">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                <div className="w-full">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 text-lg placeholder-slate-400"
                        rows={5}
                        placeholder="What's on your mind?"
                    />
                     <div className="border-t border-white/20 my-2"></div>
                     <div className="flex flex-col sm:flex-row gap-2">
                         <input 
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Or enter a topic for AI..."
                            className="flex-grow p-2 text-sm border border-white/20 rounded-md bg-white/10 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-hot-pink"
                         />
                         <button
                            onClick={handleGenerateSuggestion}
                            disabled={isGenerating}
                            className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold text-brand-hot-pink bg-brand-hot-pink/10 rounded-md hover:bg-brand-hot-pink/20 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            <SparklesIcon className="w-4 h-4"/>
                            <span>{isGenerating ? 'Generating...' : 'Get Suggestion'}</span>
                         </button>
                     </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-1 items-center">
                    {/* TODO: Implement image and video upload functionality. */}
                    <button className="p-2 rounded-full hover:bg-white/10 text-slate-400"><PhotoIcon className="w-6 h-6"/></button>
                    <button className="p-2 rounded-full hover:bg-white/10 text-slate-400"><VideoIcon className="w-6 h-6"/></button>
                    <button 
                        onClick={handleToggleRecording}
                        className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/10 text-red-400' : 'hover:bg-white/10 text-slate-400'}`}
                    >
                        <MicIcon className="w-6 h-6" />
                        <span className="text-xs font-medium font-arabic hidden sm:inline">
                           {isRecording ? 'إيقاف التسجيل' : 'سجل بالصوت'}
                        </span>
                    </button>
                </div>
                <button
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className="px-6 py-2 font-bold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default ComposeView;