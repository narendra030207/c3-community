import { Metadata } from 'next';
import ResultsClient from './ResultsClient';

export const metadata: Metadata = {
  title: 'Results | C3 Community',
  description: 'View competition and event results from C3 Community.',
};

export default function ResultsPage() {
  return <ResultsClient />;
}
