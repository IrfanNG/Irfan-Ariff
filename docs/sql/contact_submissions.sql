-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'responded')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view/manage submissions
CREATE POLICY "Allow authenticated users to manage contact submissions" 
ON contact_submissions 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Allow service role (server actions) to insert
-- Note: Supabase server actions usually run with service role or as authenticated if the user is logged in.
-- For public contact forms, we might need a public insert policy if we're not using service role.
-- However, using the server-side client (createClient in @/lib/supabase/server.ts) 
-- usually bypasses RLS if it uses the service_role key, or we can add an insert policy.

CREATE POLICY "Allow public insert for contact submissions" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);
