"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { addTechStack, updateTechStack, deleteTechStack } from "@/lib/actions/tech-stack";
import { createClient } from "@/lib/supabase/client";
import { TechStackData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Loader2 } from "lucide-react";

export default function TechStackAdmin() {
    const [techStack, setTechStack] = useState<TechStackData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechStackData | null>(null);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const loadData = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('tech_stack').select('*').order('display_order', { ascending: true });
        if (data) setTechStack(data as TechStackData[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = editingItem
                ? await updateTechStack(editingItem.id, formData)
                : await addTechStack(formData);

            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success(editingItem ? "Updated!" : "Added!");
                setIsDialogOpen(false);
                setEditingItem(null);
                loadData();
            }
        });
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this tech stack item?")) return;

        startTransition(async () => {
            const result = await deleteTechStack(id);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success("Deleted!");
                loadData();
            }
        });
    }

    const openEdit = (item: TechStackData) => {
        setEditingItem(item);
        setIsDialogOpen(true);
    }

    const openCreate = () => {
        setEditingItem(null);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-8 font-mono">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Tech Stack Module</h2>
                    <p className="text-sm text-neutral-500">Manage your skills and tools.</p>
                </div>
                <Button onClick={openCreate} className="bg-green-500 text-black hover:bg-green-400 font-bold h-10 w-10 p-0 sm:w-auto sm:px-4 sm:p-2 sm:h-10">
                    <Plus className="w-5 h-5 sm:mr-2" />
                    <span className="hidden sm:inline">Add Item</span>
                </Button>
            </div>

            <div className="rounded-xl border border-white/5 bg-neutral-900/40 overflow-hidden">
                <Table>
                    <TableHeader className="bg-neutral-950/50">
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Name</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Category</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase text-right">Order</TableHead>
                            <TableHead className="text-right text-neutral-400 font-mono text-xs uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24"><Loader2 className="w-5 h-5 text-green-500 animate-spin mx-auto" /></TableCell></TableRow>
                        ) : techStack.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24 text-neutral-500">No data found.</TableCell></TableRow>
                        ) : (
                            techStack.map(item => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">{item.name}</TableCell>
                                    <TableCell className="text-neutral-500">{item.category}</TableCell>
                                    <TableCell className="text-right text-neutral-400">{item.display_order}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-neutral-400"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-950 border-white/10 text-white font-mono">
                                                <DropdownMenuItem onClick={() => openEdit(item)} className="cursor-pointer text-xs">Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-500 cursor-pointer text-xs">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md bg-neutral-950 border-white/10 text-white font-mono">
                    <DialogHeader>
                        <DialogTitle className="tracking-widest">{editingItem ? 'EDIT_TECH' : 'ADD_TECH'}</DialogTitle>
                    </DialogHeader>

                    <form ref={formRef} action={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs uppercase text-neutral-400">Name (e.g., Next.js)</Label>
                            <Input id="name" name="name" defaultValue={editingItem?.name} required className="bg-black/50 border-white/10 text-white" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-xs uppercase text-neutral-400">Category</Label>
                            <Select name="category" defaultValue={editingItem?.category || "frontend"}>
                                <SelectTrigger className="bg-black/50 border-white/10 text-white"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-white/10 text-white font-mono">
                                    <SelectItem value="frontend">Frontend</SelectItem>
                                    <SelectItem value="backend">Backend</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                    <SelectItem value="tools">Tools</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="display_order" className="text-xs uppercase text-neutral-400">Order</Label>
                            <Input id="display_order" name="display_order" type="number" defaultValue={editingItem?.display_order || "0"} className="bg-black/50 border-white/10 text-white" />
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full bg-white text-black hover:bg-neutral-200 mt-4">
                            {isPending ? "SAVING..." : "SAVE_DATA"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
