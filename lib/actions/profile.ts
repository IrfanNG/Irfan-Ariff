'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const linkedin_url = formData.get('linkedin_url') as string;
    const github_url = formData.get('github_url') as string;
    const whatsapp_number = formData.get('whatsapp_number') as string;
    const availability_status = formData.get('availability_status') as string;

    const { error } = await supabase
        .from('profile')
        .upsert({
            id: 1,
            email: email || null,
            linkedin_url: linkedin_url || null,
            github_url: github_url || null,
            whatsapp_number: whatsapp_number || null,
            availability_status: availability_status || null,
        });

    if (error) {
        console.error('Error updating profile:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/profile');
    return { success: true };
}
