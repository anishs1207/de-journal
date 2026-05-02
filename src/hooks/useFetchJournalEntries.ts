"use client";

import useSetup from "./useSetup";

export default function useFetchJournalEntries() {
  const setup = useSetup();

  console.log("steup is done here");

  const fetchJournalEntries = async () => {
    if (!setup || !setup.program || !setup.provider)
      throw new Error("Setup not initialized");

    const { program, provider } = setup;
    const owner = provider.wallet.publicKey;

    console.log("porgram", program.account);
    //@ts-ignore
    const accounts = await program.account.journalEntryState.all([
      {
        memcmp: {
          offset: 8,
          bytes: owner.toBase58(),
        },
      },
    ]);
    //@ts-expect-error
    return accounts.map((a) => a.account);
  };

  return fetchJournalEntries;
}
