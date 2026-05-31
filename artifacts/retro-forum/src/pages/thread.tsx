import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES, THREADS, POSTS } from "../lib/mock-data";

export default function Thread() {
  const { id } = useParams();

  let threadInfo = null;
  let forumInfo = null;

  for (const fId in THREADS) {
    const t = THREADS[fId].find((th) => th.id === id);
    if (t) {
      threadInfo = t;
      for (const cat of CATEGORIES) {
        const f = cat.forums.find((forum) => forum.id === fId);
        if (f) { forumInfo = f; break; }
      }
      break;
    }
  }

  const posts = POSTS[id as string] || [];

  if (!threadInfo || !forumInfo) {
    return (
      <Layout>
        <div className="blox-breadcrumbs">
          <Link href="/">2006blox Chat</Link> &rsaquo; Invalid Thread
        </div>
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid #8899bb", backgroundColor: "#eef2f8" }}>
          The thread you selected does not exist.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="blox-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">2006blox Chat</Link> &rsaquo;{" "}
        <Link href={`/forum/${forumInfo.id}`}>{forumInfo.name}</Link> &rsaquo;{" "}
        {threadInfo.title}
      </div>

      <div className="blox-action-bar">
        {threadInfo.isLocked ? (
          <span className="blox-locked-label">[ This topic is locked: you cannot edit posts or make replies. ]</span>
        ) : (
          <button className="blox-btn" data-testid="button-post-reply">Post Reply</button>
        )}
        <span className="blox-meta">Page 1 of 1</span>
      </div>

      <table className="blox-table" data-testid={`thread-posts-${id}`}>
        <thead>
          <tr>
            <th style={{ width: "145px" }}>Author</th>
            <th style={{ textAlign: "left" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                No posts in this thread yet.
              </td>
            </tr>
          )}
          {posts.map((post, idx) => (
            <tr key={post.id} data-testid={`post-row-${post.id}`}>
              {/* User column */}
              <td className="blox-post-user-col" style={{ backgroundColor: idx % 2 === 0 ? "#dde4ee" : "#ccd4e4" }}>
                <span
                  className="blox-username"
                  style={post.author.titleColor ? { color: post.author.titleColor } : {}}
                  data-testid={`text-username-${post.id}`}
                >
                  {post.author.name}
                </span>
                <span className="blox-user-rank">{post.author.rank}</span>
                <div className="blox-avatar" data-testid={`img-avatar-${post.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6677aa" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="14" rx="1"/>
                    <circle cx="12" cy="9" r="3"/>
                    <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6"/>
                  </svg>
                </div>
                <div className="blox-user-stats">
                  <div>Joined: {post.author.joinDate}</div>
                  <div>Posts: <b>{post.author.posts.toLocaleString()}</b></div>
                </div>
                <div style={{ marginTop: "8px", fontSize: "10px" }}>
                  <a href="#" data-testid={`link-profile-${post.id}`}>Profile</a>
                  {" | "}
                  <a href="#" data-testid={`link-pm-${post.id}`}>PM</a>
                </div>
              </td>

              {/* Post content column */}
              <td className="blox-post-content-col" style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f4f7fc" }}>
                <div className="blox-post-header">
                  <span>Posted: {post.date}</span>
                  <span>
                    <a href={`#${post.id}`} data-testid={`link-post-num-${post.id}`}>
                      #{idx + 1}
                    </a>
                    {" "}
                    <a href="#" style={{ fontSize: "10px", marginLeft: "6px" }}>Quote</a>
                  </span>
                </div>
                <div className="blox-post-body" data-testid={`text-post-content-${post.id}`}>
                  {post.content}
                </div>
                {post.signature && (
                  <div className="blox-post-sig">
                    {post.signature}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="blox-action-bar">
        {threadInfo.isLocked ? (
          <span className="blox-locked-label">[ This topic is locked: you cannot edit posts or make replies. ]</span>
        ) : (
          <button className="blox-btn" data-testid="button-post-reply-bottom">Post Reply</button>
        )}
        <span className="blox-meta">Page 1 of 1</span>
      </div>
    </Layout>
  );
}
