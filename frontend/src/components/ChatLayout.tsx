import type { ReactNode } from "react";

interface ChatLayoutProps {
    children: ReactNode,
}

export function ChatLayout({children}: ChatLayoutProps){
    return(
        <main className="flex h-screen  bg-bg-page font-sans">
            {children}
        </main>
    )
}