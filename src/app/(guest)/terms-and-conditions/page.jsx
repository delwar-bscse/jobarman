import { myFetch } from "../../../../utils/myFetch";

export default async function TermsConditionsPage() {
  const res = await myFetch("/disclaimer?type=terms");

  return (
    <section className="min-h-[60vh] bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl px-4 py-6 shadow-sm border border-gray-200">
          <div
            className="prose jodit-wysiwyg"
            dangerouslySetInnerHTML={{ __html: res?.data?.content ?? "" }}
          />
        </div>
      </div>
    </section>
  );
}
