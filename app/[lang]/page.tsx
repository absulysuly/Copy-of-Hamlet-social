import HomeView from "@/components/views/HomeView";
import { getDictionary } from "@/lib/dictionaries";
import { Locale, i18n } from "@/lib/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return <HomeView lang={lang} dictionary={dictionary} />;
}