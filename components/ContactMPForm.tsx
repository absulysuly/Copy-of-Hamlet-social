import React, { useState } from 'react';
import { Language, User, Post } from '../types';
import { UI_TEXT } from '../translations';

interface ContactMPFormProps {
    language: Language;
    candidate: User;
    recentPosts: Partial<Post>[];
}

const ContactMPForm: React.FC<ContactMPFormProps> = ({ language, candidate, recentPosts }) => {
    const [message, setMessage] = useState('');
    const texts = UI_TEXT[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            alert(language === 'ar' ? 'تم إرسال الرسالة بنجاح!' : language === 'ku' ? 'پەیامەکە بە سەرکەوتوویی نێردرا!' : 'Message sent successfully!');
            setMessage('');
        }
    };
    
    const title = language === 'ar' ? 'تواصل مع النائب' : language === 'ku' ? 'پەیوەندی بە نوێنەر' : 'Contact MP';
    const desc = language === 'ar' ? 'أرسل رسالة مباشرة إلى النائب' : language === 'ku' ? 'پەیامێک بۆ نوێنەر بنێرە' : 'Send a direct message to your MP';
    const placeholder = language === 'ar' ? 'اكتب رسالتك هنا...' : language === 'ku' ? 'پەیامەکەت لێرە بنووسە...' : 'Type your message here...';
    const sendText = language === 'ar' ? 'إرسال' : language === 'ku' ? 'ناردن' : 'Send Message';

    return (
        <div className="glass-card rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold font-arabic text-center mb-2 text-theme-text-base">{title}</h3>
            <p className="text-sm text-theme-text-muted text-center mb-4 font-arabic">
                {desc}
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary font-arabic"
                    placeholder={placeholder}
                />
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-arabic"
                    >
                        {sendText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactMPForm;