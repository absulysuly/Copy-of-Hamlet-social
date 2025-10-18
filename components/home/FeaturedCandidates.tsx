import { fetchCandidates } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import CandidateCard from '../candidates/CandidateCard';
import Link from 'next/link';

type FeaturedCandidatesProps = {
  dictionary: any;
  lang: Locale;
};

export default async function FeaturedCandidates({ dictionary, lang }: FeaturedCandidatesProps) {
  const { data: candidates } = await fetchCandidates({ limit: 6 });
  const homeTexts = dictionary.page.home;

  return (
    <section className="bg-white py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {homeTexts.featuredCandidates}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {homeTexts.featuredCandidatesDesc}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} dictionary={dictionary} lang={lang} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/candidates`}
            className="inline-block rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            {homeTexts.browseAll}
          </Link>
        </div>
      </div>
    </section>
  );
}