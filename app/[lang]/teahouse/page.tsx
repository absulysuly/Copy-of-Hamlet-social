import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import TeaHouseView from '@/components/views/TeaHouseView';
import { MessageCircle } from 'lucide-react';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.teahouse.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.teahouse.description,
  };
}

export default async function TeaHousePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <TeaHouseView dictionary={dictionary} />;
}