// "use client";

// import { useState, useEffect } from "react";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// import {
//     useFetchJournalEntries,
//     useCreateJournalEntry,
//     useUpdateJournalEntry,
//     useDeleteJournalEntry,
// } from "@/hooks"
// import EntriesList from "./EntriesList";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import JournalForm from "./JournalForm";

// interface JournalEntry {
//     title: string;
//     message: string;
// }

// export function JournalCard() {
//     const { publicKey, connected } = useWallet();
//     const { connection } = useConnection();

//     const createJournal = useCreateJournalEntry();
//     const updateJournal = useUpdateJournalEntry();
//     const deleteJournal = useDeleteJournalEntry();
//     const fetchJournalEntries = useFetchJournalEntries();

//     const [title, setTitle] = useState("");
//     const [message, setMessage] = useState("");
//     const [entries, setEntries] = useState<JournalEntry[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState("");

//     // Fetch entries when wallet connects
//     useEffect(() => {
//         if (!connected || !publicKey) return;

//         const loadEntries = async () => {
//             try {
//                 setLoading(true);
//                 const fetched = await fetchJournalEntries();
//                 setEntries(fetched || []);
//             } catch (err) {
//                 console.error("Failed to fetch entries:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadEntries();
//     }, [connected, publicKey, connection]);

//     const handleCreate = async () => {
//         if (!title || !message) {
//             alert("Please fill in both title and message.");
//             return;
//         }
//         try {
//             setLoading(true);
//             setStatus("Creating entry...");
//             const { tx, journalEntryPda } = await createJournal(title, message);
//             console.log("Created:", tx, journalEntryPda.toBase58());
//             //@@waits here

//             const fetched = await fetchJournalEntries();
//             setEntries(fetched || []);
//             setTitle("");
//             setMessage("");
//             setStatus("✅ Entry created successfully!");
//         } catch (err) {
//             console.error(err);
//             setStatus("❌ Failed to create entry.");
//         } finally {
//             setLoading(false);
//             setTimeout(() => setStatus(""), 3000);
//         }
//     };

//     const handleUpdate = async (entryTitle: string) => {
//         const newMessage = prompt("Enter new message:");
//         if (!newMessage) return;

//         try {
//             setStatus("Updating entry...");
//             const { tx } = await updateJournal(entryTitle, newMessage);
//             console.log("Updated:", tx);

//             const fetched = await fetchJournalEntries();
//             setEntries(fetched || []);
//             setStatus("✅ Entry updated!");
//         } catch (err) {
//             console.error(err);
//             setStatus("❌ Failed to update entry.");
//         } finally {
//             setTimeout(() => setStatus(""), 3000);
//         }
//     };

//     const handleDelete = async (entryTitle: string) => {
//         if (!confirm("Are you sure you want to delete this entry?")) return;

//         try {
//             setStatus("Deleting entry...");
//             const { tx } = await deleteJournal(entryTitle);
//             console.log("Deleted:", tx);

//             const fetched = await fetchJournalEntries();
//             setEntries(fetched || []);
//             setStatus("🗑️ Entry deleted!");
//         } catch (err) {
//             console.error(err);
//             setStatus("❌ Failed to delete entry.");
//         } finally {
//             setTimeout(() => setStatus(""), 3000);
//         }
//     };

//     if (!connected) {
//         return (
//             <Card className="max-w-md mx-auto mt-10 border-zinc-700 bg-zinc-900/60 text-center p-6">
//                 <CardContent>
//                     <p className="text-zinc-400">Please connect your wallet to view journal entries.</p>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <div className="flex flex-col items-center justify-center px-4 py-8">
//             <JournalForm
//                 title={title}
//                 message={message}
//                 loading={loading}
//                 status={status}
//                 setTitle={setTitle}
//                 setMessage={setMessage}
//                 handleCreate={handleCreate}
//             />
//             <div className="w-full max-w-md mt-6">
//                 <EntriesList
//                     entries={entries}
//                     handleUpdate={handleUpdate}
//                     handleDelete={handleDelete}
//                 />
//             </div>
//         </div >
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    useFetchJournalEntries,
    useCreateJournalEntry,
    useUpdateJournalEntry,
    useDeleteJournalEntry,
} from "@/hooks";
import EntriesList from "./EntriesList";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import JournalForm from "./JournalForm";

interface JournalEntry {
    title: string;
    message: string;
}

