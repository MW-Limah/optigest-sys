import Aside from "@/components/Aside";
export default function page() {
  return (
    <div className="page-wrapper flex w-full h-full min-h-screen">
      <Aside />
      <main className="flex-1 py-6 px-10 overflow-y-auto"></main>
    </div>
  );
}
