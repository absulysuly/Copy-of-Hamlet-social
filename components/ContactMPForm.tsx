import React, { useState } from 'react';

const ContactMPForm: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            alert('شكراً لك! تم إرسال رسالتك (محاكاة). \n\nThank you! Your message has been sent (simulation).');
            setMessage('');
        }
    };
    
    return (
        <div className="glass-card rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold font-arabic text-center mb-2 text-theme-text-base">هذا نائبك! أرسل له سؤالك مباشرة</h3>
            <p className="text-sm text-theme-text-muted text-center mb-4 font-arabic">
                اطرح سؤالاً حول قضية تهمك, مثل أزمة الكهرباء.
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary font-arabic"
                    placeholder="مثال: ما هي خطتكم لحل أزمة الكهرباء في منطقتنا؟"
                />
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-arabic"
                    >
                        إرسال الرسالة
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactMPForm;