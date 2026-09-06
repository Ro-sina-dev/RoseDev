type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const UserIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const PhoneAppIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2.5" />
    <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
  </svg>
);

export const CodeIcon = (p: P) => (
  <svg {...base} {...p}>
    <polyline points="8 6 3 12 8 18" />
    <polyline points="16 6 21 12 16 18" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <polyline points="3.5 7 12 13 20.5 7" />
  </svg>
);

export const FileIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z" />
    <polyline points="14 2.5 14 7.5 19 7.5" />
    <polyline points="9.5 14 12 16.5 14.5 14" />
    <line x1="12" y1="11" x2="12" y2="16.5" />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ChevronLeft = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const CallIcon = (p: P) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const GithubIcon = (p: P) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1.1.1-1.5-.6-2.1 2.8-.3 5.6-1.4 5.6-6.1a4.7 4.7 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12.1 12.1 0 0 0-6.4 0C7.3 2 6.2 2.3 6.2 2.3a4.4 4.4 0 0 0-.1 3.3A4.7 4.7 0 0 0 4.8 9c0 4.6 2.8 5.7 5.5 6.1-.6.6-.6 1.2-.6 2.1V21" />
  </svg>
);

export const LinkedinIcon = (p: P) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const SignalIcon = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
    <rect x="0" y="7.5" width="2.6" height="3.5" rx=".7" />
    <rect x="4" y="5" width="2.6" height="6" rx=".7" />
    <rect x="8" y="2.5" width="2.6" height="8.5" rx=".7" />
    <rect x="12" y="0" width="2.6" height="11" rx=".7" />
  </svg>
);
