export interface ProjectData {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    description: string;
    category: 'web' | 'mobile' | 'system';
    tech_stack: string[];
    image_primary: string | null;
    image_secondary: string | null;
    is_latest: boolean;
    github_url: string | null;
    live_url: string | null;
    display_order: number;
}

export interface ExperienceData {
    id: string;
    title: string;
    organization: string | null;
    date_range: string;
    description: string | null;
    is_active: boolean;
    display_order: number;
}

export interface TechStackData {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'tools' | null;
    display_order: number;
}

export interface ProfileData {
    id: number;
    email: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    whatsapp_number: string | null;
    availability_status: string | null;
}
