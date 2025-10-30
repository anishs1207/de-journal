"use client";

import useSetup from "./useSetup";
import { PublicKey } from "@solana/web3.js";

export default function useDeleteJournalEntry() {
  const setup = useSetup();

  const deleteJournal = async (title: string) => {
    if (!setup || !setup.program || !setup.provider)
      throw new Error("Setup not initialized");

    const { program, provider } = setup;
    const owner = provider.wallet.publicKey;

    const [journalEntryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(title), owner.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .deleteJournalEntry(title)
      .accounts({
        owner,
        journalEntry: journalEntryPda,
      })
      .rpc();

    return { tx, journalEntryPda };
  };

  return deleteJournal;
}
