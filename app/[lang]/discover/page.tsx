import { i18n } from "@/lib/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Discover</h1>
      <p>Discover functionality coming soon...</p>
    </div>
  );
}