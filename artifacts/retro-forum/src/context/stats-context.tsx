import { useState, useContext, createContext, useCallback } from "react";

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

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [totalPosts, setTotalPosts] = useState(0);
  const [forumStats, setForumStats] = useState<Record<string, ForumStat>>({});
  const [threadsByForum, setThreadsByForum] = useState<Record<string, LiveThread[]>>({});
  const [postsByThread, setPostsByThread] = useState<Record<string, LivePost[]>>({});

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

    setThreadsByForum((prev) => ({
      ...prev,
      [forumId]: [newThread, ...(prev[forumId] ?? [])],
    }));
    setPostsByThread((prev) => ({
      ...prev,
      [threadId]: [firstPost],
    }));
    setTotalPosts((n) => n + 1);
    setForumStats((prev) => {
      const cur = prev[forumId] ?? { posts: 0, threads: 0, lastPost: null };
      return {
        ...prev,
        [forumId]: {
          posts: cur.posts + 1,
          threads: cur.threads + 1,
          lastPost: { date: now, author: "Guest", threadId, threadTitle: title },
        },
      };
    });

    return threadId;
  }, []);

  const addPost = useCallback((forumId: string, threadId: string, threadTitle: string, content: string) => {
    const now = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const postId = `post-${Date.now()}`;

    const newPost: LivePost = {
      id: postId, threadId, author: "Guest", date: now, content,
    };

    setPostsByThread((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] ?? []), newPost],
    }));
    setThreadsByForum((prev) => {
      const threads = prev[forumId] ?? [];
      return {
        ...prev,
        [forumId]: threads.map((t) =>
          t.id === threadId ? { ...t, replies: t.replies + 1 } : t
        ),
      };
    });
    setTotalPosts((n) => n + 1);
    setForumStats((prev) => {
      const cur = prev[forumId] ?? { posts: 0, threads: 0, lastPost: null };
      return {
        ...prev,
        [forumId]: {
          ...cur,
          posts: cur.posts + 1,
          lastPost: { date: now, author: "Guest", threadId, threadTitle },
        },
      };
    });
  }, []);

  return (
    <StatsContext.Provider value={{
      totalPosts,
      totalMembers: 1,
      newestMember: "You",
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
