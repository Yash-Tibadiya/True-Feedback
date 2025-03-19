import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Hello 👋</h1>
      </div>
    </>
  );
}
