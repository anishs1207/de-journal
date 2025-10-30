import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Journal } from "../target/types/journal";
import { assert } from "chai";

describe("journal", () => {
  // Set provider and get program reference
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.journal as Program<Journal>;

  const owner = provider.wallet;
  const title = "MyFirstEntry";
  const message = "Hello, this is my journal entry!";
  const updatedMessage = "Updated journal message!";

  // Generate PDA for the journal entry account
  let journalEntryPda: anchor.web3.PublicKey;
  let bump: number;

  before(async () => {
    [journalEntryPda, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(title), owner.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Creates a journal entry", async () => {
    const tx = await program.methods
      .createJournalEntry(title, message)
      .accounts({
        journalEntry: journalEntryPda,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Create tx:", tx);

    // Fetch and assert
    const account = await program.account.journalEntryState.fetch(journalEntryPda);
    assert.equal(account.title, title);
    assert.equal(account.message, message);
    assert.ok(account.owner.equals(owner.publicKey));
  });

  it("Updates a journal entry", async () => {
    const tx = await program.methods
      .updateJournalEntry(title, updatedMessage)
      .accounts({
        journalEntry: journalEntryPda,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Update tx:", tx);

    const account = await program.account.journalEntryState.fetch(journalEntryPda);
    assert.equal(account.message, updatedMessage);
  });

  it("Deletes a journal entry", async () => {
    const tx = await program.methods
      .deleteJournalEntry(title)
      .accounts({
        journalEntry: journalEntryPda,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Delete tx:", tx);

    // After deletion, the account should not exist
    try {
      await program.account.journalEntryState.fetch(journalEntryPda);
      assert.fail("Account should be closed");
    } catch (err) {
      assert.ok(err.message.includes("Account does not exist"));
    }
  });
});
