import Circle from "./Circle";
import JobList from "./JobList";

export default function AutoProcess({ value = 175, total = 200 }) {
  const percentage = (value / total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto p-6">
      <Circle />
      {/* card */}
      <JobList />
    </div>
  );
}
