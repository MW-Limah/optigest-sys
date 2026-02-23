import Aside from "@/components/Aside";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <Aside></Aside>
      <main className="flex-1 py-6 px-10 overflow-y-auto">
        <div className="flex gap-6 mb-8 shadow-md">
          <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-md rounded-t-xl">
            <p className="text-gray-500 text-sm font-medium">Total de produtos</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">2</h2>
          </div>
          <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-md rounded-t-xl">
            <p className="text-gray-500 text-sm font-medium">Total de produtos</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">2</h2>
          </div>
          <div className="w-full border-b-4 border-black py-8 px-6 bg-white shadow-md rounded-t-xl">
            <p className="text-gray-500 text-sm font-medium">Total de produtos</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">2</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
