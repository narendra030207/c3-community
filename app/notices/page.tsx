import { Metadata } from 'next';
import NoticesClient from './NoticesClient';

export const metadata: Metadata = {
  title: 'Notices | C3 Community',
  description: 'Announcements, results, and important updates from C3 Community.',
};

export default function NoticesPage() {
  return <NoticesClient />;
}
