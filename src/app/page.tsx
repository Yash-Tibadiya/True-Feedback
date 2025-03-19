import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen transition-colors duration-300 bg-gradient-to-tr from-blue-400 to-blue-800 dark:bg-black dark:bg-gradient-to-tr dark:from-black dark:to-blue-900 overflow-hidden">
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Hello 👋</h1>
        </div>
      </div>
    </>
  );
}
