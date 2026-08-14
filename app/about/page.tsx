import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About | C3 Community',
  description: 'Learn about the mission, vision, and history of the C3 Community.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
