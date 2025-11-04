import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/components/home/Hero';
import HomeStats from '@/components/home/HomeStats';
import FeaturedCandidates from '@/components/home/FeaturedCandidates';

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary.page.home} lang={lang} />
      <HomeStats dictionary={dictionary.page.home} />
      <FeaturedCandidates dictionary={dictionary.page.home} lang={lang} />
    </>
  );
}
