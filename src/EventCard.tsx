import React from 'react';
import './EventCard.css';
import { TEvent, TEventType } from './Events';
import EventModal from './EventModal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface EventProps {
  key: number;
  event: TEvent;
  setEventTypeFilter: React.Dispatch<React.SetStateAction<TEventType | undefined>>;
}

const EventCard = ({ event, setEventTypeFilter }: EventProps) => {
  return (
      <Card style={{ cursor: "pointer" }} className="mb-4">
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.description}</Card.Text>
          <div>
          <Button onClick={() => setEventTypeFilter(event.event_type)} size="sm" variant="outline-info" className='mb-2'>{event.event_type}</Button>
          </div>
          {event.public_url &&
            <Button href={event.public_url} variant="primary">Event link</Button>}
          <Button href={event.private_url} variant="primary" className='ms-2'>Hacker link</Button>
          <div className='show-more'>
          <EventModal key={event.id} id={event.id} setEventTypeFilter={setEventTypeFilter} btnText="Show More" />
          </div>
        </Card.Body>
      </Card>
  );
}

export default EventCard;
