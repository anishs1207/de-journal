"use client";

import useSetup from "./useSetup";
import { PublicKey } from "@solana/web3.js";

export default function useUpdateJournalEntry() {
  const setup = useSetup();

  const updateJournal = async (title: string, newMessage: string) => {
    if (!setup || !setup.program || !setup.provider)
      throw new Error("Setup not initialized");

    const { program, provider } = setup;
    const owner = provider.wallet.publicKey;

    const [journalEntryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(title), owner.toBuffer()],
      program.programId
    );

    console.log(" program.methods", program.methods);

    const tx = await program.methods
      .updateJournalEntry(title, newMessage)
      .accounts({
        owner,
        journalEntry: journalEntryPda,
      })
      .rpc();

    return { tx, journalEntryPda };
  };

  return updateJournal;
}
