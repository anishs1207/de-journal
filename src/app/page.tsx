
import { JournalCard } from "@/components/dashboard/JournalCard";
import { NavBar } from "@/components/bars";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />

      <main className="flex-1 flex justify-center items-center p-3">
        <div className="w-full max-w-xl">
          <JournalCard />
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}