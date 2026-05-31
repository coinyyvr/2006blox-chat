import { Link } from "wouter";
import { FORUM_STATS } from "../lib/mock-data";

function getCurrentTime() {
  return new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blox-page" data-testid="layout-container">
      {/* Banner */}
      <div className="blox-banner" data-testid="layout-banner">
        <div className="blox-banner-left">
          <div>
            <div className="blox-logo-text">2006blox chat</div>
            <div className="blox-logo-sub">the classic community - building, chatting, and having fun since 2006</div>
          </div>
        </div>
        <div className="blox-banner-login" data-testid="banner-login-box">
          <div style={{ marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>Login</div>
          <div>
            <a href="#" data-testid="link-login">Log in</a>
            {" | "}
            <a href="#" data-testid="link-register">Register</a>
          </div>
        </div>
      </div>

      {/* Top nav */}
      <div className="blox-topnav" data-testid="layout-topnav">
        <div className="blox-topnav-links">
          <a href="/" data-testid="link-home">
            <span>&#8962;</span> Home
          </a>
          <span className="sep">|</span>
          <a href="#" data-testid="link-search">
            <span>&#128269;</span> Search
          </a>
          <span className="sep">|</span>
          <a href="#" data-testid="link-register-nav">Register</a>
          <span className="sep">|</span>
          <a href="#" data-testid="link-members">Member List</a>
        </div>
        <div className="blox-current-time">
          Current time: {getCurrentTime()}
        </div>
      </div>

      {/* Body */}
      <div className="blox-content">
        <div className="blox-layout">
          {/* Sidebar */}
          <div className="blox-sidebar" data-testid="layout-sidebar">
            <div className="blox-sidebar-box">
              <div className="blox-sidebar-box-title">Search 2006blox Chat</div>
              <div className="blox-sidebar-box-body">
                <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
                  <input
                    className="blox-search-input"
                    type="text"
                    placeholder=""
                    data-testid="input-search"
                    style={{ flex: 1 }}
                  />
                  <button className="blox-search-btn" type="submit" data-testid="button-search">Search</button>
                </form>
                <a href="#" className="blox-sidebar-link" data-testid="link-more-search">More search options</a>
              </div>
            </div>

            <div className="blox-sidebar-box">
              <div className="blox-sidebar-box-title">Forum Stats</div>
              <div className="blox-sidebar-box-body">
                <div style={{ fontSize: "10px", lineHeight: "1.7", color: "#333" }}>
                  <div>Posts: <b>{FORUM_STATS.totalPosts.toLocaleString()}</b></div>
                  <div>Members: <b>{FORUM_STATS.totalMembers.toLocaleString()}</b></div>
                  <div>Newest: <b><a href="#" data-testid="link-newest-member">{FORUM_STATS.newestMember}</a></b></div>
                  <div>Most online: <b>{FORUM_STATS.mostOnline}</b></div>
                </div>
              </div>
            </div>

            <div className="blox-sidebar-box">
              <div className="blox-sidebar-box-title">Quick Links</div>
              <div className="blox-sidebar-box-body" style={{ lineHeight: "2" }}>
                <a href="#" className="blox-sidebar-link" data-testid="link-faq">FAQ</a>
                <a href="#" className="blox-sidebar-link" data-testid="link-rules">Forum Rules</a>
                <a href="#" className="blox-sidebar-link" data-testid="link-unanswered">Unanswered Posts</a>
                <a href="#" className="blox-sidebar-link" data-testid="link-active">Active Topics</a>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="blox-main" data-testid="layout-main">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="blox-footer" data-testid="layout-footer">
          <div>
            2006blox Chat &mdash; "Online Building &amp; Chatting Community" &mdash; All content created by our members.
          </div>
          <div style={{ marginTop: "4px" }}>
            2006blox is not affiliated with LEGO, Hasbro, or any other toy company. All times are GMT-5.
          </div>
          <div style={{ marginTop: "6px" }}>
            <a href="#">Privacy Policy</a>
            {" | "}
            <a href="#">Contact Us</a>
            {" | "}
            <a href="#">About Us</a>
            {" | "}
            <a href="#">Jobs</a>
          </div>
          <div style={{ marginTop: "4px", color: "#777" }}>
            Powered by 2006blox Forum Engine &copy; 2006&ndash;2007
          </div>
        </div>
      </div>
    </div>
  );
}
