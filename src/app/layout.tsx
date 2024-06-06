import { PrimeReactProvider } from 'primereact/api';
import React from 'react';

export default function EmptyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
      <PrimeReactProvider>
                {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
