import React, { useState, useEffect } from 'react';
import { Governorate, Post, User } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import ReelCard from '../ReelCard.tsx';

interface ReelsViewProps {
  selectedGovernorate: Governorate | 'All';
  selectedParty: string | 'All';
  onSelectReel: (reel: Post) => void;
  user: User | null;
  requestLogin: () => void;
}

const ReelsView: React.FC<ReelsViewProps> = ({ selectedGovernorate, selectedParty, onSelectReel, user, requestLogin }) => {
  const [reelPosts, setReelPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      setIsLoading(true);
      try {
        const reels = await api.getPosts({ type: 'Reel', governorate: selectedGovernorate, party: selectedParty });
        setReelPosts(reels);
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReels();
  }, [selectedGovernorate, selectedParty]);

  if (isLoading) {
    return <div className="text-center py-16 text-slate-200">Loading Reels...</div>
  }

  return (
    <div className="p-4 sm:p-6">
      {reelPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reelPosts.map(post => (
                <ReelCard 
                    key={post.id} 
                    reel={post} 
                    onSelectReel={onSelectReel} 
                />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-center text-slate-400 py-16">
          <p>No Reels available for<br />the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default ReelsView;