import {
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/* PASS 5G — Contact / closing experience.
 * The final editorial frame of the site: oversized closing typography and an
 * index of contact destinations on hairline rules. No new copy — the existing
 * heading, statement and destination list are the source of truth. */

// Placeholder tokens that must be replaced with real contact values. While a
// value still matches one of these tokens, Contact renders it as plain,
// non-clickable text. Replace the token and the real link appears automatically.
const PLACEHOLDER_TOKENS = [
  'YOUR_EMAIL_HERE',
  'YOUR_GITHUB_URL_HERE',
  'YOUR_LINKEDIN_URL_HERE',
  'YOUR_INSTAGRAM_URL_HERE',
];

// 'email' values become `mailto:<value>`, 'url' values are used as-is.
const buildHref = (contact) => {
  if (contact.type === 'email') {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contact.value,
    )}`;
  }
  return contact.value;
};

// Keyboard-visible focus ring, accent-themed like the Projects section links.
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-50 dark:focus-visible:ring-accent-400/70 dark:focus-visible:ring-offset-dark-900';

// Row-level hover animation shared between the link and the icon.
const ROW_HOVER =
  'group/item transition-all duration-300 ease-premium group-hover/item:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/item:translate-x-0';

// Replace each *_HERE token below with your real email or full URL.
// Keep the surrounding quotes intact and leave `text` and `type` as-is.
// `type` is used by the icon and link renderers, so keep it in sync with
// the platform being displayed.
const contactLinks = [
  {
    text: 'niranjananchalkar@gmail.com',
    type: 'email',
    value: 'niranjananchalkar@gmail.com',
  },
  {
    text: 'github.com/ninjaaaa18',
    type: 'github',
    value: 'https://github.com/ninjaaaa18',
  },
  {
    text: 'View LinkedIn Profile',
    type: 'linkedin',
    value: 'https://www.linkedin.com/in/sriniranjan-m-anchalkar-3260ab341/',
  },
  {
    text: '@simplyniranjan__',
    type: 'instagram',
    value: 'https://www.instagram.com/simplyniranjan__/',
  },
];

const Contact = () => {
  // `pt-24` + `pb-24` at the facing edges only: the CTF index ends flush (its
  // last row's own py-6 trails ~24px), so a single ~120px gap separates it
  // from this heading; below, the closing seam keeps ~96px before the
  // footer. `min-h-screen` is removed — content already exceeds a viewport.
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section pt-24 pb-24 bg-primary-50 dark:bg-dark-900 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Closing head: signal marker, section label and a hairline running
              to the edge — the same chapter language as Projects/Skills. */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.1}
            className="flex items-center gap-5 md:gap-8"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-signal" />
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-dark-50 font-mono"
            >
              <span className="border-b-2 border-primary-200 dark:border-dark-700 pb-2">
                CONTACT
              </span>
            </h2>
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 bg-hairline md:block"
            ></span>
          </ScrollReveal>

          {/* Focal point: the existing closing line at display scale, with the
              existing supporting sentence offset into the right column. */}
          <ScrollReveal
            as="div"
            selector=":scope > *"
            stagger={0.12}
            scale={0.97}
            className="mt-12 grid gap-8 md:mt-20 md:grid-cols-12 md:gap-10"
          >
            <h3 className="display min-w-0 text-display-xl text-fg md:col-span-7">
              <span className="block">GET IN</span>
              <span className="block">TOUCH</span>
            </h3>

            <p className="lede measure md:col-span-5 md:pt-4">
              Have a project in mind or want to collaborate? Feel free to reach
              out.
            </p>
          </ScrollReveal>

          {/* Contact index: destination label above its value, hairline seams
              between rows — an editorial index, not four generic cards.
              Placeholders stay plain, muted, non-clickable text; replacing a
              token in the data above turns the row into a real link. */}
          <ScrollReveal
            as="ul"
            role="list"
            selector=":scope > li"
            stagger={0.07}
            className="mt-14 md:mt-20"
          >
            {contactLinks.map((contact) => {
              const isPlaceholder = PLACEHOLDER_TOKENS.includes(contact.value);

              if (isPlaceholder) {
                // Plain, visibly muted placeholder: never a link, never given an
                // href, and no hover movement so it cannot read as clickable.
                return (
                  <li key={contact.text} className="border-t border-hairline">
                    <div
                      aria-disabled="true"
                      className="flex flex-col gap-1.5 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-6"
                    >
                      <span className="label text-fg-faint">{contact.text}</span>
                      <span className="min-w-0 break-words font-mono text-sm text-fg-faint md:text-base">
                        {contact.value}
                      </span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={contact.text} className="border-t border-hairline">
                  <a
                    href={buildHref(contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/row relative flex flex-col gap-1.5 py-5 transition-colors duration-300 ease-premium hover:bg-primary-100/40 dark:hover:bg-dark-800/30 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-6 ${FOCUS_RING} ${ROW_HOVER}`}
                  >
                    <span className="flex min-w-0 items-center gap-3 md:justify-start">
                      <span className="flex min-w-0 items-center gap-3 text-fg/70 transition-[color,transform] duration-300 ease-premium group-hover/row:text-fg motion-reduce:transition-none motion-reduce:group-hover/row:translate-x-0">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 shrink-0 rounded-full bg-accent-500/50 opacity-0 transition-opacity duration-300 ease-premium group-hover/row:opacity-100 motion-reduce:transition-none"
                        ></span>
                        {contact.type === 'email' ? (
                          <Mail className="h-3.5 w-3.5 text-fg/60" />
                        ) : contact.type === 'github' ? (
                          <Github className="h-3.5 w-3.5 text-fg/60" />
                        ) : contact.type === 'linkedin' ? (
                          <Linkedin className="h-3.5 w-3.5 text-fg/60" />
                        ) : (
                          <Instagram className="h-3.5 w-3.5 text-fg/60" />
                        )}
                        <span className="min-w-0 break-words text-sm md:text-base">
                          {contact.text}
                        </span>
                      </span>
                    </span>

                    <span className="flex min-w-0 items-center justify-end gap-3">
                      <span
                        aria-hidden="true"
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 ease-premium group-hover/row:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/row:translate-x-0"
                      >
                        {contact.type === 'email' ? (
                          <Mail className="absolute inset-0 h-full w-full m-auto h-4 w-4 text-accent-500" />
                        ) : contact.type === 'linkedin' ? (
                          <Linkedin className="absolute inset-0 h-full w-full m-auto h-4 w-4 text-accent-500" />
                        ) : contact.type === 'instagram' ? (
                          <Instagram className="absolute inset-0 h-full w-full m-auto h-4 w-4 text-accent-500" />
                        ) : (
                          <Github className="absolute inset-0 h-full w-full m-auto h-4 w-4 text-accent-500" />
                        )}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ScrollReveal>

          {/* Resume CTA — opens the PDF in a NEW TAB for viewing (no
              `download` attribute). The href stays /resume.pdf so the real
              resume can replace the placeholder file with no code change.
              Hover treatment mirrors the contact rows. */}
          <ScrollReveal as="div" className="mt-12 md:mt-16">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`group/resume inline-flex items-center justify-center gap-3 border border-fg/30 bg-surface/50 px-7 py-4 font-mono text-xs uppercase tracking-[0.24em] text-fg/90 transition-all duration-300 ease-premium hover:border-fg/50 hover:bg-surface hover:text-fg md:px-8 md:py-5 ${FOCUS_RING}`}
            >
              <FileText
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover/resume:scale-110 motion-reduce:transition-none"
              />
              View Resume
            </a>
          </ScrollReveal>

          {/* Closing seam: one final rule, then generous whitespace before the
              existing footer's own top border. */}
          <div aria-hidden="true" className="mt-16 border-t border-hairline md:mt-24"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;