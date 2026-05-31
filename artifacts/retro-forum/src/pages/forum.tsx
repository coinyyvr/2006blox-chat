import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES, THREADS } from "../lib/mock-data";

export default function Forum() {
  const { id } = useParams();

  let forumInfo = null;
  for (const cat of CATEGORIES) {
    const f = cat.forums.find((f) => f.id === id);
    if (f) { forumInfo = f; break; }
  }

  const threads = THREADS[id as string] || [];

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

  return (
    <Layout>
      <div className="blox-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">2006blox Chat</Link> &rsaquo; {forumInfo.name}
      </div>

      <div className="blox-action-bar">
        <button className="blox-btn" data-testid="button-new-topic">New Topic</button>
        <span className="blox-meta">Page 1 of 1</span>
      </div>

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
          {threads.length === 0 && (
            <tr className="blox-row-odd">
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                There are no posts in this forum yet.
              </td>
            </tr>
          )}
          {threads.map((thread, idx) => (
            <tr key={thread.id} className={idx % 2 === 0 ? "blox-row-odd" : "blox-row-even"} data-testid={`thread-row-${thread.id}`}>
              <td style={{ width: "32px", textAlign: "center", padding: "5px" }}>
                {thread.isLocked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ) : thread.isPinned ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cc6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="17" x2="12" y2="22"/>
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3355aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )}
              </td>
              <td>
                {thread.isPinned && !thread.isLocked && (
                  <span className="blox-sticky-label">[Sticky] </span>
                )}
                {thread.isLocked && (
                  <span className="blox-locked-label">[Locked] </span>
                )}
                <Link href={`/thread/${thread.id}`} className="blox-thread-title" data-testid={`thread-link-${thread.id}`}>
                  {thread.title}
                </Link>
              </td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.author}</td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.replies}</td>
              <td style={{ textAlign: "center" }} className="blox-meta">{thread.views.toLocaleString()}</td>
              <td className="blox-meta" style={{ whiteSpace: "nowrap" }}>
                {thread.lastPost.date}
                <br />
                by <b>{thread.lastPost.author}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="blox-action-bar">
        <button className="blox-btn" data-testid="button-new-topic-bottom">New Topic</button>
        <span className="blox-meta">Page 1 of 1</span>
      </div>
    </Layout>
  );
}
