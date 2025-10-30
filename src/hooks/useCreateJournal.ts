"use client";

import useSetup from "./useSetup";
import { PublicKey, SystemProgram } from "@solana/web3.js";

export default function useCreateJournalEntry() {
  const { program, provider, publicKey } = useSetup();

  const createJournalEntry = async (title: string, message: string) => {
    if (!program || !provider || !publicKey)
      throw new Error("Wallet not connected");

    // Derive PDA
    const [journalEntryPda] = await PublicKey.findProgramAddress(
      [Buffer.from(title), publicKey.toBuffer()],
      program.programId
    );

    console.log("Creating Journal Entry:", { title, message, journalEntryPda });

    // Call the Anchor program’s RPC method
    const tx = await program.methods
      .createJournalEntry(title, message)
      .accounts({
        journalEntry: journalEntryPda,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Transaction Signature:", tx);

    return { tx, journalEntryPda };
  };

  return createJournalEntry;
}
