import React, { useState } from 'react';
import { User, Language } from '../../types.ts';
import { MOCK_POSTS } from '../../constants.ts';
import { TeaHouseIcon, MicIcon, PlusIcon, PencilIcon, ImageIcon } from '../icons/Icons.tsx';

type Concept = 'minimal' | 'cultural' | 'modern';

const DummyContent: React.FC = () => (
    <div className="p-4 space-y-4">
        {[...MOCK_POSTS, ...MOCK_POSTS].map((post, index) => (
            <div key={`${post.id}-${index}`} className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full" src={post.author.avatarUrl} alt={post.author.name} />
                    <div>
                        <p className="font-bold">{post.author.name}</p>
                        <p className="text-xs text-theme-text-muted">{post.timestamp}</p>
                    </div>
                </div>
                <p className="mt-2 text-sm">{post.content}</p>
            </div>
        ))}
    </div>
);

// --- CONCEPT FOOTERS ---

const MinimalFooter: React.FC = () => {
    return (
        <footer
            className="fixed bottom-0 left-0 right-0 h-[72px] flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#F5F1EB', color: '#8B5E3C' }}
        >
            <div className="relative flex flex-col items-center">
                <div className="relative w-10 h-10" style={{ animation: 'pulse-gentle 4s ease-in-out infinite' }}>
                    <TeaHouseIcon className="w-full h-full" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full flex justify-around">
                        <span className="steam-1 text-lg opacity-80">.</span>
                        <span className="steam-2 text-lg opacity-80">.</span>
                        <span className="steam-3 text-lg opacity-80">.</span>
                    </div>
                </div>
                <h3 className="font-bold font-arabic mt-1">ديوانية الشعب / قەهوەخانەی گەلەکە</h3>
            </div>
        </footer>
    );
};

const CulturalFooter: React.FC = () => {
    return (
        <footer
            className="fixed bottom-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 cultural-pattern-bg"
            style={{ color: '#F39C12' }}
        >
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-white/10"><PencilIcon className="w-6 h-6" /></button>
                <button className="p-2 rounded-full hover:bg-white/10"><MicIcon className="w-6 h-6" /></button>
                <button className="p-2 rounded-full hover:bg-white/10"><ImageIcon className="w-6 h-6" /></button>
            </div>
            <h3 className="font-bold text-lg font-arabic">انضم إلى النقاش / بەشداری بکە لە گفتوگۆکە</h3>
        </footer>
    );
};

const ModernFooter: React.FC = () => {
    return (
        <footer
            className="fixed bottom-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 glass-card rounded-none border-t border-b-0 border-x-0"
            style={{ color: '#3498DB' }}
        >
            <h3 className="font-bold text-lg font-arabic">مقهى المجتمع / چایخانەی کۆمەڵگە</h3>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-full transition-all hover:bg-blue-600">
                <PlusIcon className="w-5 h-5" />
                <span>Create New Topic</span>
            </button>
        </footer>
    );
};

// Fix: Added props to the component to resolve type error in App.tsx.
interface TeaHouseViewProps {
    user: User | null;
    requestLogin: () => void;
    language: Language;
}


// --- Main Showcase View ---
const TeaHouseView: React.FC<TeaHouseViewProps> = ({ user, requestLogin, language }) => {
    const [activeConcept, setActiveConcept] = useState<Concept>('minimal');

    const renderFooter = () => {
        switch (activeConcept) {
            case 'minimal': return <MinimalFooter />;
            case 'cultural': return <CulturalFooter />;
            case 'modern': return <ModernFooter />;
            default: return null;
        }
    };

    return (
        <div className="pb-24">
            <div className="p-4 max-w-md mx-auto">
                 <label htmlFor="concept-select" className="block text-sm font-medium text-theme-text-muted mb-2">Select a Footer Concept to Test:</label>
                 <select
                    id="concept-select"
                    value={activeConcept}
                    onChange={(e) => setActiveConcept(e.target.value as Concept)}
                    className="w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary"
                 >
                    <option value="minimal">Concept 1: Minimalist Beige</option>
                    <option value="cultural">Concept 2: Cultural Pattern</option>
                    <option value="modern">Concept 3: Modern Glassmorphism</option>
                 </select>
                 <p className="text-xs text-theme-text-muted mt-2">Scroll down to see how the fixed footer behaves with content.</p>
            </div>
            <DummyContent />
            {renderFooter()}
        </div>
    );
};

export default TeaHouseView;