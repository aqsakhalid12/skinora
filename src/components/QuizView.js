'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Chip from './Chip';
import { useStore } from '@/context/StoreContext';
import { QUIZ } from '@/data/site';

// Skin finder: 3 steps with progress bar
export default function QuizView() {
  const router = useRouter();
  const { ans, setAns } = useStore();
  const [step, setStep] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const q = QUIZ[step];
  const last = step === QUIZ.length - 1;

  const pick = (o) => {
    setAns({ ...ans, [q.k]: o });
    setShowErr(false);
  };
  const back = () => {
    setShowErr(false);
    if (step > 0) setStep(step - 1);
    else router.push('/');
  };
  const next = () => {
    if (!ans[q.k]) return setShowErr(true);
    setShowErr(false);
    if (last) router.push('/quiz/results');
    else setStep(step + 1);
  };

  return (
    <div className="wrap sec fx pt-4 max-w-[760px]">
      <div className="glass p-[clamp(20px,5vw,48px)]">
        <div className="eye">Skin finder · step {step + 1} of 3</div>
        <div className="h-1 bg-[rgba(31,27,24,.1)] rounded my-4 mb-7">
          <div className="h-1 rounded bg-accent transition-[width] duration-[400ms]" style={{ width: `${(step + 1) * 33.3}%` }} />
        </div>
        <h2 className="text-[44px]">{q.t}</h2>
        <div className="flex flex-wrap gap-[10px] my-7">
          {q.o.map((o) => (
            <Chip key={o} active={ans[q.k] === o} onClick={() => pick(o)}>{o}</Chip>
          ))}
        </div>
        {showErr && <p role="alert" className="text-error mt-[-12px] mb-4 text-sm">Please choose an option to continue.</p>}
        <div className="flex justify-between">
          <button className="btn2" onClick={back}>Back</button>
          <button className="btn" onClick={next}>{last ? 'See my edit' : 'Continue'}</button>
        </div>
        <p className="mut text-xs mt-5">A product discovery tool, not a medical diagnosis.</p>
      </div>
    </div>
  );
}
