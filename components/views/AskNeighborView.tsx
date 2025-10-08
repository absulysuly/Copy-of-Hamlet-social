import React from 'react';
import AskNeighborMap from '../AskNeighborMap.tsx';

const AskNeighborView: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold font-arabic text-white">إسأل جارك</h1>
                <p className="text-slate-200 mt-1">
                    Connect with your local community. Click on a district to see what people are asking.
                </p>
            </div>
            <div className="glass-card rounded-lg shadow-lg p-4">
                 <AskNeighborMap />
            </div>
        </div>
    );
};

export default AskNeighborView;