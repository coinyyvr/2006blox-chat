import { useState } from "react";
import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES, Thread } from "../lib/mock-data";
import { useStats } from "../context/stats-context";

export default function Forum() {
  const { id } = useParams();
  const { forumThreads, addThread } = useStats();

  const [liveThreads, setLiveThreads] = useState<Thread[]>([]);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  let forumInfo = null;
  for (const cat of CATEGORIES) {
    const f = cat.forums.find((f) => f.id === id);
    if (f) { forumInfo = f; break; }
  }

  if (!forumInfo) {
    return (
      <Layout>
        <div className="blox-breadcrumbs">
          <Link href="/">2006blox Chat</Link> &rsaquo; Invalid Forum
        </div>
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid #8899bb", backgroundColor: "#eef2f8" }}>
          The forum you selected does not exist.
        </div>
      </Layout>
    );
  }

  const threadCount = forumThreads[id as string] ?? 0;

  function handleNewThread(e: React.FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    const body = newBody.trim();
    if (!title || !body) return;

    const now = new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
    const threadId = `live-thread-${Date.now()}`;

    const newThread: Thread = {
      id: threadId,
      forumId: id as string,
      title,
      author: "Guest",
      replies: 0,
      views: 1,
      lastPost: { date: now, author: "Guest" },
    };

    setLiveThreads((prev) => [newThread, ...prev]);
    addThread(id as string, threadId, title);
    setNewTitle("");
    setNewBody("");
    setShowNewThread(false);
  }

  return (
    <Layout>
      <div className="blox-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">2006blox Chat</Link> &rsaquo; {forumInfo.name}
      </div>

      <div className="blox-action-bar">
        <button className="blox-btn" data-testid="button-new-topic" onClick={() => setShowNewThread((v) => !v)}>
          {showNewThread ? "Cancel" : "New Topic"}
        </button>
        <span className="blox-meta">Page 1 of 1 &mdash; {threadCount} {threadCount === 1 ? "thread" : "threads"}</span>
      </div>

      {/* New thread form */}
      {showNewThread && (
        <form onSubmit={handleNewThread} data-testid="form-new-thread">
          <table className="blox-table" style={{ marginBottom: "10px" }}>
            <thead>
              <tr><th style={{ textAlign: "left" }}>Post a New Topic</th></tr>
            </thead>
            <tbody>
              <tr className="blox-row-odd">
                <td style={{ padding: "10px" }}>
                  <div style={{ marginBottom: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "bold", display: "block", marginBottom: "3px" }}>Subject:</label>
                    <input
                      data-testid="input-thread-title"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ width: "100%", fontFamily: "Verdana, Arial, sans-serif", fontSize: "12px", border: "1px solid #8899bb", padding: "4px", boxSizing: "border-box" }}
                      placeholder="Thread title..."
                    />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "bold", display: "block", marginBottom: "3px" }}>Message:</label>
                    <textarea
                      data-testid="input-thread-body"
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      rows={5}
                      style={{ width: "100%", fontFamily: "Verdana, Arial, sans-serif", fontSize: "12px", border: "1px solid #8899bb", padding: "6px", resize: "vertical", boxSizing: "border-box" }}
                      placeholder="Write your post here..."
                    />
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button type="submit" className="blox-btn" data-testid="button-submit-thread" disabled={!newTitle.trim() || !newBody.trim()}>
                      Submit
                    </button>
                    <button type="button" className="blox-btn" onClick={() => { setShowNewThread(false); setNewTitle(""); setNewBody(""); }}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}

      <table className="blox-table" data-testid={`forum-threads-${id}`}>
        <thead>
          <tr>
            <th colSpan={2} style={{ textAlign: "left" }}>Topic</th>
            <th style={{ width: "90px" }}>Author</th>
            <th style={{ width: "55px" }}>Replies</th>
            <th style={{ width: "55px" }}>Views</th>
            <th style={{ width: "160px" }}>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {liveThreads.length === 0 && (
            <tr className="blox-row-odd">
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                There are no threads in this forum yet. Be the first to post!
              </td>
            </tr>
          )}
          {liveThreads.map((thread, idx) => (
            <tr key={thread.id} className={idx % 2 === 0 ? "blox-row-odd" : "blox-row-even"} data-testid={`thread-row-${thread.id}`}>
              <td style={{ width: "32px", textAlign: "center", padding: "5px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3355aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </td>
              <td>
                <Link href={`/thread/${thread.id}`} className="blox-thread-title" data-testid={`thread-link-${thread.id}`}>
                  {thread.title}
                </Link>
              </td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.author}</td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.replies}</td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.views}</td>
              <td className="blox-meta" style={{ whiteSpace: "nowrap" }}>
                {thread.lastPost.date}<br />
                by <b>{thread.lastPost.author}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="blox-action-bar">
        <button className="blox-btn" data-testid="button-new-topic-bottom" onClick={() => setShowNewThread((v) => !v)}>
          {showNewThread ? "Cancel" : "New Topic"}
        </button>
      </div>
    </Layout>
  );
}
