import { useState, useContext, createContext, useCallback, useEffect } from "react";

export interface LiveThread {
  id: string;
  forumId: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  views: number;
}

export interface LivePost {
  id: string;
  threadId: string;
  author: string;
  date: string;
  content: string;
}

interface LastPostInfo {
  date: string;
  author: string;
  threadId: string;
  threadTitle: string;
}

interface ForumStat {
  posts: number;
  threads: number;
  lastPost: LastPostInfo | null;
}

interface StatsContextValue {
  totalPosts: number;
  totalMembers: number;
  newestMember: string;
  forumStats: Record<string, ForumStat>;
  threadsByForum: Record<string, LiveThread[]>;
  postsByThread: Record<string, LivePost[]>;
  addThread: (forumId: string, title: string, body: string) => string;
  addPost: (forumId: string, threadId: string, threadTitle: string, content: string) => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [totalPosts, setTotalPosts] = useState<number>(() => load("blox_totalPosts", 0));
  const [forumStats, setForumStats] = useState<Record<string, ForumStat>>(() => load("blox_forumStats", {}));
  const [threadsByForum, setThreadsByForum] = useState<Record<string, LiveThread[]>>(() => load("blox_threadsByForum", {}));
  const [postsByThread, setPostsByThread] = useState<Record<string, LivePost[]>>(() => load("blox_postsByThread", {}));

  useEffect(() => { save("blox_totalPosts", totalPosts); }, [totalPosts]);
  useEffect(() => { save("blox_forumStats", forumStats); }, [forumStats]);
  useEffect(() => { save("blox_threadsByForum", threadsByForum); }, [threadsByForum]);
  useEffect(() => { save("blox_postsByThread", postsByThread); }, [postsByThread]);

  const addThread = useCallback((forumId: string, title: string, body: string): string => {
    const now = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const threadId = `thread-${Date.now()}`;
    const postId = `post-${Date.now()}`;

    const newThread: LiveThread = {
      id: threadId, forumId, title,
      author: "Guest", date: now, replies: 0, views: 1,
    };
    const firstPost: LivePost = {
      id: postId, threadId, author: "Guest", date: now, content: body,
    };

    setThreadsByForum((prev) => {
      const updated = { ...prev, [forumId]: [newThread, ...(prev[forumId] ?? [])] };
      save("blox_threadsByForum", updated);
      return updated;
    });
    setPostsByThread((prev) => {
      const updated = { ...prev, [threadId]: [firstPost] };
      save("blox_postsByThread", updated);
      return updated;
    });
    setTotalPosts((n) => {
      save("blox_totalPosts", n + 1);
      return n + 1;
    });
    setForumStats((prev) => {
      const cur = prev[forumId] ?? { posts: 0, threads: 0, lastPost: null };
      const updated = {
        ...prev,
        [forumId]: {
          posts: cur.posts + 1,
          threads: cur.threads + 1,
          lastPost: { date: now, author: "Guest", threadId, threadTitle: title },
        },
      };
      save("blox_forumStats", updated);
      return updated;
    });

    return threadId;
  }, []);

  const addPost = useCallback((forumId: string, threadId: string, threadTitle: string, content: string) => {
    const now = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const postId = `post-${Date.now()}`;
    const newPost: LivePost = { id: postId, threadId, author: "Guest", date: now, content };

    setPostsByThread((prev) => {
      const updated = { ...prev, [threadId]: [...(prev[threadId] ?? []), newPost] };
      save("blox_postsByThread", updated);
      return updated;
    });
    setThreadsByForum((prev) => {
      const updated = {
        ...prev,
        [forumId]: (prev[forumId] ?? []).map((t) =>
          t.id === threadId ? { ...t, replies: t.replies + 1 } : t
        ),
      };
      save("blox_threadsByForum", updated);
      return updated;
    });
    setTotalPosts((n) => {
      save("blox_totalPosts", n + 1);
      return n + 1;
    });
    setForumStats((prev) => {
      const cur = prev[forumId] ?? { posts: 0, threads: 0, lastPost: null };
      const updated = {
        ...prev,
        [forumId]: {
          ...cur,
          posts: cur.posts + 1,
          lastPost: { date: now, author: "Guest", threadId, threadTitle },
        },
      };
      save("blox_forumStats", updated);
      return updated;
    });
  }, []);

  return (
    <StatsContext.Provider value={{
      totalPosts,
      totalMembers: 1,
      newestMember: "expect this to work later, everyone is guest as of now.",
      forumStats,
      threadsByForum,
      postsByThread,
      addThread,
      addPost,
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
