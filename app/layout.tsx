import './globals.css';
import React from 'react';

// This is the root layout required by Next.js.
// In this internationalized application, the actual <html> and <body> tags
// are defined in `app/[lang]/layout.tsx`. This allows the layout to access
// the `lang` parameter from the URL to set the correct language and text direction.
// Therefore, this root layout simply acts as a pass-through for its children.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
