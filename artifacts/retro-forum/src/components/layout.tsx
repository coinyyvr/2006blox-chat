import { Link } from "wouter";
import { FORUM_STATS } from "../lib/mock-data";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="retro-container" data-testid="layout-container">
      <div className="retro-header" data-testid="layout-header">
        <h1>MyRetroForum Community</h1>
        <p>The best place to discuss everything from the mid-2000s!</p>
      </div>
      
      <div className="retro-nav" data-testid="layout-nav">
        <Link href="/" data-testid="link-home">Home</Link>
        <a href="#" data-testid="link-faq">FAQ</a>
        <a href="#" data-testid="link-search">Search</a>
        <a href="#" data-testid="link-members">Members</a>
        <a href="#" data-testid="link-register">Register</a>
        <a href="#" data-testid="link-login">Login</a>
      </div>

      <div style={{ minHeight: "400px" }}>
        {children}
      </div>

      <div className="retro-footer" data-testid="layout-footer">
        <p>
          Our users have posted a total of <b>{FORUM_STATS.totalPosts.toLocaleString()}</b> messages<br />
          We have <b>{FORUM_STATS.totalMembers.toLocaleString()}</b> registered members<br />
          The newest member is <b><a href="#">{FORUM_STATS.newestMember}</a></b>
        </p>
        <p style={{ marginTop: "10px" }}>
          Powered by RetroBB © 2004<br />
          All times are GMT -5. The time now is {new Date("2004-10-24T16:20:00").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
        </p>
      </div>
    </div>
  );
}
