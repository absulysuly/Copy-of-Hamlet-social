
import Link from 'next/link';
import { Locale } from '@/lib/i18n-config';
import { Home, Search, Users, User, Coffee } from 'lucide-react';
import NotificationBell from '../social/NotificationBell';

export default function TopNavBar({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const nav = dictionary;

  const navLinks = [
    { href: '/', label: nav.home },
    { href: '/discover', label: nav.discover },
    { href: '/candidates', label: nav.candidates },
    { href: '/teahouse', label: nav.teahouse },
    { href: '/profile', label: nav.profile },
  ];

  return (
    <header className="sticky top-0 z-40 hidden bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80 md:block">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={`/${lang}`} className="flex-shrink-0">
               <span className="text-2xl font-bold font-arabic text-gray-900 dark:text-white">ديوان</span>
            </Link>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={`/${lang}${link.href}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                  {link.href === '/teahouse' && <Coffee size={16} />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationBell />
            {/* Search, ThemeToggle, and LanguageSwitcher would go here */}
          </div>
        </div>
      </nav>
    </header>
  );
}
