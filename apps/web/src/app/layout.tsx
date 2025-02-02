import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { AppProviders, Sidebar } from 'libs/logic';

import './global.css';

export const metadata: Metadata = {
  title: 'E-commerce Product Management Platform',
  description: 'E-commerce Product Management Platform',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <AppProviders>
        <body className="bg-white dark:bg-gray-900">
          <div>
            <Sidebar />
            <div className="p-4 sm:ml-64">{children}</div>
          </div>
        </body>
      </AppProviders>
    </html>
  );
}
