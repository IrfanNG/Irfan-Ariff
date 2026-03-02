'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addProject(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const tech_stack_raw = formData.get('tech_stack') as string;
    const image_primary = formData.get('image_primary') as string;
    const image_secondary = formData.get('image_secondary') as string;
    const github_url = formData.get('github_url') as string;
    const live_url = formData.get('live_url') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_latest = formData.get('is_latest') === 'on';
    const is_commercial = formData.get('is_commercial') === 'on';

    const tech_stack = tech_stack_raw.split(',').map(s => s.trim()).filter(s => s !== '');

    const newProject = {
        title,
        slug,
        description,
        category,
        tech_stack,
        image_primary: image_primary || null,
        image_secondary: image_secondary || null,
        github_url: github_url || null,
        live_url: live_url || null,
        display_order,
        is_latest,
        is_commercial,
    };

    const { error } = await supabase.from('projects').insert([newProject]);

    if (error) {
        console.error('Error inserting project:', error);
        return { error: error.message };
    }

    // Update other projects if this one is the latest
    if (is_latest) {
        await supabase.from('projects').update({ is_latest: false }).neq('slug', slug);
    }

    revalidatePath('/');
    return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const tech_stack_raw = formData.get('tech_stack') as string;
    const image_primary = formData.get('image_primary') as string;
    const image_secondary = formData.get('image_secondary') as string;
    const github_url = formData.get('github_url') as string;
    const live_url = formData.get('live_url') as string;
    const display_order = parseInt(formData.get('display_order') as string || '0', 10);
    const is_latest = formData.get('is_latest') === 'on';
    const is_commercial = formData.get('is_commercial') === 'on';

    const tech_stack = tech_stack_raw.split(',').map(s => s.trim()).filter(s => s !== '');

    const updatedProject = {
        title,
        slug,
        description,
        category,
        tech_stack,
        image_primary: image_primary || null,
        image_secondary: image_secondary || null,
        github_url: github_url || null,
        live_url: live_url || null,
        display_order,
        is_latest,
        is_commercial,
    };

    const { error } = await supabase.from('projects').update(updatedProject).eq('id', id);

    if (error) {
        console.error('Error updating project:', error);
        return { error: error.message };
    }

    if (is_latest) {
        await supabase.from('projects').update({ is_latest: false }).neq('id', id);
    }

    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { success: true };
}

export async function deleteProject(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
        console.error('Error deleting project:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { success: true };
}