export function JournalCard() {
    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();

    const createJournal = useCreateJournalEntry();
    const updateJournal = useUpdateJournalEntry();
    const deleteJournal = useDeleteJournalEntry();
    const fetchJournalEntries = useFetchJournalEntries();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    // Modal states
    const [modalType, setModalType] = useState<"update" | "delete" | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    // Fetch entries when wallet connects
    useEffect(() => {
        if (!connected || !publicKey) return;

        const loadEntries = async () => {
            try {
                setLoading(true);
                const fetched = await fetchJournalEntries();
                setEntries(fetched || []);
            } catch (err) {
                console.error("Failed to fetch entries:", err);
            } finally {
                setLoading(false);
            }
        };
        loadEntries();
    }, [connected, publicKey, connection]);

    // Create entry
    const handleCreate = async () => {
        if (!title || !message) {
            setStatus("⚠️ Please fill in both title and message.");
            return;
        }

        try {
            setLoading(true);
            setStatus("Creating entry...");
            const { tx, journalEntryPda } = await createJournal(title, message);
            console.log("Created:", tx, journalEntryPda.toBase58());

            const fetched = await fetchJournalEntries();
            setEntries(fetched || []);
            setTitle("");
            setMessage("");
            setStatus(
                `✅ Entry created! View onchain: https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to create entry.");
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(""), 5000);
        }
    };

    // Trigger modals
    const handleUpdate = (entryTitle: string) => {
        const entry = entries.find((e) => e.title === entryTitle);
        if (!entry) return;
        setSelectedEntry(entry);
        setModalMessage(entry.message);
        setModalType("update");
        console.log("update called");
    };

    const handleDelete = (entryTitle: string) => {
        const entry = entries.find((e) => e.title === entryTitle);
        if (!entry) return;
        setSelectedEntry(entry);
        setModalType("delete");
    };

    // Confirm actions
    const confirmUpdate = async () => {
        if (!selectedEntry) return;
        try {
            setStatus("Updating entry...");
            const { tx } = await updateJournal(selectedEntry.title, modalMessage);
            console.log("Updated:", tx);
            const fetched = await fetchJournalEntries();
            setEntries(fetched || []);
            setStatus(
                `✅ Entry updated! View onchain: https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to update entry.");
        } finally {
            setModalType(null);
            setTimeout(() => setStatus(""), 5000);
        }
    };

    const confirmDelete = async () => {
        if (!selectedEntry) return;
        try {
            setStatus("Deleting entry...");
            const { tx } = await deleteJournal(selectedEntry.title);
            console.log("Deleted:", tx);
            const fetched = await fetchJournalEntries();
            setEntries(fetched || []);
            setStatus(
                `🗑️ Entry deleted! View onchain: https://explorer.solana.com/tx/${tx}?cluster=devnet`
            );
        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to delete entry.");
        } finally {
            setModalType(null);
            setTimeout(() => setStatus(""), 5000);
        }
    };

    if (!connected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <Card className="w-full max-w-md border-border/50 bg-gradient-to-b from-card/80 to-card shadow-2xl backdrop-blur-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-50" />
                    <CardHeader className="text-center relative pt-12">
                        <div className="mx-auto w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            Authentication Required
                        </CardTitle>
                        <CardDescription className="text-zinc-400 text-lg mt-2">
                            Please connect your Solana wallet to access your decentralized journal entries.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center pb-12 relative">
                        <div className="wallet-button-container-large">
                            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-indigo-600 hover:!opacity-90 !rounded-full !px-8 !py-6 !h-auto !text-base !font-semibold !transition-all !duration-300 shadow-lg shadow-indigo-500/20" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
            {/* Form */}
            <JournalForm
                title={title}
                message={message}
                loading={loading}
                status={status}
                setTitle={setTitle}
                setMessage={setMessage}
                handleCreate={handleCreate}
            />

            {/* Entries */}
            <div className="w-full max-w-md mt-6">
                <EntriesList
                    entries={entries}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            </div>

            {/* Update Modal */}
            <Dialog
                open={modalType === "update"}
                onOpenChange={(open) => setModalType(open ? "update" : null)}
            >
                <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <DialogHeader>
                        <DialogTitle>Edit Journal Entry</DialogTitle>
                        <DialogDescription>
                            Update your message for <b>{selectedEntry?.title}</b>.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        value={modalMessage}
                        onChange={(e) => setModalMessage(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 mt-3"
                        rows={4}
                    />
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalType(null)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmUpdate}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={modalType === "delete"} onOpenChange={() => setModalType(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    <DialogHeader>
                        <DialogTitle>Delete Entry</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="text-red-400 font-medium">
                                {selectedEntry?.title}
                            </span>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalType(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
