"use client";

import { SiSolana } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 group cursor-default">
                    <div className="p-2 bg-zinc-900 rounded-lg ring-1 ring-border group-hover:ring-purple-500/50 transition-all duration-300">
                        <SiSolana className="text-[#9945FF] w-4 h-4" />
                    </div>
                    <span className="font-semibold text-foreground tracking-tight">DeJournal</span>
                </div>
                <p className="opacity-70 font-medium">
                    &copy; {new Date().getFullYear()} Built on Solana
                </p>
            </div>
        </footer>
    );
}


