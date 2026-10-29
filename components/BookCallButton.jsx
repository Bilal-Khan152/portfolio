'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { PhoneCall } from 'lucide-react';

const BookCallModal = dynamic(() => import('./BookCallModal'), { ssr: false });

/**
 * Hero's primary action: opens the book-a-call modal. Also opens when the
 * page is visited with #book in the URL, so the form can be linked to.
 */
export default function BookCallButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#book') setOpen(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[3px] bg-lime-400 px-6 py-3.5 font-mono text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
      >
        Book a 15-min call
        <PhoneCall className="h-4 w-4" />
      </button>
      {open && <BookCallModal onClose={() => setOpen(false)} />}
    </>
  );
}
