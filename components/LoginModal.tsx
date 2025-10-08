import React from 'react';
import { User, UserRole, Language } from '../types.ts';
import { EditIcon, XMarkIcon } from './icons/Icons.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import { UI_TEXT } from '../translations.ts';
import * as api from '../services/apiService.ts';

interface LoginModalProps {
    onLogin: (user: User) => void;
    onClose: () => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    isElectionMode: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, language, onLanguageChange, isElectionMode }) => {
    const handleSelectRole = async (role: UserRole) => {
        // TODO: This now uses the apiService, which simulates a backend call.
        // Once the backend is live, this will handle real authentication.
        const userToLogin = await api.login(role);
        if (userToLogin) {
            onLogin(userToLogin);
        } else {
            // TODO: Display a user-friendly error message on failed login
            console.error(`Login failed for role: ${role}. User not found.`);
            alert(`Could not log in as ${role}. Please try again.`);
        }
    };
    
    const texts = UI_TEXT[language];
    const textColor = isElectionMode ? 'text-election-dark-text' : 'text-white';
    const secondaryTextColor = isElectionMode ? 'text-gray-600' : 'text-slate-300';
    const iconColor = isElectionMode ? 'text-gray-800' : 'text-white';

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="glass-card rounded-lg shadow-xl w-full max-w-sm p-6 text-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10">
                    <XMarkIcon className={`w-6 h-6 ${iconColor}`} />
                </button>

                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} isElectionMode={isElectionMode} />

                <h2 className={`text-xl font-bold mb-2 mt-4 ${textColor}`}>{texts.welcomeToApp.replace('{appName}', texts.appName)}</h2>
                <p className={`${secondaryTextColor} mb-6`}>{texts.chooseYourRole}</p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => handleSelectRole(UserRole.Voter)}
                        className="w-full text-left p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <h3 className={`font-bold text-md ${textColor}`}>{texts.iAmVoter}</h3>
                        <p className={`text-sm ${isElectionMode ? 'text-gray-500' : 'text-slate-400'}`}>{texts.voterDescription}</p>
                    </button>
                    <button 
                        onClick={() => handleSelectRole(UserRole.Candidate)}
                        className="w-full text-left p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <h3 className={`font-bold text-md flex items-center ${textColor}`}>
                            {texts.iAmCandidate}
                            <EditIcon className="w-4 h-4 ml-2 text-brand-hot-pink" />
                        </h3>
                        <p className={`text-sm ${isElectionMode ? 'text-gray-500' : 'text-slate-400'}`}>{texts.candidateDescription}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;