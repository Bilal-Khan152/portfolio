import posthog from 'posthog-js';

/**
 * Fire a named analytics event. Safe to call anywhere on the client:
 * no-ops on the server and swallows errors, because analytics must
 * never break the site for a visitor.
 */
export function track(event, properties) {
  if (typeof window === 'undefined') return;
  try {
    posthog.capture(event, properties);
  } catch {
    // ignored on purpose
  }
}
