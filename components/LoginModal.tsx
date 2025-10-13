import React, { useState } from 'react';
import { User, UserRole, Language } from '../types.ts';
import { EditIcon, XMarkIcon, ArrowLeftIcon } from './icons/Icons.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import { UI_TEXT } from '../translations.ts';
import * as api from '../services/apiService.ts';

interface LoginModalProps {
    onLogin: (user: User) => void;
    onClose: () => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

type ModalView = 'selection' | 'voter' | 'candidate';

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, language, onLanguageChange }) => {
    const [view, setView] = useState<ModalView>('selection');
    const texts = UI_TEXT[language];

    const handleRegister = async (details: { name: string; email: string; dob: string; role: UserRole }) => {
        const newUser = await api.registerUser(details);
        if (newUser) {
            onLogin(newUser);
        } else {
            alert('Registration failed. Please try again.');
        }
    };

    const RegistrationForm: React.FC<{ role: UserRole }> = ({ role }) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [dob, setDob] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            handleRegister({ name, email, dob, role });
        };

        return (
            <div>
                <button onClick={() => setView('selection')} className="flex items-center space-x-2 text-sm text-theme-text-muted hover:text-theme-text-base mb-4">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>{texts.back}</span>
                </button>
                <h2 className="text-xl font-bold mb-4 text-theme-text-base font-arabic">
                    {role === UserRole.Voter ? texts.registerAsVoter : texts.registerAsCandidate}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium text-theme-text-muted font-arabic">{texts.fullName}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-theme-text-muted font-arabic">{texts.dateOfBirth}</label>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-theme-text-muted font-arabic">{texts.emailAddress}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <button type="submit" className="w-full mt-2 px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50">
                        {texts.createAccount}
                    </button>
                </form>
            </div>
        );
    };

    const renderContent = () => {
        switch (view) {
            case 'voter':
                return <RegistrationForm role={UserRole.Voter} />;
            case 'candidate':
                return <RegistrationForm role={UserRole.Candidate} />;
            case 'selection':
            default:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-2 mt-4 text-theme-text-base font-arabic">{texts.welcomeToApp.replace('{appName}', texts.appName)}</h2>
                        <p className="text-theme-text-muted mb-6 font-arabic">{texts.chooseYourRole}</p>
                        <div className="space-y-4">
                            <button
                                onClick={() => setView('voter')}
                                className="w-full text-left p-4 border border-[var(--color-glass-border)] rounded-lg hover:bg-primary/10 transition-colors"
                            >
                                <h3 className="font-bold text-md text-theme-text-base font-arabic">{texts.iAmVoter}</h3>
                                <p className="text-sm text-theme-text-muted font-arabic">{texts.voterDescription}</p>
                            </button>
                            <button
                                onClick={() => setView('candidate')}
                                className="w-full text-left p-4 border border-[var(--color-glass-border)] rounded-lg hover:bg-primary/10 transition-colors"
                            >
                                <h3 className="font-bold text-md flex items-center text-theme-text-base font-arabic">
                                    {texts.iAmCandidate}
                                    <EditIcon className="w-4 h-4 ml-2 text-primary" />
                                </h3>
                                <p className="text-sm text-theme-text-muted font-arabic">{texts.candidateDescription}</p>
                            </button>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-sm p-6 text-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/10">
                    <XMarkIcon className="w-6 h-6 text-theme-text-base" />
                </button>
                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
                {renderContent()}
            </div>
        </div>
    );
};

export default LoginModal;