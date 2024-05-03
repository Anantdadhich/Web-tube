import { Children, ReactNode, createContext, useContext, useEffect, useState } from "react";

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarContextProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isSmallWindow()) setIsSmallOpen(false)
    }

    window.addEventListener("resize", handler)

    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [])

  
  
  
  
  function isSmallWindow() {
    return window.innerWidth < 1024; // Assuming 1024 is the threshold for "small"
  }

  function toggle() {
    if (isSmallWindow()) {
      setIsSmallOpen(!isSmallOpen);
    } else {
      setIsLargeOpen(!isLargeOpen);
    }
  }

  function close() {
    setIsLargeOpen(false);
    setIsSmallOpen(false); // Close both large and small sidebars by default
  }

  const value = {
    isLargeOpen,
    isSmallOpen,
    toggle,
    close,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarContextConsumer() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Cannot use SidebarContext outside of SidebarProvider");
  }

  return context;
}
