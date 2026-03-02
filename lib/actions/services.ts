'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addService(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const icon_name = formData.get('icon_name') as string || 'Globe';
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('services').insert([{
        title,
        description,
        icon_name,
        display_order
    }]);

    if (error) {
        console.error('Error inserting service:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/services');
    return { success: true };
}

export async function updateService(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const icon_name = formData.get('icon_name') as string || 'Globe';
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);

    const { error } = await supabase.from('services').update({
        title,
        description,
        icon_name,
        display_order
    }).eq('id', id);

    if (error) {
        console.error('Error updating service:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/services');
    return { success: true };
}

export async function deleteService(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
        console.error('Error deleting service:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/services');
    return { success: true };
}
