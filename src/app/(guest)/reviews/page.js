import ReviewCard from "@/components/shared/ReviewCard";
import { myFetch } from "../../../../utils/myFetch";
import GlobalBackButton from "../../../../shared/GlobalBackButton";

export default async function ReviewsPage() {
  const res = await myFetch("/review");
  return (
    <main className="w-full bg-white">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlobalBackButton />
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              All Reviews
            </h1>
            <p className="text-gray-600">
              See what professionals say about Jobarman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {res?.data?.map((t, index) => (
              <ReviewCard
                key={index}
                name={t.user.name}
                role={t.role}
                rating={t.rating}
                text={t.comment}
                image={t.user.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
