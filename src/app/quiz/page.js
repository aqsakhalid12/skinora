import QuizView from '@/components/QuizView';

export const metadata = {
  title: 'Skin finder quiz',
  description: 'Answer three quick questions and get a personalised SKINORA product edit. A product discovery tool, not medical advice.',
  alternates: { canonical: '/quiz' },
};

export default function QuizPage() {
  return <QuizView />;
}
