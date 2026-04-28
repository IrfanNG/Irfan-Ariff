"use server";

import { submitContactForm } from "@/lib/supabase/queries";
import { ContactSubmission } from "@/lib/types";
import { Resend } from "resend";

export async function sendEmail(prevState: any, formData: FormData) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !message) {
            return { success: false, error: "Please fill in all fields.", message: undefined };
        }

        const submissionData: ContactSubmission = {
            name,
            email,
            phone: phone || "",
            subject: subject || "New Inquiry",
            message,
            status: 'pending'
        };

        // 1. Save to Database
        try {
            await submitContactForm(submissionData);
        } catch (dbError) {
            console.error("Database Insertion Error:", dbError);
            // We continue even if DB fails, or should we? Let's continue for now but log it.
        }

        // 2. Send Email via Resend
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Or your verified domain
            to: process.env.ADMIN_EMAIL || "mnifanmohdariff@gmail.com",
            replyTo: email,
            subject: `[CBG Inquiry] ${subject || name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0;">
                    <h2 style="color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.1em;">New Inquiry Received</h2>
                    <p style="color: #666; font-size: 14px;">A new contact form submission has been received from <strong>Copper Boston Group</strong> website.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; width: 120px; color: #999; font-size: 12px; text-transform: uppercase;">Name</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase;">Email</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase;">Phone</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${phone || "N/A"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase;">Subject</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${subject || "N/A"}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 30px;">
                        <h3 style="font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 10px;">Message</h3>
                        <div style="background: #f9fafb; padding: 20px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #333;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>

                    <p style="margin-top: 40px; font-size: 10px; color: #ccc; text-align: center; text-transform: uppercase; letter-spacing: 0.2em;">
                        © 2026 Copper Boston Group. Internal Notification.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message || "Failed to transmit.", message: undefined };
        }

        return { success: true, message: "Transmission successful.", error: undefined };
    } catch (err: any) {
        console.error("Server Action Error:", err);
        return { success: false, error: "An unexpected error occurred.", message: undefined };
    }
}
