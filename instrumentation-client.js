import posthog from 'posthog-js';

// PostHog analytics. Runs before the app becomes interactive (Next.js
// instrumentation-client convention). The key is a public project key and
// only ever comes from env vars: if it is missing, analytics stays off and
// the site runs exactly as before. Localhost is skipped so local testing
// never pollutes the real data.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (posthogKey && window.location.hostname !== 'localhost') {
  posthog.init(posthogKey, {
    api_host: posthogHost || 'https://us.i.posthog.com',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: true,
    person_profiles: 'identified_only',
    session_recording: {
      // Visitors' typing inside any form stays hidden in recordings.
      maskAllInputs: true,
    },
  });
}
