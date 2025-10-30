"use client";

import { SiSolana } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="w-full border-t border-border from-background via-muted to-background">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-4 text-sm text-muted-foreground">

                {/* Left Section — App Branding */}
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">  © {new Date().getFullYear()} DeJournal .</span>
                    <span>Built with ❤️ on</span>
                    <SiSolana className="text-[#9945FF] w-4 h-4" />
                    <a
                        href="https://solana.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                    >
                        Solana Devnet
                    </a>
                </div>

                {/* Right Section — Optional info */}
                <div className="text-xs text-muted-foreground">
                    DeJournal. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
