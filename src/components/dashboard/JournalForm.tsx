"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JournalFormProps {
    title: string;
    message: string;
    loading: boolean;
    status: string;
    setTitle: (val: string) => void;
    setMessage: (val: string) => void;
    handleCreate: () => void;
}

export default function JournalForm({
    title,
    message,
    loading,
    status,
    setTitle,
    setMessage,
    handleCreate,
}: JournalFormProps) {
    return (
        <Card className="w-full max-w-md mx-auto p-6 border border-zinc-800 bg-zinc-900/70 shadow-lg">
            <CardHeader className="text-center mb-2">
                <CardTitle className="text-xl font-semibold text-indigo-400">
                    <h2 className="text-lg font-semibold text-center text-indigo-400 mb-4">
                        Create New Journal Entry
                    </h2>
                </CardTitle>
                <CardDescription className="text-zinc-400">
                    Manage your journal entries on{" "}
                    <span className="text-indigo-500">Solana</span>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="mt-2 bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your journal message..."
                            rows={4}
                            className="mt-2 bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-indigo-500"
                        />
                    </div>

                    <Button
                        onClick={handleCreate}
                        disabled={loading}
                        className="text-center w-full cursor-pointer"
                    >
                        {loading ? "Saving..." : "Save Entry"}
                    </Button>
                </div>

                {status && (
                    <p className="text-center text-xs text-zinc-400 animate-pulse">
                        {status}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
