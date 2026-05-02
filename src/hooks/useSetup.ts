"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  AnchorProvider,
  Program,
  Idl,
  Wallet as AnchorWallet,
} from "@coral-xyz/anchor";
import { useMemo } from "react";
import * as idl from "../idl/journal.json";
import { Journal } from "@/idl/journal";

function createAnchorWallet(wallet: any): AnchorWallet | null {
  if (!wallet || !wallet.publicKey) return null;

  return {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
  } as AnchorWallet;
}

export default function useSetup() {
  const { connection } = useConnection();
  const wallet = useWallet();

  // Convert wallet to Anchor-compatible
  const anchorWallet = useMemo(() => createAnchorWallet(wallet), [wallet]);

  const provider = useMemo(() => {
    if (!anchorWallet) return null;
    return new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
    });
  }, [connection, anchorWallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(idl as Journal, provider);
  }, [provider]);

  return { connection, wallet, provider, program, publicKey: wallet.publicKey };
}
