"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SiSolana } from "react-icons/si";

export default function NavBar() {
    return (
        <header className="sticky top-0 z-50 flex flex-row md:flex-row items-center md:justify-between px-4 md:px-8 py-4 border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm gap-3 md:gap-0">

            {/* Brand */}
            <div className="flex items-center justify-center md:justify-start w-full group cursor-pointer">
                <div className="flex items-center gap-3">
                    <SiSolana className="w-8 h-8 text-[#9945FF] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    <span className="ml-4 text-xl md:text-2xl font-semibold tracking-tight text-white/90 group-hover:text-[#9945FF] transition-all duration-300">
                        DeJournal
                    </span>
                </div>
            </div>

            {/* Wallet */}
            <div className="flex items-center justify-center md:justify-end w-full">
                <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-full !h-10 !px-6 !text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-500/10" />
            </div>

        </header>
    );
}