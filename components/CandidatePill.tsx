// Fix: Populating components/CandidatePill.tsx with a reusable candidate component.
import React from 'react';
import { User } from '../types.ts';
import { VerifiedIcon, PlusIcon } from './icons/Icons.tsx';

interface CandidatePillProps {
    candidate: User;
    onSelect: (candidate: User) => void;
}

const CandidatePill: React.FC<CandidatePillProps> = ({ candidate, onSelect }) => {
    return (
        <div 
            onClick={() => onSelect(candidate)}
            className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors"
        >
            <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" src={candidate.avatarUrl} alt={candidate.name} />
                <div>
                    <p className="font-bold flex items-center">
                        {candidate.name}
                        {candidate.verified && <VerifiedIcon className="w-4 h-4 text-action-blue ml-1.5" />}
                    </p>
                    <p className="text-sm text-neutral-gray-dark dark:text-gray-400">{candidate.party}</p>
                </div>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700">
                <PlusIcon className="w-3 h-3"/>
                <span>Follow</span>
            </button>
        </div>
    );
};

export default CandidatePill;
