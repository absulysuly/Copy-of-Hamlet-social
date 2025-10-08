import React from 'react';
import { Language } from '../types.ts';
import IraqFlagIcon from './election/icons/IraqFlagIcon.tsx';
import UsaFlagIcon from './election/icons/UsaFlagIcon.tsx';
import KurdistanFlagIcon from './election/icons/KurdistanFlagIcon.tsx';

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: 'ar' | 'en' | 'ku') => void;
  isElectionMode: boolean;
}

const FlagButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
  label: string;
  isElectionMode: boolean;
}> = ({ isActive, onClick, children, label, isElectionMode, ...props }) => {
  
  const buttonClasses = `flex items-center space-x-1 rtl:space-x-reverse p-1 rounded-md transition-all duration-200 ${
    isElectionMode
      ? (isActive ? 'bg-election-green/10' : 'hover:bg-neutral-gray-medium')
      : (isActive ? 'bg-white/20' : 'hover:bg-white/10')
  }`;
  
  const flagContainerClasses = `w-5 h-3 rounded-sm overflow-hidden border transition-all duration-200 ${
    isElectionMode
      ? (isActive ? 'border-election-green' : 'border-neutral-gray-medium')
      : (isActive ? 'border-brand-hot-pink' : 'border-white/20')
  }`;

  const labelClasses = `text-[10px] font-semibold font-arabic ${
    isElectionMode
      ? (isActive ? 'text-election-green' : 'text-election-dark-text')
      : (isActive ? 'text-brand-hot-pink' : 'text-slate-200')
  }`;

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      aria-pressed={isActive}
      {...props}
    >
      <div className={flagContainerClasses}>
          {children}
      </div>
      <span className={labelClasses}>{label}</span>
    </button>
  );
};


const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange, isElectionMode }) => {
    const containerClasses = `flex items-center space-x-0.5 rtl:space-x-reverse p-0.5 rounded-lg ${isElectionMode ? 'bg-neutral-gray-light' : 'bg-black/20'}`;

    return (
        <div className={containerClasses}>
           <FlagButton
            isActive={language === 'ar'}
            onClick={() => onLanguageChange('ar')}
            aria-label="Switch to Arabic"
            label="العربية"
            isElectionMode={isElectionMode}
          >
            <IraqFlagIcon />
          </FlagButton>
          <FlagButton
            isActive={language === 'ku'}
            onClick={() => onLanguageChange('ku')}
            aria-label="Switch to Kurdish"
            label="کوردی"
            isElectionMode={isElectionMode}
          >
            <KurdistanFlagIcon />
          </FlagButton>
          <FlagButton
            isActive={language === 'en'}
            onClick={() => onLanguageChange('en')}
            aria-label="Switch to English"
            label="English"
            isElectionMode={isElectionMode}
          >
            <UsaFlagIcon />
          </FlagButton>
        </div>
    );
};

export default LanguageSwitcher;