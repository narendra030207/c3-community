import { Metadata } from 'next';
import TeamClient from './TeamClient';

export const metadata: Metadata = {
  title: 'Our Team | C3 Community',
  description: 'Meet the brilliant minds behind the C3 Community.',
};

export default function TeamPage() {
  return <TeamClient />;
}
