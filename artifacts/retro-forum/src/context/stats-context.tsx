import { useState, useContext, createContext, useCallback } from "react";

interface StatsContextValue {
  totalPosts: number;
  totalMembers: number;
  newestMember: string;
  addPost: () => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [totalPosts, setTotalPosts] = useState(0);

  const addPost = useCallback(() => {
    setTotalPosts((n) => n + 1);
  }, []);

  return (
    <StatsContext.Provider
      value={{
        totalPosts,
        totalMembers: 1,
        newestMember: "You",
        addPost,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used inside StatsProvider");
  return ctx;
}
