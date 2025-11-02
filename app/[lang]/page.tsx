import HomeView from "@/components/views/HomeView";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return <HomeView lang={lang} dictionary={dictionary} />;
}