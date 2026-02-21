import { createClient } from '@/lib/supabase/server';
import { ProjectData, ExperienceData, TechStackData, ProfileData } from '@/lib/types';

export async function getProjects(): Promise<ProjectData[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('is_latest', { ascending: false })
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data as ProjectData[];
}

export async function getExperience(): Promise<ExperienceData[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching experience:', error);
        return [];
    }

    return data as ExperienceData[];
}

export async function getTechStack(): Promise<TechStackData[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('tech_stack')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching tech stack:', error);
        return [];
    }

    return data as TechStackData[];
}

export async function getProfile(): Promise<ProfileData | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data as ProfileData;
}
