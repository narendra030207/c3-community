import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery | C3 Community',
  description: 'Moments and memories from C3 Community events.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
