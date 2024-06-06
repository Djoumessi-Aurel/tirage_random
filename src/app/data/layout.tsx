import type { Metadata } from 'next'
import '../globals.css'
import { appName, appTabName, appDescription, themeColor, keywords } from '@/constants/config'
import { PrimeReactProvider } from 'primereact/api'
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css'  Crée des conflits avec les classes tailwind
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import type { Viewport } from 'next'
import FooterDashboard from '@/components/squelette/FooterDashboard'

import '@/styles/Dashboard.scss'
import '@/styles/style-dashboard.scss'

 
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: themeColor },
    { media: "(prefers-color-scheme: light)", color: themeColor },
  ],
  colorScheme:"light",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


export const metadata: Metadata = {
  applicationName:appName,
  title: appTabName,
  description: `${appName}, ${appDescription}`,
  generator:"Next.js",
  keywords: keywords,
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
      </head>
      <body className="m-0 p-0 font-poppins relative selection:bg-tertiary-lightYellow selection:text-primary-blue
      sm:min-h-screen">
        <PrimeReactProvider>
                <div className='flex flex-col min-h-screen'>
                  {children}
                  <FooterDashboard/>
                </div>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
