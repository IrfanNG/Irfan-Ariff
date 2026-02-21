'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addExperience(formData: FormData) {
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const organization = formData.get('organization') as string;
    const date_range = formData.get('date_range') as string;
    const description = formData.get('description') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_active = formData.get('is_active') === 'on';

    const { error } = await supabase.from('experience').insert([{
        title, organization, date_range, description, display_order, is_active
    }]);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { success: true };
}

export async function updateExperience(id: string, formData: FormData) {
    const supabase = await createClient();
    const title = formData.get('title') as string;
    const organization = formData.get('organization') as string;
    const date_range = formData.get('date_range') as string;
    const description = formData.get('description') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_active = formData.get('is_active') === 'on';

    const { error } = await supabase.from('experience').update({
        title, organization, date_range, description, display_order, is_active
    }).eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { success: true };
}

export async function deleteExperience(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('experience').delete().eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { success: true };
}
