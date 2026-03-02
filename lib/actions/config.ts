'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateConfig(formData: FormData) {
    const supabase = await createClient();

    const keys = Array.from(formData.keys()).filter(k => k !== '$ACTION_ID_'); // Filter out hidden action ID

    for (const key of keys) {
        const value = formData.get(key) as string;
        const { error } = await supabase
            .from('site_config')
            .upsert({ key, value }, { onConflict: 'key' });

        if (error) {
            console.error(`Error updating config ${key}:`, error);
            return { error: error.message };
        }
    }

    revalidatePath('/');
    revalidatePath('/admin/config');
    return { success: true };
}
