
'use client';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function VoteButton({ candidateId }: { candidateId: string }) {
  const handleVote = () => {
    // Trigger Iraqi flag colored confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#CE1126', '#FFFFFF', '#000000', '#007A3D']
    });
    
    // In a real app, send the vote to the backend
    console.log(`Voted for candidate: ${candidateId}`);
    /*
    fetch('/api/vote', {
      method: 'POST',
      body: JSON.stringify({ candidateId })
    });
    */
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleVote}
      className="px-8 py-4 bg-gradient-to-r from-iraq-red to-iraq-green text-white font-bold rounded-full shadow-lg"
    >
      Cast Your Vote 🗳️
    </motion.button>
  );
}
