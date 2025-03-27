"use client";

import { useState, useEffect } from "react";
// import { google } from "googleapis";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import LoaderSpinner from "@/components/LoaderSpinner";
import { Calendar, Info } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  allDay?: boolean;
  color?: string;
}

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar');
        
        if (!response.ok) {
          throw new Error('Failed to fetch calendar events');
        }
        
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError('Failed to load festivals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <LoaderSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-white-1/10 to-white-1/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white-1/10 relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-1/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white-1 mb-2 flex items-center gap-3">
            <Calendar size={32} className="text-orange-1" />
            Indian Festivals Calendar
          </h1>
          <p className="text-white-2">
            Explore and discover the rich cultural festivals of India throughout the year
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-white-1">{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-white-1/5 rounded-xl p-4 border border-white-1/10 flex items-start gap-3">
            <Info size={24} className="text-orange-1 flex-shrink-0 mt-1" />
            <p className="text-white-2 text-sm">
              This calendar displays major Indian festivals and holidays. Click on any event to see more details.
              The calendar is synchronized with Google Calendar to provide accurate and up-to-date information.
            </p>
          </div>
          
          <div className="bg-white-1/5 rounded-xl p-4 border border-white-1/10">
            <CalendarComponent events={events} />
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarPage;