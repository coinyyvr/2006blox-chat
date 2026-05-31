import { Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES } from "../lib/mock-data";
import { useStats } from "../context/stats-context";

export default function Home() {
  const { forumPosts, forumThreads, forumLastPost } = useStats();

  return (
    <Layout>
      <div className="blox-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">2006blox Chat</Link> &rsaquo; Forum Index
      </div>

      {CATEGORIES.map((cat) => (
        <table key={cat.id} className="blox-table" data-testid={`category-table-${cat.id}`}>
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: "left" }} data-testid={`category-name-${cat.id}`}>
                {cat.name}
              </th>
              <th style={{ width: "70px" }}>Threads</th>
              <th style={{ width: "70px" }}>Posts</th>
              <th style={{ width: "170px" }}>Last Post</th>
            </tr>
          </thead>
          <tbody>
            {cat.forums.map((forum, idx) => {
              const posts = forumPosts[forum.id] ?? 0;
              const threads = forumThreads[forum.id] ?? 0;
              const lastPost = forumLastPost[forum.id] ?? null;
              return (
                <tr key={forum.id} className={idx % 2 === 0 ? "blox-row-odd" : "blox-row-even"} data-testid={`forum-row-${forum.id}`}>
                  <td style={{ width: "38px", textAlign: "center", padding: "6px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3355aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </td>
                  <td>
                    <Link href={`/forum/${forum.id}`} className="blox-forum-title" data-testid={`forum-link-${forum.id}`}>
                      {forum.name}
                    </Link>
                    <span className="blox-forum-desc">{forum.description}</span>
                  </td>
                  <td style={{ textAlign: "center" }} className="blox-meta" data-testid={`text-threads-${forum.id}`}>{threads}</td>
                  <td style={{ textAlign: "center" }} className="blox-meta" data-testid={`text-posts-${forum.id}`}>{posts}</td>
                  <td className="blox-meta" style={{ whiteSpace: "nowrap", fontSize: "11px" }}>
                    {lastPost ? (
                      <>
                        {lastPost.date}
                        <br />
                        by{" "}
                        <Link href={`/thread/${lastPost.threadId}`} data-testid={`last-post-link-${forum.id}`}>
                          <b>{lastPost.author}</b>
                        </Link>
                        <br />
                        <svg style={{ display: "inline", verticalAlign: "middle" }} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3355aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                        {" "}
                        <Link href={`/thread/${lastPost.threadId}`} style={{ fontSize: "10px" }}>
                          View last post
                        </Link>
                      </>
                    ) : (
                      <span style={{ color: "#888" }}>No posts yet</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}

      <div style={{ display: "flex", gap: "20px", fontSize: "11px", margin: "4px 0 12px", color: "#444" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3355aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          New posts
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          No new posts
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Forum locked
        </span>
      </div>
    </Layout>
  );
}
