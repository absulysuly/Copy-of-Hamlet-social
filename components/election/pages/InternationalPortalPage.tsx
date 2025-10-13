
import React from 'react';
import Card from '../components/ui/Card.tsx';
import Button from '../components/ui/Button.tsx';
import ApiIcon from '../icons/ApiIcon.tsx';
import DocumentTextIcon from '../icons/DocumentTextIcon.tsx';
import UsersIcon from '../icons/UsersIcon.tsx';

const InternationalPortalPage: React.FC = () => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">International Observer Portal</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                            Access real-time data, comprehensive reports, and resources to support electoral transparency and monitoring.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="flex flex-col">
                            <div className="flex-grow">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-blue-500/10 rounded-full">
                                        <ApiIcon className="w-10 h-10 text-brand-teal" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center mb-3">Real-time Data API</h2>
                                <p className="text-slate-300 text-center">
                                    Access structured, real-time election data including voter turnout, incident reports, and preliminary results.
                                </p>
                            </div>
                            <Button variant="outline" className="mt-6 w-full">Request API Access</Button>
                        </Card>
                        <Card className="flex flex-col">
                           <div className="flex-grow">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-green-500/10 rounded-full">
                                        <DocumentTextIcon className="w-10 h-10 text-brand-teal" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center mb-3">Downloadable Reports</h2>
                                <p className="text-slate-300 text-center">
                                    Download multilingual reports on candidate registration, electoral integrity, and media monitoring.
                                </p>
                           </div>
                            <Button variant="outline" className="mt-6 w-full">Browse Reports</Button>
                        </Card>
                    </div>
                    
                    <div className="mt-8">
                        <Card>
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                 <div className="p-4 bg-purple-500/10 rounded-full">
                                    <UsersIcon className="w-10 h-10 text-brand-teal" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Observer Resources & Briefings</h2>
                                    <p className="text-slate-300">
                                        Access legal frameworks, logistical information, and schedules for observer briefings. Register your organization to receive updates.
                                    </p>
                                    <Button className="mt-4">Register Organization</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalPortalPage;
