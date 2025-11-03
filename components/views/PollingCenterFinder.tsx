import React, { useState, useEffect } from 'react';
import { Governorate, Language, PollingCenter } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import { UI_TEXT } from '../../translations.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import { BuildingLibraryIcon, MapPinIcon, HashtagIcon, MagnifyingGlassIcon } from '../icons/Icons.tsx';
import Spinner from '../Spinner.tsx';

interface PollingCenterFinderProps {
    language: Language;
}

const PollingCenterFinder: React.FC<PollingCenterFinderProps> = ({ language }) => {
    const texts = UI_TEXT[language];

    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | ''>('');
    const [districts, setDistricts] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [areas, setAreas] = useState<string[]>([]);
    const [selectedArea, setSelectedArea] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<PollingCenter | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch districts when governorate changes
    useEffect(() => {
        if (selectedGovernorate) {
            setSelectedDistrict('');
            setSelectedArea('');
            setAreas([]);
            api.getPollingDistricts(selectedGovernorate).then(setDistricts);
        } else {
            setDistricts([]);
        }
    }, [selectedGovernorate]);

    // Fetch areas when district changes
    useEffect(() => {
        if (selectedGovernorate && selectedDistrict) {
            setSelectedArea('');
            api.getPollingAreas(selectedGovernorate, selectedDistrict).then(setAreas);
        } else {
            setAreas([]);
        }
    }, [selectedDistrict]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGovernorate || !selectedDistrict || !selectedArea) return;
        
        setIsLoading(true);
        setSearchResult(null);
        setError(null);

        try {
            const result = await api.findPollingCenter(selectedGovernorate, selectedDistrict, selectedArea);
            if (result) {
                setSearchResult(result);
            } else {
                setError(texts.noCenterFoundDesc);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const isFormComplete = selectedGovernorate && selectedDistrict && selectedArea;

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 text-center">
            <h1 className="text-3xl font-bold text-white font-arabic">{texts.findPollingCenterTitle}</h1>
            <p className="text-theme-text-muted mt-2 mb-8">{texts.findPollingCenterDesc}</p>
            
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Governorate */}
                    <div>
                        <label htmlFor="governorate" className="block text-sm font-medium text-theme-text-muted mb-1 text-left">{texts.governorate}</label>
                        <select
                            id="governorate"
                            value={selectedGovernorate}
                            onChange={(e) => setSelectedGovernorate(e.target.value as Governorate)}
                            className="w-full p-3 rounded-lg polling-form-select focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">{texts.selectYourGovernorate}</option>
                            {GOVERNORATES.map(gov => <option key={gov} value={gov}>{language === 'ar' ? GOVERNORATE_AR_MAP[gov] : gov}</option>)}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-theme-text-muted mb-1 text-left">{texts.district}</label>
                        <select
                            id="district"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedGovernorate || districts.length === 0}
                            className="w-full p-3 rounded-lg polling-form-select focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">{texts.selectDistrict}</option>
                            {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                    </div>

                    {/* Area */}
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-theme-text-muted mb-1 text-left">{texts.area}</label>
                        <select
                            id="area"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            disabled={!selectedDistrict || areas.length === 0}
                            className="w-full p-3 rounded-lg polling-form-select focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">{texts.selectArea}</option>
                            {areas.map(area => <option key={area} value={area}>{area}</option>)}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isFormComplete || isLoading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 rounded-full btn-spinner"></div>
                            <span>{texts.searching}</span>
                        </>
                    ) : (
                        <>
                            <MagnifyingGlassIcon className="w-5 h-5"/>
                            <span>{texts.findMyCenter}</span>
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8">
                {searchResult && (
                    <div className="glass-card rounded-xl p-6 text-left animate-slide-down">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <BuildingLibraryIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0"/>
                                <div>
                                    <h3 className="text-sm font-semibold text-theme-text-muted">{texts.pollingCenterName}</h3>
                                    <p className="text-lg font-bold text-theme-text-base">{searchResult.name}</p>
                                </div>
                            </div>
                             <div className="flex items-start space-x-3">
                                <MapPinIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0"/>
                                <div>
                                    <h3 className="text-sm font-semibold text-theme-text-muted">{texts.address}</h3>
                                    <p className="text-theme-text-base">{searchResult.address}</p>
                                </div>
                            </div>
                             <div className="flex items-start space-x-3">
                                <HashtagIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0"/>
                                <div>
                                    <h3 className="text-sm font-semibold text-theme-text-muted">{texts.centerCode}</h3>
                                    <p className="font-mono text-lg font-bold text-theme-text-base bg-black/20 px-2 py-1 rounded inline-block">{searchResult.centerCode}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 border-t border-[var(--color-glass-border)] pt-4">
                            <a href={searchResult.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full block text-center px-6 py-2 font-bold bg-secondary/80 text-on-primary rounded-full transition-all hover:brightness-110">
                                {texts.viewOnMap}
                            </a>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="glass-card rounded-xl p-6 text-center animate-slide-down border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-red-400">{texts.noCenterFound}</h3>
                        <p className="text-theme-text-muted mt-2">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PollingCenterFinder;
