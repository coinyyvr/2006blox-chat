import { useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES } from "../lib/mock-data";
import { useStats } from "../context/stats-context";

export default function Thread() {
  const { id } = useParams();
  const { threadsByForum, postsByThread, addPost } = useStats();

  const [replyText, setReplyText] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Find thread — first in live threads, then nowhere (we no longer use mock threads)
  let threadInfo: { id: string; forumId: string; title: string; author: string } | null = null;
  let forumInfo: { id: string; name: string } | null = null;

  for (const forumId in threadsByForum) {
    const found = threadsByForum[forumId].find((t) => t.id === id);
    if (found) {
      threadInfo = found;
      for (const cat of CATEGORIES) {
        const f = cat.forums.find((forum) => forum.id === forumId);
        if (f) { forumInfo = f; break; }
      }
      break;
    }
  }

  const posts = postsByThread[id as string] ?? [];

  if (!threadInfo || !forumInfo) {
    return (
      <Layout>
        <div className="blox-breadcrumbs">
          <Link href="/">2006blox Chat</Link> &rsaquo; Thread Not Found
        </div>
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid #8899bb", backgroundColor: "#eef2f8" }}>
          This thread doesn't exist yet — or you may have navigated here before creating it.
        </div>
      </Layout>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = replyText.trim();
    if (!trimmed) return;
    addPost(forumInfo!.id, id as string, threadInfo!.title, trimmed);
    setReplyText("");
    setShowForm(false);
  }

  return (
    <Layout>
      <div className="blox-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">2006blox Chat</Link> &rsaquo;{" "}
        <Link href={`/forum/${forumInfo.id}`}>{forumInfo.name}</Link> &rsaquo;{" "}
        {threadInfo.title}
      </div>

      <div className="blox-action-bar">
        <button className="blox-btn" data-testid="button-post-reply" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Post Reply"}
        </button>
        <span className="blox-meta">
          Page 1 of 1 &mdash; {posts.length - 1} {posts.length - 1 === 1 ? "reply" : "replies"}
        </span>
      </div>

      <table className="blox-table" data-testid={`thread-posts-${id}`}>
        <thead>
          <tr>
            <th style={{ width: "145px" }}>Author</th>
            <th style={{ textAlign: "left" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, idx) => (
            <tr key={post.id} data-testid={`post-row-${post.id}`}>
              <td className="blox-post-user-col" style={{ backgroundColor: idx % 2 === 0 ? "#dde4ee" : "#ccd4e4" }}>
                <span className="blox-username">{post.author}</span>
                <span className="blox-user-rank">Newbie</span>
                <div className="blox-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6677aa" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="14" rx="1"/>
                    <circle cx="12" cy="9" r="3"/>
                    <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6"/>
                  </svg>
                </div>
                <div className="blox-user-stats">
                  <div>Joined: Today</div>
                  <div>Posts: <b>{idx + 1}</b></div>
                </div>
                <div style={{ marginTop: "8px", fontSize: "10px" }}>
                  <a href="#">Profile</a>{" | "}<a href="#">PM</a>
                </div>
              </td>
              <td className="blox-post-content-col" style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f4f7fc" }}>
                <div className="blox-post-header">
                  <span>Posted: {post.date}</span>
                  <span>
                    <a href={`#${post.id}`}>#{idx + 1}</a>
                    {" "}<a href="#" style={{ fontSize: "10px", marginLeft: "6px" }}>Quote</a>
                  </span>
                </div>
                <div className="blox-post-body" data-testid={`text-post-content-${post.id}`}>{post.content}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <form onSubmit={handleSubmit} data-testid="form-reply">
          <table className="blox-table" style={{ marginTop: "10px" }}>
            <thead>
              <tr><th style={{ textAlign: "left" }}>Post a Reply</th></tr>
            </thead>
            <tbody>
              <tr className="blox-row-odd">
                <td style={{ padding: "10px" }}>
                  <textarea
                    data-testid="input-reply-text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    autoFocus
                    style={{ width: "100%", fontFamily: "Verdana, Arial, sans-serif", fontSize: "12px", border: "1px solid #8899bb", padding: "6px", resize: "vertical", boxSizing: "border-box" }}
                    placeholder="Write your reply here..."
                  />
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                    <button type="submit" className="blox-btn" data-testid="button-submit-reply" disabled={!replyText.trim()}>
                      Submit Reply
                    </button>
                    <button type="button" className="blox-btn" onClick={() => { setShowForm(false); setReplyText(""); }}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}

      <div className="blox-action-bar" style={{ marginTop: "6px" }}>
        <button className="blox-btn" data-testid="button-post-reply-bottom" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Post Reply"}
        </button>
      </div>
    </Layout>
  );
}
