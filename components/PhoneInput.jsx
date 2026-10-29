'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import { Check, ChevronDown, Search } from 'lucide-react';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const flagEmoji = (code) =>
  String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)),
  );

const COUNTRIES = getCountries()
  .map((code) => ({
    code,
    name: regionNames.of(code) ?? code,
    calling: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Shadcn-style phone input: country combobox (flag + calling code, searchable)
 * beside a national-number field. Emits an E.164 string ('+923139594577')
 * or '' while empty.
 */
export default function PhoneInput({ value, onChange, invalid }) {
  const [country, setCountry] = useState('PK');
  const [digits, setDigits] = useState('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const numberRef = useRef(null);

  const selected = useMemo(
    () => COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0],
    [country],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase() === q ||
        `+${c.calling}`.includes(q),
    );
  }, [query]);

  useEffect(() => {
    onChange(digits ? `+${selected.calling}${digits}` : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits, selected]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open ]);

  const pick = (code) => {
    setCountry(code);
    setOpen(false);
    setQuery('');
    numberRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`flex h-12 w-full items-stretch overflow-visible rounded-[3px] border bg-white transition-colors dark:bg-white/5 ${
          invalid
            ? 'border-red-400 dark:border-red-400'
            : 'border-zinc-300 focus-within:border-lime-500 dark:border-white/15'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country"
          className="flex cursor-pointer items-center gap-1.5 border-r border-zinc-300 px-3 text-sm whitespace-nowrap text-zinc-900 dark:border-white/15 dark:text-zinc-100"
        >
          <span aria-hidden="true">{flagEmoji(selected.code)}</span>
          <span className="font-mono">+{selected.calling}</span>
          <ChevronDown className="h-4 w-4 text-zinc-500" />
        </button>
        <input
          ref={numberRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="313 9594577"
          value={digits}
          onChange={(e) => setDigits(e.target.value.replace(/[^\d]/g, '').slice(0, 15))}
          className="min-w-0 flex-1 bg-transparent px-3.5 font-sans text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
        />
      </div>

      {open && (
        <div className="absolute right-0 left-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-200 px-3 dark:border-white/10">
            <Search className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="h-10 w-full bg-transparent font-sans text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
          </div>
          <ul data-lenis-prevent className="scrollbar-hide max-h-56 overflow-y-auto py-1">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => pick(c.code)}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left font-sans text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  <span aria-hidden="true">{flagEmoji(c.code)}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="font-mono text-xs text-zinc-500">+{c.calling}</span>
                  {c.code === country && <Check className="h-4 w-4 text-lime-600 dark:text-lime-400" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-3 font-sans text-sm text-zinc-500">No country found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
