'use client';
import { useState, useEffect } from 'react';

export default function ReferralBanner() {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // This needs to be in useEffect to access window.location
    const referralCode = `user_${Math.random().toString(36).substring(2, 9)}`;
    setShareUrl(`${window.location.origin}?ref=${referralCode}`);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ 
        title: 'Join me on Hamlet Unified!',
        text: 'Engage with Iraqi democracy like never before.',
        url: shareUrl 
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(shareUrl);
      alert('Referral link copied to clipboard!');
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white text-center my-6">
      <h3 className="text-2xl font-bold mb-2">Invite Friends, Earn Badges! 🎉</h3>
      <p className="mb-4">Share Hamlet Unified and unlock exclusive features.</p>
      <button
        onClick={handleShare}
        className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full"
      >
        Share Your Link
      </button>
    </div>
  );
}
