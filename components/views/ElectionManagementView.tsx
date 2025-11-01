import React from 'react';
import { Language } from '../../types';

// Election portal components
import LandingPage from '../election/pages/LandingPage';
import DashboardPage from '../election/pages/DashboardPage';
import IntegrityHubPage from '../election/pages/IntegrityHubPage';
import InternationalPortalPage from '../election/pages/InternationalPortalPage';
import GovernoratePage from '../election/pages/GovernoratePage';
import PoliticalPartyPage from '../election/pages/PoliticalPartyPage';
import PartiesPage from '../election/pages/PartiesPage';
import ElectionHubPage from '../election/pages/ElectionHubPage';
import PrivacyPolicyPage from '../election/pages/PrivacyPolicyPage';
import TermsOfServicePage from '../election/pages/TermsOfServicePage';
import PricingPage from '../election/pages/PricingPage';
import CandidateComparisonPage from '../election/pages/CandidateComparisonPage';
import VoterRegistrationPage from '../election/pages/VoterRegistrationPage';
import ApiConfigPage from '../election/pages/ApiConfigPage';
import DataCollectionPage from '../election/pages/DataCollectionPage';
import ContactValidationPage from '../election/pages/ContactValidationPage';
import CandidateEnrichmentPage from '../election/pages/CandidateEnrichmentPage';
import QualityAnalyticsPage from '../election/pages/QualityAnalyticsPage';


interface ElectionManagementViewProps {
    path: string;
    onNavigate: (path: string) => void;
    language: Language;
}

const ElectionManagementView: React.FC<ElectionManagementViewProps> = ({ path, onNavigate, language }) => {

    const renderPage = () => {
        const pageProps = { onNavigate, language };
        // A simple router based on the path prop
        if (path.startsWith('/governorate/')) {
            const name = path.split('/')[2];
            // FIX: Pass only the props expected by GovernoratePage.
            return <GovernoratePage name={name} onNavigate={onNavigate} />;
        }
         if (path.startsWith('/party/')) {
            const id = path.split('/')[2];
            // FIX: Pass only the props expected by PoliticalPartyPage.
            return <PoliticalPartyPage id={id} onNavigate={onNavigate} />;
        }
        
        switch (path) {
            case '/':
                return <LandingPage {...pageProps} />;
            // FIX: The following components were being passed all of `pageProps` (onNavigate and language)
            // regardless of which props they actually accept. The calls have been corrected to only pass
            // the props that each component is defined to receive, resolving multiple type errors.
            case '/dashboard':
                return <DashboardPage language={language} />;
            case '/integrity-hub':
                return <IntegrityHubPage language={language} />;
            case '/international-portal':
                return <InternationalPortalPage language={language} />;
            case '/parties':
                return <PartiesPage onNavigate={onNavigate} />;
            case '/election-hub':
                return <ElectionHubPage />;
             case '/privacy-policy':
                return <PrivacyPolicyPage />;
            case '/terms-of-service':
                return <TermsOfServicePage />;
            case '/pricing':
                return <PricingPage />;
            case '/compare':
                return <CandidateComparisonPage />;
             case '/voter-registration':
                return <VoterRegistrationPage language={language} />;
            // New Data Management Routes
            case '/api-config':
                return <ApiConfigPage onNavigate={onNavigate} />;
            case '/data-collection':
                return <DataCollectionPage onNavigate={onNavigate} />;
            case '/contact-validation':
                return <ContactValidationPage onNavigate={onNavigate} />;
            case '/candidate-enrichment':
                return <CandidateEnrichmentPage onNavigate={onNavigate} />;
            case '/quality-analytics':
                return <QualityAnalyticsPage onNavigate={onNavigate} />;
            default:
                return <LandingPage {...pageProps} />;
        }
    }

    return (
        <div className="font-arabic">
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default ElectionManagementView;