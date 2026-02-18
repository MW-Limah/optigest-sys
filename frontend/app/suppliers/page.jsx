import Aside from "@/components/Aside";

export default function page() {
  return (
    <div className="flex h-screen w-full">
      <Aside />
      <main className="flex-1 p-6">
        <h1 className="text-2xl">Fornecedores</h1>
      </main>
    </div>
  );
}
