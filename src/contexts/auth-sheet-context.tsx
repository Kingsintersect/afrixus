"use client";

import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";

type AuthMode = "signin" | "signup";

interface AuthSheetContextProps {
    openAuthSheet: (mode?: AuthMode) => void;
    closeAuthSheet: () => void;
    setAuthMode: Dispatch<SetStateAction<AuthMode>>;
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
    authMode: AuthMode;
}

const AuthSheetContext = createContext<AuthSheetContextProps | null>(null);

export const useAuthSheet = () => {
    const context = useContext(AuthSheetContext);
    if (!context) {
        throw new Error("useAuthSheet must be used within an AuthSheetProvider");
    }
    return context;
};

export const AuthSheetProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>("signin");

    const openAuthSheet = useCallback((mode: AuthMode = "signin") => {
        setAuthMode(mode);
        setIsOpen(true);
    }, []);

    const closeAuthSheet = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <AuthSheetContext.Provider value={{ openAuthSheet, closeAuthSheet, isOpen, setIsOpen, authMode, setAuthMode }}>
            {children}
        </AuthSheetContext.Provider>
    );
};
