import React, { useState } from 'react';
import { XMarkIcon } from './icons/Icons.tsx';

type District = 'Karkh' | 'Rusafa' | 'Kadhimiya' | 'Adhamiya';

const DISTRICT_DATA: Record<District, { name: string; questions: string[] }> = {
    Karkh: {
        name: 'الكرخ (Karkh)',
        questions: [
            "هل الطرق سالكة قرب المتحف الوطني؟",
            "من أفضل مرشح لخدمة منطقة الكرخ؟",
            "هل هناك انقطاع كهرباء عندكم اليوم؟"
        ]
    },
    Rusafa: {
        name: 'الرصافة (Rusafa)',
        questions: [
            "ما هي أهم القضايا في شارع المتنبي؟",
            "هل بدأت حملات المرشحين في الرصافة؟",
            "أي المشاريع الخدمية تحتاجها المنطقة بشكل عاجل؟"
        ]
    },
    Kadhimiya: {
        name: 'الكاظمية (Kadhimiya)',
        questions: [
            "من يترشح في الكاظمية؟",
            "هل هناك خطط لتحسين الخدمات حول العتبة الكاظمية؟",
            "ما رأيكم بأداء المجلس البلدي الحالي؟"
        ]
    },
    Adhamiya: {
        name: 'الأعظمية (Adhamiya)',
        questions: [
            "هل يوجد مرشحين جدد في الأعظمية؟",
            "ما هي التحديات الرئيسية التي تواجه شباب الأعظمية؟",
            "هل المياه متوفرة بشكل جيد هذا الأسبوع؟"
        ]
    }
};


const AskNeighborMap: React.FC = () => {
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

    const DistrictPath: React.FC<{
        id: District;
        d: string;
        label: string;
        x: string;
        y: string;
    }> = ({ id, d, label, x, y }) => (
        <g 
            onClick={() => setSelectedDistrict(id)} 
            className="cursor-pointer group"
            aria-label={`Select ${label} district`}
        >
            <path d={d} className="fill-white/10 stroke-white/50 stroke-2 group-hover:fill-brand-teal/20 transition-colors" />
            <text x={x} y={y} className="text-lg font-bold fill-current text-white pointer-events-none" textAnchor="middle">{label}</text>
        </g>
    );

    return (
        <div className="relative">
            <svg viewBox="0 0 400 400" className="w-full h-auto">
                <DistrictPath id="Karkh" d="M 20,20 L 180,20 L 180,180 L 20,180 Z" label="الكرخ" x="100" y="105" />
                <DistrictPath id="Rusafa" d="M 220,20 L 380,20 L 380,180 L 220,180 Z" label="الرصافة" x="300" y="105" />
                <DistrictPath id="Kadhimiya" d="M 20,220 L 180,220 L 180,380 L 20,380 Z" label="الكاظمية" x="100" y="305" />
                <DistrictPath id="Adhamiya" d="M 220,220 L 380,220 L 380,380 L 220,380 Z" label="الأعظمية" x="300" y="305" />
            </svg>
            
            {selectedDistrict && (
                 <div 
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" 
                    onClick={() => setSelectedDistrict(null)}
                >
                    <div 
                        className="glass-card rounded-lg shadow-xl w-full max-w-md relative p-6 text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                         <button onClick={() => setSelectedDistrict(null)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-white/10">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-bold font-arabic mb-4">{DISTRICT_DATA[selectedDistrict].name}</h3>
                        <ul className="space-y-3">
                            {DISTRICT_DATA[selectedDistrict].questions.map((q, i) => (
                                <li key={i} className="p-3 bg-black/20 rounded-lg text-sm">
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AskNeighborMap;