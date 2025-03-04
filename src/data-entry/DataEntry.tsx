import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-config";

type Entry = {
    id: number;
    data: string;
    type?: string;
    record_time: string;
};

async function fetchEntries(table: string) {
    const { data, error } = await supabase.from(table).select().order('record_time', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

async function addEntry(table: string, entry: string, type?: string) {
    const record_time = new Date().toISOString();
    let data;
    let error;

    if (table === "info") {
        ({ data, error } = await supabase.from(table).insert([{ type, data: entry, record_time }]));
    } else {
        ({ data, error } = await supabase.from(table).insert([{ data: entry, record_time }]));
    }

    if (error) throw new Error(error.message);
    return data;
}

async function updateEntry(table: string, id: number, entry: string, type?: string) {
    const { data, error } = await supabase.from(table).update({ data: entry, type }).eq("id", id);
    if (error) throw new Error(error.message);
    return data;
}

async function deleteEntry(table: string, id: number) {
    const { data, error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return data;
}

function DataEntry() {
    const queryClient = useQueryClient();
    const [newEntry, setNewEntry] = useState("");
    const [entryType, setEntryType] = useState("music");
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
    const [currentTable, setCurrentTable] = useState<"info" | "learning">("info");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { data: infoData } = useQuery({
        queryKey: ["infoEntries"],
        queryFn: () => fetchEntries("info")
    });
    const { data: learningData } = useQuery({
        queryKey: ["learningEntries"], 
        queryFn: () => fetchEntries("learning")
    });

    const addMutation = useMutation({
        mutationFn: (entry: string) => addEntry(currentTable, entry, entryType),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${currentTable}Entries`] });
            setNewEntry("");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, entry, type }: { id: number; entry: string; type?: string }) => updateEntry(currentTable, id, entry, type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${currentTable}Entries`] });
            setEditingEntry(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteEntry(currentTable, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${currentTable}Entries`] });
        },
    });

    const handleAdd = () => {
        if (newEntry) {
            addMutation.mutate(newEntry);
        }
    };

    const handleUpdate = () => {
        if (editingEntry) {
            updateMutation.mutate({ id: editingEntry.id, entry: editingEntry.data, type: editingEntry.type });
        }
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === import.meta.env.VITE_PASSWORD) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
            setPassword("");
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-sm sm:pb-32 lg:px-10">
                <h1 className="text-2xl font-bold mb-4">Password Required</h1>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="border p-2 mr-2 w-full sm:w-auto"
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Submit
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </section>
        );
    }

    const entries = currentTable === "info" ? infoData : learningData;

    return (
        <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-base/[150%] sm:pb-32 lg:px-10">
            <h1 className="text-2xl font-bold mb-4">Data Entry</h1>
            <div className="mb-4">
                <button
                    className={`mr-2 px-4 py-2 ${currentTable === "info" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setCurrentTable("info")}
                >
                    Info Table
                </button>
                <button
                    className={`px-4 py-2 ${currentTable === "learning" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setCurrentTable("learning")}
                >
                    Learning Table
                </button>
            </div>
            {currentTable === "info" && (
                <div className="mb-4">
                    <label className="mr-2">Type:</label>
                    <select value={entryType} onChange={(e) => setEntryType(e.target.value)} className="border p-2 mr-2">
                        <option value="music">Music</option>
                        <option value="anime">Anime & Manga</option>
                        <option value="video">Video</option>
                    </select>
                </div>
            )}
            <div className="mb-4">
                <input
                    type="text"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder={`New entry for ${currentTable}`}
                    className="border p-2 mr-2 w-full sm:w-auto"
                />
                <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">Add</button>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">
                    {currentTable.charAt(0).toUpperCase() + currentTable.slice(1)} Table
                </h2>
                {entries?.map((entry: Entry) => (
                    <div key={entry.id} className="mb-2 flex items-center">
                        {editingEntry?.id === entry.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingEntry.data}
                                    onChange={(e) => setEditingEntry({ ...editingEntry, data: e.target.value })}
                                    className="border p-2 mr-2 flex-grow"
                                />
                                {currentTable === "info" && (
                                    <select
                                        value={editingEntry.type}
                                        onChange={(e) => setEditingEntry({ ...editingEntry, type: e.target.value })}
                                        className="border p-2 mr-2"
                                    >
                                        <option value="music">Music</option>
                                        <option value="anime">Anime & Manga</option>
                                        <option value="video">Video</option>
                                    </select>
                                )}
                            </>
                        ) : (
                            <>
                                <span className="mr-2 flex-grow">{entry.data}</span>
                                {currentTable === "info" && <span className="mr-2">{entry.type}</span>}
                            </>
                        )}
                        <button onClick={() => setEditingEntry(entry)} className="text-blue-500 mr-2">Edit</button>
                        <button onClick={() => handleDelete(entry.id)} className="text-red-500 mr-2">Delete</button>
                        {editingEntry?.id === entry.id && (
                            <button onClick={handleUpdate} className="text-green-500">Save</button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DataEntry;
