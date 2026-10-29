'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { PhoneIncoming } from 'lucide-react';

const BookCallModal = dynamic(() => import('./BookCallModal'), { ssr: false });

/**
 * Hero's primary action: opens the call-back modal. Also opens when the
 * page is visited with #call in the URL, so the form can be linked to.
 */
export default function BookCallButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#call') setOpen(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[3px] bg-lime-400 px-6 py-3.5 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
      >
        Call me back
        <PhoneIncoming className="h-4 w-4" />
      </button>
      {open && <BookCallModal onClose={() => setOpen(false)} />}
    </>
  );
}
