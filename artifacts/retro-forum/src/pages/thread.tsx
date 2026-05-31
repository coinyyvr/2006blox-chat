import { useParams, Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES, THREADS, POSTS } from "../lib/mock-data";

export default function Thread() {
  const { id } = useParams();
  
  let threadInfo = null;
  let forumInfo = null;

  for (const fId in THREADS) {
    const t = THREADS[fId].find(th => th.id === id);
    if (t) {
      threadInfo = t;
      for (const cat of CATEGORIES) {
        const f = cat.forums.find(forum => forum.id === fId);
        if (f) {
          forumInfo = f;
          break;
        }
      }
      break;
    }
  }

  const posts = POSTS[id as string] || [];

  if (!threadInfo || !forumInfo) {
    return (
      <Layout>
        <div className="retro-breadcrumbs">
          <Link href="/">MyRetroForum Community</Link> &gt; Invalid Thread
        </div>
        <div style={{ padding: "20px", textAlign: "center", border: "1px solid #aaaaaa", backgroundColor: "#f5f5f5" }}>
          The thread you selected does not exist.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="retro-breadcrumbs" data-testid="breadcrumbs">
        <Link href="/">MyRetroForum Community</Link> &gt;{" "}
        <Link href={`/forum/${forumInfo.id}`}>{forumInfo.name}</Link> &gt;{" "}
        {threadInfo.title}
      </div>

      <div style={{ marginBottom: "10px" }}>
        {threadInfo.isLocked ? (
          <span style={{ fontWeight: "bold", color: "#cc0000", fontSize: "11px" }}>[ Topic Locked ]</span>
        ) : (
          <button className="retro-button" data-testid="reply-btn">Post Reply</button>
        )}
      </div>

      <table className="retro-table" cellPadding="0" cellSpacing="1" data-testid={`thread-posts-${id}`}>
        <tbody>
          <tr>
            <th width="150">Author</th>
            <th>Message</th>
          </tr>
          
          {posts.map((post, idx) => {
            const bgClass = idx % 2 === 0 ? "retro-row-bg1" : "retro-row-bg2";
            return (
              <tr key={post.id} data-testid={`post-row-${post.id}`}>
                <td className={`retro-post-user ${bgClass}`}>
                  <div className="retro-user-name">{post.author.name}</div>
                  <div className="retro-user-meta">{post.author.rank}</div>
                  <div className="retro-avatar">No Avatar</div>
                  <div className="retro-user-meta" style={{ marginTop: "10px" }}>
                    Joined: {post.author.joinDate}<br/>
                    Posts: {post.author.posts}
                  </div>
                </td>
                <td className={`retro-post-content ${bgClass}`}>
                  <div className="retro-post-header">
                    <div style={{ float: "right" }}>
                      <a href={`#${post.id}`}>#{idx + 1}</a>
                    </div>
                    Posted: {post.date}
                  </div>
                  <div style={{ padding: "10px", fontSize: "12px", lineHeight: "1.4", whiteSpace: "pre-wrap" }}>
                    {post.content}
                  </div>
                  <div style={{ borderTop: "1px solid #cccccc", margin: "10px 10px 0 10px", paddingTop: "5px", fontSize: "11px", color: "#666666" }}>
                    _________________<br/>
                    <a href="#">Profile</a> | <a href="#">PM</a> | <a href="#">Search</a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        {threadInfo.isLocked ? (
          <span style={{ fontWeight: "bold", color: "#cc0000", fontSize: "11px" }}>[ Topic Locked ]</span>
        ) : (
          <button className="retro-button">Post Reply</button>
        )}
        <div className="retro-meta-text">
          Page 1 of 1
        </div>
      </div>
    </Layout>
  );
}
