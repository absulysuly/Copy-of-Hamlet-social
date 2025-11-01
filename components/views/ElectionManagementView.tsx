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
            return <GovernoratePage name={name} {...pageProps} />;
        }
         if (path.startsWith('/party/')) {
            const id = path.split('/')[2];
            return <PoliticalPartyPage id={id} {...pageProps} />;
        }
        
        switch (path) {
            case '/':
                return <LandingPage {...pageProps} />;
            case '/dashboard':
                return <DashboardPage {...pageProps} />;
            case '/integrity-hub':
                return <IntegrityHubPage {...pageProps} />;
            case '/international-portal':
                return <InternationalPortalPage {...pageProps} />;
            case '/parties':
                return <PartiesPage {...pageProps} />;
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
                return <VoterRegistrationPage {...pageProps} />;
            // New Data Management Routes
            case '/api-config':
                return <ApiConfigPage {...pageProps} />;
            case '/data-collection':
                return <DataCollectionPage {...pageProps} />;
            case '/contact-validation':
                return <ContactValidationPage {...pageProps} />;
            case '/candidate-enrichment':
                return <CandidateEnrichmentPage {...pageProps} />;
            case '/quality-analytics':
                return <QualityAnalyticsPage {...pageProps} />;
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