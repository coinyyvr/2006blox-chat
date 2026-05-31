import { useState, useContext, createContext, useCallback } from "react";

interface LastPostInfo {
  date: string;
  author: string;
  threadId: string;
  threadTitle: string;
}

interface StatsContextValue {
  totalPosts: number;
  totalMembers: number;
  newestMember: string;
  forumPosts: Record<string, number>;
  forumThreads: Record<string, number>;
  forumLastPost: Record<string, LastPostInfo | null>;
  addPost: (forumId: string, info: LastPostInfo) => void;
  addThread: (forumId: string, threadId: string, threadTitle: string) => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [totalPosts, setTotalPosts] = useState(0);
  const [forumPosts, setForumPosts] = useState<Record<string, number>>({});
  const [forumThreads, setForumThreads] = useState<Record<string, number>>({});
  const [forumLastPost, setForumLastPost] = useState<Record<string, LastPostInfo | null>>({});

  const addPost = useCallback((forumId: string, info: LastPostInfo) => {
    setTotalPosts((n) => n + 1);
    setForumPosts((prev) => ({ ...prev, [forumId]: (prev[forumId] ?? 0) + 1 }));
    setForumLastPost((prev) => ({ ...prev, [forumId]: info }));
  }, []);

  const addThread = useCallback((forumId: string, threadId: string, threadTitle: string) => {
    const now = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    setForumThreads((prev) => ({ ...prev, [forumId]: (prev[forumId] ?? 0) + 1 }));
    setForumLastPost((prev) => ({
      ...prev,
      [forumId]: { date: now, author: "Guest", threadId, threadTitle },
    }));
  }, []);

  return (
    <StatsContext.Provider value={{
      totalPosts,
      totalMembers: 1,
      newestMember: "You",
      forumPosts,
      forumThreads,
      forumLastPost,
      addPost,
      addThread,
    }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used inside StatsProvider");
  return ctx;
}
