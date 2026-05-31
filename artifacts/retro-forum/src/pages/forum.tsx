import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES, THREADS } from "../lib/mock-data";
import { Pin, Lock } from "lucide-react";

export default function Forum() {
  const { id } = useParams();
  
  let forumInfo = null;
  for (const cat of CATEGORIES) {
    const f = cat.forums.find(f => f.id === id);
    if (f) {
      forumInfo = f;
      break;
    }
  }

  const threads = THREADS[id as string] || [];

  if (!forumInfo) {
    return (
      <Layout>
        <div className="retro-breadcrumbs">
          <Link href="/">MyRetroForum Community</Link> &gt; Invalid Forum
        </div>
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid #aaaaaa", backgroundColor: "#f5f5f5" }}>
          The forum you selected does not exist.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="retro-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">MyRetroForum Community</Link> &gt; {forumInfo.name}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <button className="retro-button" data-testid="new-topic-btn">New Topic</button>
      </div>

      <table className="retro-table" cellPadding="0" cellSpacing="1" data-testid={`forum-threads-${id}`}>
        <tbody>
          <tr>
            <th colSpan={2}>Topic</th>
            <th width="100">Author</th>
            <th width="50">Replies</th>
            <th width="50">Views</th>
            <th width="150">Last Post</th>
          </tr>
          {threads.length === 0 && (
            <tr className="retro-row-bg1">
              <td colSpan={6} align="center" style={{ padding: "20px" }}>
                There are no posts in this forum.
              </td>
            </tr>
          )}
          {threads.map((thread, idx) => {
            const bgClass = idx % 2 === 0 ? "retro-row-bg1" : "retro-row-bg2";
            return (
              <tr key={thread.id} className={bgClass} data-testid={`thread-row-${thread.id}`}>
                <td width="30" align="center" valign="middle">
                  {thread.isLocked ? (
                    <Lock size={16} color="#666" />
                  ) : thread.isPinned ? (
                    <Pin size={16} color="#c00" />
                  ) : (
                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23336699' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><polyline points='14 2 14 8 20 8'/><line x1='16' y1='13' x2='8' y2='13'/><line x1='16' y1='17' x2='8' y2='17'/><polyline points='10 9 9 9 8 9'/></svg>" alt="topic icon" />
                  )}
                </td>
                <td>
                  {thread.isPinned && <b>Sticky: </b>}
                  <Link href={`/thread/${thread.id}`} className="retro-forum-title" data-testid={`thread-link-${thread.id}`}>
                    {thread.title}
                  </Link>
                </td>
                <td align="center" className="retro-meta-text">{thread.author}</td>
                <td align="center" className="retro-meta-text">{thread.replies}</td>
                <td align="center" className="retro-meta-text">{thread.views}</td>
                <td className="retro-meta-text" style={{ whiteSpace: "nowrap" }}>
                  {thread.lastPost.date}<br />
                  by <b>{thread.lastPost.author}</b>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <button className="retro-button">New Topic</button>
        <div className="retro-meta-text">
          Page 1 of 1
        </div>
      </div>
    </Layout>
  );
}
