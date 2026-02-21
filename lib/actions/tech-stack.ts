'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTechStack(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('tech_stack').insert([{ name, category, display_order }]);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/tech-stack');
    return { success: true };
}

export async function updateTechStack(id: string, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('tech_stack').update({ name, category, display_order }).eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/tech-stack');
    return { success: true };
}

export async function deleteTechStack(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('tech_stack').delete().eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/tech-stack');
    return { success: true };
}
