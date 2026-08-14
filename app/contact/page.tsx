import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | C3 Community',
  description: 'Get in touch with the C3 Community team.',
};

export default function ContactPage() {
  return <ContactClient />;
}
