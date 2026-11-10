'use client';

import { useStore } from '@/context/StoreContext';

// Small confirmation message at the bottom of the screen
export default function Toast() {
  const { toastMsg } = useStore();
  if (!toastMsg) return null;
  return (
    <div role="status" className="glass fx fixed left-0 right-0 bottom-6 m-auto w-max max-w-[90%] px-[22px] py-3 z-[9]">
      {toastMsg}
    </div>
  );
}
