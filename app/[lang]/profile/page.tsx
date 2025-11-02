import BadgeDisplay from "@/components/profile/BadgeDisplay";
import ReferralBanner from "@/components/social/ReferralBanner";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            User Profile
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            This page is under construction. User profiles, settings, and earned badges will be displayed here.
            </p>
        </div>
        <BadgeDisplay />
        <ReferralBanner />
      </div>
    </div>
  );
}
