"use client";

import { ModeToggle } from "@/components/dashboard/ModeToggle";
import {
    WalletMultiButton,
    WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import logo from "../../../public/logo.png";
import Image from "next/image";

export default function NavBar() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border bg-background/70 backdrop-blur-xl shadow-sm">
            {/* Left Section: Brand */}
            <div className="flex flex-row md:flex-col items-center gap-2 p-4">
                <Image
                    src={logo}
                    alt="DeJournal Logo"
                    width={50}
                    height={50}
                    className="rounded-md shadow-sm"
                    priority
                />
                <h1 className="text-2xl font-semibold tracking-tight">
                    <span className="from-purple-500 via-indigo-400 to-blue-400 bg-clip-text text-transparent m-10">
                        DeJournal
                    </span>
                </h1>

            </div>

            {/* Right Section: Wallet + Theme */}
            <div className="flex items-center gap-2 mr-2">
                <ModeToggle />
                <WalletMultiButton className="w-10 font-medium hover:scale-105 transition-transform duration-200" />
                <WalletDisconnectButton className="font-medium hover:scale-105 transition-transform duration-200" />
            </div>
        </header>
    );
}
