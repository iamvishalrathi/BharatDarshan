"use client";

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  allDay?: boolean;
  color?: string;
}

interface CalendarComponentProps {
  events: CalendarEvent[];
}

const CalendarComponent = ({ events }: CalendarComponentProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEventClick = (clickInfo: any) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsDialogOpen(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short'
          }}
          eventClassNames="cursor-pointer"
          themeSystem="standard"
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black-1 border border-white-1/10 text-white-1">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-1">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-white-2">
              {selectedEvent?.allDay ? (
                <p className="mb-2">{formatDate(selectedEvent?.start)}</p>
              ) : (
                <p className="mb-2">
                  {formatDate(selectedEvent?.start)} - {formatDate(selectedEvent?.end)}
                </p>
              )}
              <div className="mt-4 text-white-1">
                {selectedEvent?.description ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
                ) : (
                  <p>No additional details available for this festival.</p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .fc {
          --fc-border-color: rgba(255, 255, 255, 0.1);
          --fc-button-bg-color: rgba(249, 115, 22, 0.8);
          --fc-button-border-color: rgba(249, 115, 22, 0.5);
          --fc-button-hover-bg-color: rgba(249, 115, 22, 1);
          --fc-button-hover-border-color: rgba(249, 115, 22, 0.8);
          --fc-button-active-bg-color: rgba(249, 115, 22, 0.9);
          --fc-button-active-border-color: rgba(249, 115, 22, 0.7);
          --fc-event-bg-color: rgba(249, 115, 22, 0.8);
          --fc-event-border-color: rgba(249, 115, 22, 0.7);
          --fc-today-bg-color: rgba(249, 115, 22, 0.1);
          --fc-page-bg-color: transparent;
        }
        
        .fc-theme-standard .fc-scrollgrid {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .fc-theme-standard td, .fc-theme-standard th {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .fc-col-header-cell-cushion,
        .fc-daygrid-day-number {
          color: #fff;
        }
        
        .fc-daygrid-event {
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 0.85em;
        }
        
        .fc-button {
          font-weight: 600;
        }
        
        .fc-button-primary:not(:disabled):active,
        .fc-button-primary:not(:disabled).fc-button-active {
          background-color: rgba(249, 115, 22, 0.9);
          border-color: rgba(249, 115, 22, 0.7);
        }
        
        .fc-daygrid-day.fc-day-today {
          background-color: rgba(249, 115, 22, 0.1);
        }
      `}</style>
    </>
  );
};

export default CalendarComponent;