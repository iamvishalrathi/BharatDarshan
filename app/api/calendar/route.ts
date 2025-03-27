import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Google Calendar API credentials
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const CALENDAR_ID = process.env.CALENDAR_ID || 'en.indian#holiday@group.v.calendar.google.com'; // Indian holidays calendar ID

export async function GET() {
    try {
        // Set up auth
        const auth = new google.auth.JWT({
            email: GOOGLE_CLIENT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        });

        // Create calendar client
        const calendar = google.calendar({ version: 'v3', auth });

        // Get events from the calendar
        const response = await calendar.events.list({
            calendarId: CALENDAR_ID,
            timeMin: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of current year
            timeMax: new Date(new Date().getFullYear(), 11, 31).toISOString(), // End of current year
            singleEvents: true,
            orderBy: 'startTime',
        });

        // Format events for FullCalendar
        const events = response.data.items?.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.start?.dateTime || event.start?.date,
            end: event.end?.dateTime || event.end?.date,
            description: event.description,
            allDay: !event.start?.dateTime,
            color: '#F97316', // Orange color for festivals
        })) || [];

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch calendar events' },
            { status: 500 }
        );
    }
}