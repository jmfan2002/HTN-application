import React from 'react';
import './Events.css';
import axios from 'axios';
import EventCard from './EventCard'
import Searchbar from './Searchbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginModal from './LoginModal';
import Button from 'react-bootstrap/Button';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import { TailSpin } from 'react-loader-spinner';
import logo from "./htn_logo.png"
import Image from 'react-bootstrap/Image';

export type TEventType = "workshop" | "activity" | "tech_talk";
type TPermission = "public" | "private";

type TSpeaker = {
  name: string;
  profile_pic?: string;
};

export type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;

  start_time: number;
  end_time: number;

  description?: string;
  speakers: TSpeaker[];

  public_url?: string;
  private_url: string;
  related_events: number[];
};

export type TEndpointResponse = TEvent | TEvent[];

const Events = () => {
  const [loading, setLoading] = React.useState(true);
  const [eventReponse, setEvents] = React.useState<TEndpointResponse>([]);
  const fetchEvents = async () => {
    axios.get(`https://api.hackthenorth.com/v3/events`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => console.error(`Error: ${err}`));
  }

  let events: TEvent[];

  if (eventReponse.constructor !== Array) {
    events = [eventReponse as TEvent];
  } else {
    events = eventReponse;
  }

  // sort by start time
  events.sort((a: TEvent, b: TEvent) => { return a.start_time - b.start_time; });

  // search query
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = React.useState(query || '');
  events = events.filter((ev) => {
    return ev.name.toLowerCase().includes(searchQuery);
  });

  // log in stuff
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let isLoggedIn = email === "email@email.com" && password === "password";
  if (!isLoggedIn) {
    events = events.filter((ev) => {
      return ev.permission && ev.permission === "public";
    });
  }

  // filter event type
  const [eventTypeFilter, setEventTypeFilter] = React.useState<TEventType>();
  events = events.filter((ev) => {
    return !eventTypeFilter || ev.event_type === eventTypeFilter;
  });

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <NavBar bg='dark' sticky='top'>
        <Container>
          <NavBar.Brand>
            <div className='logo'>
              <Image
                alt=""
                src={logo}
                width="30"
                height="30"
              />
              <h4 className='white'>Hack The North</h4>
            </div>
          </NavBar.Brand>
          <NavBar.Collapse className="justify-content-center">
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </NavBar.Collapse>
          <NavBar.Collapse className="justify-content-end">
            <LoginModal setEmail={setEmail} setPassword={setPassword} />
          </NavBar.Collapse>
        </Container>
      </NavBar>
      {eventTypeFilter &&
        <Button onClick={() => setEventTypeFilter(undefined)} className='m-2'>Reset Filters</Button>}
      {loading
        ? <div className='center'><TailSpin color='blue'/></div>
        : <Row xs={1} md={2} lg={4} className="mt-4 m-1">
          {events.map((ev, i) => { return (<Col><EventCard event={ev} key={i} setEventTypeFilter={setEventTypeFilter} /></Col>); })}
        </Row>}
    </div>
  );
}

export default Events;
