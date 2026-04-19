"use client";

interface AlchemistLayoutProps {
  children: React.ReactNode;
}

export function AlchemistLayout({ children }: AlchemistLayoutProps) {
  return (
    <main className="w-full">
      {children}
    </main>
  );
}