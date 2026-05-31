import { Link } from "wouter";
import { Layout } from "../components/layout";
import { CATEGORIES } from "../lib/mock-data";

export default function Home() {
  return (
    <Layout>
      <div className="retro-breadcrumbs" data-testid="breadcrumbs">
        MyRetroForum Community
      </div>

      {CATEGORIES.map((cat) => (
        <table key={cat.id} className="retro-table" cellPadding="0" cellSpacing="1" data-testid={`category-table-${cat.id}`}>
          <tbody>
            <tr>
              <th colSpan={2} style={{ textAlign: "left" }} data-testid={`category-name-${cat.id}`}>
                {cat.name}
              </th>
              <th width="50">Topics</th>
              <th width="50">Posts</th>
              <th width="150">Last Post</th>
            </tr>
            {cat.forums.map((forum, idx) => {
              const bgClass = idx % 2 === 0 ? "retro-row-bg1" : "retro-row-bg2";
              return (
                <tr key={forum.id} className={bgClass} data-testid={`forum-row-${forum.id}`}>
                  <td width="40" align="center" valign="middle">
                    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23336699' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>" alt="forum icon" />
                  </td>
                  <td>
                    <Link href={`/forum/${forum.id}`} className="retro-forum-title" data-testid={`forum-link-${forum.id}`}>
                      {forum.name}
                    </Link>
                    <span className="retro-forum-desc">{forum.description}</span>
                  </td>
                  <td align="center" className="retro-meta-text">{forum.threads.toLocaleString()}</td>
                  <td align="center" className="retro-meta-text">{forum.posts.toLocaleString()}</td>
                  <td className="retro-meta-text" style={{ whiteSpace: "nowrap" }}>
                    {forum.lastPost ? (
                      <>
                        {forum.lastPost.date}<br />
                        by <b>{forum.lastPost.author}</b>
                      </>
                    ) : (
                      "No posts"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
      
      <table className="retro-table" cellPadding="0" cellSpacing="1" style={{ width: "300px" }}>
        <tbody>
          <tr className="retro-row-bg1">
            <td width="20" align="center">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23336699' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>" alt="new posts" />
            </td>
            <td className="retro-meta-text">New posts</td>
            <td width="20" align="center">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23aaaaaa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>" alt="no new posts" />
            </td>
            <td className="retro-meta-text">No new posts</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
