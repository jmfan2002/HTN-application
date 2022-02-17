import React from 'react';
import './EventModal.css';
import { TEvent, TEventType } from './Events';
import logo from './htn_logo.png';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'

interface EventProps {
  id: number;
  setEventTypeFilter: React.Dispatch<React.SetStateAction<TEventType | undefined>>;
  closeParentModal?: () => void;
  btnText?: string;
}

type RelatedEvent = {
  eventId: number;
  name: string;
  show: boolean;
};

const EventModal = ({ id, setEventTypeFilter, closeParentModal, btnText }: EventProps) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    if (closeParentModal) closeParentModal();
  };
  const handleShow = () => setShow(true);

  const [event, setEvent] = React.useState<TEvent>({
    id: 0,
    name: '',
    event_type: 'workshop',
    start_time: 0,
    end_time: 0,
    speakers: [],
    private_url: '',
    related_events: []
  });
  const [relatedEvents, setRelatedEvents] = React.useState<RelatedEvent[]>([]);

  React.useEffect(() => {
    const fetchEvent = async () => {
      axios.get(`https://api.hackthenorth.com/v3/events/${id}`)
        .then((res) => {
          let event: TEvent = res.data;
          setEvent(event);
          let relatedEvents: RelatedEvent[] = event.related_events.map((eventId) => {
            let name = '';
            axios.get(`https://api.hackthenorth.com/v3/events/${eventId}`)
              .then((res) => {
                name = res.data.name;
              });
            return { eventId: eventId, name: name, show: false };
          });
          setRelatedEvents(relatedEvents);
        })
        .catch(err => console.error(`Error: ${err}`));
    }
    fetchEvent();
  }, []);

  return (
    <>
      {btnText
        ? <Button variant="primary" onClick={handleShow} className='m-2'>
          {btnText}
        </Button>
        : <Button variant="primary" onClick={handleShow} className='m-2'>
          {event.name}
        </Button>}
      <Modal show={show} onHide={handleClose} >
        <Modal.Body>
          <Modal.Header className="bold" closeButton>{event.name}</Modal.Header>
          <Modal.Body>{event.description}
            {event.speakers.length > 0 &&
              <>
                <p className="bold">Speakers:</p>
                <ListGroup variant="flush">
                  {event.speakers.map((speaker) => {
                    return (
                      <ListGroup.Item>
                        {speaker.profile_pic
                          ? <Image src={speaker.profile_pic} alt={speaker.name} roundedCircle={true} fluid={true} thumbnail={true} width={100} height={100} />
                          : <Image src={logo} alt={speaker.name} roundedCircle={true} fluid={true} width={100} height={100} />}
                        <p>{speaker.name}</p>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </>}
            {event.related_events.length > 0 &&
              <>
                <p className='bold'>Related Events:</p>
                <ListGroup variant="flush">
                  {relatedEvents.map((ev) => {
                    return (
                      <EventModal key={ev.eventId} id={ev.eventId} closeParentModal={handleClose} setEventTypeFilter={setEventTypeFilter} />
                    );
                  })}
                </ListGroup>
              </>}
            {event.public_url &&
              <Button href={event.public_url} variant="primary" className='mr-2'>Event link</Button>}
            <Button href={event.private_url} variant="primary">Hacker link</Button>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventModal;
