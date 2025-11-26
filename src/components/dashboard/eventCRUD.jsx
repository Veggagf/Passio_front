import EventForm from '../events/eventForm';
import { useState } from 'react';

export default function EventCRUD({ initialEvents = [], onChange }) {
  const [editing, setEditing] = useState(null);
  const [events, setEvents] = useState(initialEvents);

  const refresh = () => onChange && onChange();

  return (
    <div>
      <div className="mb-6">
        <EventForm initial={editing} onSaved={refresh} />
      </div>
      <div>
        {/* Render a simple list of events */}
        <ul>
          {events.map((ev) => (
            <li key={ev.id} className="py-2 border-b">{ev.nombre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
