"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { addService, updateService, deleteService } from "@/lib/actions/services";
import { createClient } from "@/lib/supabase/client";
import { ServiceData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Loader2, Globe, Briefcase, Database, MessageSquare, Terminal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ICON_OPTIONS = [
    { name: 'Globe', icon: Globe },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Database', icon: Database },
    { name: 'MessageSquare', icon: MessageSquare },
    { name: 'Terminal', icon: Terminal },
];

export default function ServicesAdmin() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceData | null>(null);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const loadServices = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('services').select('*').order('display_order', { ascending: true });
        if (data) setServices(data as ServiceData[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = editingService
                ? await updateService(editingService.id, formData)
                : await addService(formData);

            if (result?.error) {
                toast.error(`Error: ${result.error}`);
            } else {
                toast.success(editingService ? "Service updated!" : "Service added!");
                setIsDialogOpen(false);
                setEditingService(null);
                loadServices();
            }
        });
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        startTransition(async () => {
            const result = await deleteService(id);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success("Service deleted!");
                loadServices();
            }
        });
    }

    const openEditDialog = (service: ServiceData) => {
        setEditingService(service);
        setIsDialogOpen(true);
    }

    const openCreateDialog = () => {
        setEditingService(null);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-8 font-mono">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Freelance Services</h2>
                    <p className="text-sm text-neutral-500">Manage your commercial offerings.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-amber-500 text-black hover:bg-amber-400 font-bold border-none">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service
                </Button>
            </div>

            <div className="rounded-xl border border-white/5 bg-neutral-900/40 overflow-hidden">
                <Table>
                    <TableHeader className="bg-neutral-950/50">
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Icon</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Title</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase text-right">Order</TableHead>
                            <TableHead className="text-right text-neutral-400 font-mono text-xs uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
                        ) : services.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24 text-neutral-500">No services found.</TableCell></TableRow>
                        ) : (
                            services.map(service => (
                                <TableRow key={service.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell>
                                        <div className="p-2 bg-neutral-800 rounded w-fit text-amber-500">
                                            {service.icon_name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-white">{service.title}</TableCell>
                                    <TableCell className="text-right text-neutral-400">{service.display_order}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-neutral-400">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-950 border-white/10 text-white font-mono">
                                                <DropdownMenuItem onClick={() => openEditDialog(service)} className="text-xs">Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => handleDelete(service.id)} className="text-red-500 text-xs">Delete</DropdownMenuItem>
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
                        <DialogTitle>{editingService ? 'EDIT_SERVICE' : 'NEW_SERVICE'}</DialogTitle>
                    </DialogHeader>

                    <form action={handleSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase text-neutral-400">Title</Label>
                            <Input name="title" defaultValue={editingService?.title} required className="bg-black/50 border-white/10" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase text-neutral-400">Description</Label>
                            <Textarea name="description" defaultValue={editingService?.description || ''} required className="bg-black/50 border-white/10 min-h-24" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-neutral-400">Icon</Label>
                                <Select name="icon_name" defaultValue={editingService?.icon_name || 'Globe'}>
                                    <SelectTrigger className="bg-black/50 border-white/10 text-white">
                                        <SelectValue placeholder="Select Icon" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-white/10 text-white font-mono">
                                        {ICON_OPTIONS.map(opt => (
                                            <SelectItem key={opt.name} value={opt.name}>{opt.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs uppercase text-neutral-400">Order</Label>
                                <Input name="display_order" type="number" defaultValue={editingService?.display_order || 0} className="bg-black/50 border-white/10" />
                            </div>
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full bg-white text-black hover:bg-neutral-200">
                            {isPending ? "EXECUTING..." : "SAVE_SERVICE"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
