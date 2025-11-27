import Link from "next/link";
import ResumeGenerator from "../../../shared/ResumeGenerator";
import Review from "@/components/guest/Review";
import BannerSection from "@/components/guest/BannerSection";
import SearchSection from "@/components/guest/SearchSection";
import CaruselBanner from "@/components/guest/CaruselBanner";
import FilterModal from "@/components/guest/FilterModal";
import Subscription from "@/components/guest/Subscription";
import RecentJobPost from "@/components/guest/RecentJobPost";
import RecentJobRequest from "@/components/guest/RecentJobRequest";
import Image from "next/image";
import HowItWorks from "@/components/guest/HowItWorks";
import Categories from "@/components/guest/Categories";

export default function Home() {
  // const [reviews, setReviews] = useState([]);
  // Filters modal state
  // const [filtersOpen, setFiltersOpen] = useState(false);
  // const [category, setCategory] = useState("Sr. UI/UX Designer");
  // const [employeeType, setEmployeeType] = useState("Full Time");
  // const [jobType, setJobType] = useState("Remote");
  // const [minSalary, setMinSalary] = useState("5000");
  // const [maxSalary, setMaxSalary] = useState("8000");
  // const [distance, setDistance] = useState(10);

  // AI banner carousel state & data

  // const startXRef = useRef(0);
  // const draggingRef = useRef(false);
  // const [paused, setPaused] = useState(false);

  // const getClientX = (e) => ("touches" in e ? e.touches[0].clientX : e.clientX);

  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const res = await fetch("/testimonials.json");
  //       if (!res.ok) return;
  //       const data = await res.json();
  //       setReviews(data);
  //     } catch (e) {
  //       // silent fail
  //     }
  //   };
  //   load();
  // }, []);

  // testimonials data moved to shared module: ./components/shared/testimonials

  return (
    <main className="w-full bg-white">
      <BannerSection />

      {/* How it works at Jobarman */}
      <HowItWorks />

      {/* Search Section below Hero */}
      <SearchSection />

      {/* AI Banner Carousel below Hero */}
      <CaruselBanner />

      {/* Who’s Hiring Right Now banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src="/company.jpg"
              alt="Hiring Now"
              width={10}
              height={10}
              sizes="100vh"
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-orange-600/70" />
            <div className="absolute inset-y-0 right-0 w-full sm:w-1/2 flex flex-col justify-center p-6 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight text-balance">
                Who’s Hiring Right Now
              </h2>
              <p className="mt-3 text-sm sm:text-base text-orange-100 text-balance">
                Discover Leading Organizations That Are Rapidly Expanding And
                Building Stronger Teams.
              </p>
              <div className="mt-6">
                <Link href="/jobs">
                  <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Modal to filter jobs */}
      <FilterModal />

      {/* Recent Job Post Section */}
      <RecentJobPost />

      {/* Recent Job Request Section */}
      <RecentJobRequest />

      {/* Job Categories Section */}
      <Categories />

      {/* Social Proof Section */}
      <Review />

      {/* Resume Score Generator Section */}
      <ResumeGenerator></ResumeGenerator>

      {/* Are You Employer Section */}
      <section className="bg-[#EFF5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#EFF5FF] rounded-lg p-8 sm:p-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
                Are you employer?
              </h2>
              <p className="text-gray-600 mb-6 text-balance">
                Hiring has never been this easy. With our platform, you can post
                job openings in just a few steps and instantly connect with
                thousands of active job seekers. Manage applications in real
                time, review candidate profiles, and invite the right people for
                interviews directly from your dashboard.
              </p>
              <button className="px-16 py-3 bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white rounded-lg transition font-medium">
                Post a Job
              </button>
            </div>
            <div>
              <Image
                src="/areYouEmploy.png"
                alt="Employer"
                width={10}
                height={10}
                sizes="100vh"
                className="rounded-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plan Section */}
      <Subscription />
    </main>
  );
}
