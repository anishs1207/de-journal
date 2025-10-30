
import { JournalCard } from "@/components/dashboard/JournalCard";
import { Footer, NavBar } from "@/components/bars";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />

      <main className=" flex justify-center items-center p-6">
        <div className="w-full max-w-xl">
          <JournalCard />
        </div>
      </main>

      <Footer />

    </div>
  );
}
