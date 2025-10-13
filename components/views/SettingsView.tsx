import React, { useState } from 'react';
import { ThemeName } from '../../types.ts';
import ColorThemeSelector from '../UI/ColorThemeSelector.tsx';

interface SettingsViewProps {
    isHighContrast: boolean;
    onToggleContrast: () => void;
    activeTheme: ThemeName;
    onChangeTheme: (theme: ThemeName) => void;
}

const ToggleSwitch: React.FC<{
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}> = ({ label, description, checked, onChange }) => {
    return (
        <div className="flex justify-between items-center py-4">
            <div>
                <h4 className="font-semibold">{label}</h4>
                <p className="text-sm text-theme-text-muted">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
        </div>
    );
};

const SettingsView: React.FC<SettingsViewProps> = ({ isHighContrast, onToggleContrast, activeTheme, onChangeTheme }) => {
    const [largeText, setLargeText] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(true);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Accessibility & Display</h2>
            <div className="glass-card rounded-lg shadow-sm p-6 space-y-4 divide-y divide-[var(--color-glass-border)]">
                <ColorThemeSelector currentTheme={activeTheme} onChangeTheme={onChangeTheme} />
                <ToggleSwitch
                    label="High Contrast Mode"
                    description="Increases text contrast for better readability."
                    checked={isHighContrast}
                    onChange={onToggleContrast}
                />
                <ToggleSwitch
                    label="Large Text"
                    description="Increases the font size across the app."
                    checked={largeText}
                    onChange={() => setLargeText(p => !p)}
                />
                 <ToggleSwitch
                    label="Text-to-Speech (TTS)"
                    description="Enable 'Read Content' button on long posts."
                    checked={ttsEnabled}
                    onChange={() => setTtsEnabled(p => !p)}
                />
            </div>
        </div>
    );
};

export default SettingsView;