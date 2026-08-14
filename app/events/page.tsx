import { Metadata } from 'next';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events & Workshops | C3 Community',
  description: 'Explore upcoming hackathons, workshops, competitions, and seminars hosted by C3 Community.',
};

export default function EventsPage() {
  return <EventsClient />;
}
