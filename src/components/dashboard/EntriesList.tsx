"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Entry = {
    title: string;
    message: string;
};

type EntriesListProps = {
    entries: Entry[];
    handleUpdate: (title: string) => void;
    handleDelete: (title: string) => void;
};

export default function EntriesList({ entries, handleUpdate, handleDelete }: EntriesListProps) {
    console.log("entries", entries);
    return (
        <div className="space-y-10">
            <h2 className="text-lg font-semibold text-center text-indigo-400 mb-4">
                Journal Entries
            </h2>

            {entries.length === 0 ? (
                <p className="text-center text-sm text-zinc-500">No entries yet.</p>
            ) : (
                entries.map((entry, idx) => (
                    <Card
                        key={idx}
                        className="bg-zinc-900/60 border-zinc-800 lhover:bg-zinc-900/90 transition-all p-3 m-2"
                    >
                        <div className="flex w-full justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-indigo-300">{entry.title}</h3>
                                <p className="text-sm text-zinc-300 whitespace-pre-line">{entry.message}</p>
                            </div>
                            <div className="flex flex-row gap-2 ml-4">
                                <Button
                                    size="sm"
                                    onClick={() => handleUpdate(entry.title)}
                                    className="cursor-pointer"
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => handleDelete(entry.title)}
                                    className="cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>


                ))
            )
            }
        </div >
    );
}
