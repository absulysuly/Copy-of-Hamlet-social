

import React, { useState, useEffect } from 'react';
import { Governorate, Event } from '../../types.ts';
import { CalendarIcon, LocationIcon, ShareIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface EventsViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const eventDate = new Date(event.date);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    return (
        <div className="glass-card rounded-lg shadow-lg overflow-hidden">
            <div className="p-5">
                <p className="text-sm font-semibold text-brand-hot-pink">{eventDate.toLocaleDateString(undefined, dateOptions).toUpperCase()}</p>
                <h3 className="text-xl font-bold text-white mt-1">{event.title}</h3>
                <div className="mt-3 flex items-start space-x-3 text-sm text-slate-300">
                    <CalendarIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{eventDate.toLocaleTimeString(undefined, timeOptions)}</span>
                </div>
                 <div className="mt-2 flex items-start space-x-3 text-sm text-slate-300">
                    <LocationIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <img className="w-8 h-8 rounded-full" src={event.organizer.avatarUrl} alt={event.organizer.name} />
                    <span className="text-sm font-medium text-slate-200">{event.organizer.name}</span>
                </div>
            </div>
            <div className="bg-black/20 px-5 py-3 flex justify-between items-center">
                 <button className="px-4 py-2 text-sm font-semibold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110">
                    RSVP
                </button>
                 <button className="p-2 rounded-full hover:bg-white/10">
                    <ShareIcon className="w-5 h-5 text-slate-300" />
                </button>
            </div>
        </div>
    );
};

const EventsView: React.FC<EventsViewProps> = ({ selectedGovernorate, selectedParty }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const data = await api.getEvents({ governorate: selectedGovernorate, party: selectedParty });
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, [selectedGovernorate, selectedParty]);


    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Upcoming Events</h2>
            {isLoading ? (
                 <p className="text-slate-300 col-span-full text-center mt-8">Loading events...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map(event => <EventCard key={event.id} event={event} />)
                    ) : (
                        <p className="text-slate-300 col-span-full text-center mt-8">No events scheduled for the selected filters.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EventsView;