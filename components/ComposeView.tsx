import React, { useState, useRef } from 'react';
import { User, Post } from '../../types.ts';
import { SparklesIcon, PhotoIcon, VideoIcon, MicIcon } from '../icons/Icons.tsx';
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
        <div className="glass-card rounded-lg p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                <div className="w-full">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 text-lg placeholder-theme-text-muted"
                        rows={5}
                        placeholder="What's on your mind?"
                    />
                     <div className="border-t border-[var(--color-glass-border)] my-2"></div>
                     <div className="flex flex-col sm:flex-row gap-2">
                         <input 
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Or enter a topic for AI..."
                            className="flex-grow p-2 text-sm border border-[var(--color-glass-border)] rounded-md bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                         />
                         <button
                            onClick={handleGenerateSuggestion}
                            disabled={isGenerating}
                            className="flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-md hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <button className="p-2 rounded-full hover:bg-white/10 text-theme-text-muted"><PhotoIcon className="w-6 h-6"/></button>
                    <button className="p-2 rounded-full hover:bg-white/10 text-theme-text-muted"><VideoIcon className="w-6 h-6"/></button>
                    <button 
                        onClick={handleToggleRecording}
                        className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/10 text-red-400' : 'hover:bg-white/10 text-theme-text-muted'}`}
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
                    className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default ComposeView;