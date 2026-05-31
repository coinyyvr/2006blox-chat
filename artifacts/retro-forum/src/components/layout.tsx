import { useState } from "react";
import { Link } from "wouter";
import { useStats } from "../context/stats-context";
import headerImg from "@assets/header_1780191353809.png";

const TIMEZONES = [
  { label: "GMT-12", offset: -12 },
  { label: "GMT-11", offset: -11 },
  { label: "GMT-10", offset: -10 },
  { label: "GMT-9",  offset: -9  },
  { label: "GMT-8",  offset: -8  },
  { label: "GMT-7",  offset: -7  },
  { label: "GMT-6",  offset: -6  },
  { label: "GMT-5",  offset: -5  },
  { label: "GMT-4",  offset: -4  },
  { label: "GMT-3",  offset: -3  },
  { label: "GMT-2",  offset: -2  },
  { label: "GMT-1",  offset: -1  },
  { label: "GMT+0",  offset: 0   },
  { label: "GMT+1",  offset: 1   },
  { label: "GMT+2",  offset: 2   },
  { label: "GMT+3",  offset: 3   },
  { label: "GMT+4",  offset: 4   },
  { label: "GMT+5",  offset: 5   },
  { label: "GMT+5:30", offset: 5.5 },
  { label: "GMT+6",  offset: 6   },
  { label: "GMT+7",  offset: 7   },
  { label: "GMT+8",  offset: 8   },
  { label: "GMT+9",  offset: 9   },
  { label: "GMT+10", offset: 10  },
  { label: "GMT+11", offset: 11  },
  { label: "GMT+12", offset: 12  },
];

function getTimeInZone(offsetHours: number) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000 + 3 * 60000;
  const zoned = new Date(utc + offsetHours * 3600000);
  return zoned.toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { totalPosts, totalMembers, newestMember } = useStats();
  const [tzOffset, setTzOffset] = useState(-3);

  const selectedTz = TIMEZONES.find((t) => t.offset === tzOffset) ?? TIMEZONES[9];

  return (
    <div className="blox-page" data-testid="layout-container">
      {/* Banner */}
      <div style={{ position: "relative", backgroundColor: "#ffffff", height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid="layout-banner">
        <img
          src={headerImg}
          alt="2006blox chat"
          style={{ height: "120px", width: "auto", display: "block", border: "2px solid #000", outline: "1px solid #555" }}
          data-testid="img-header-banner"
        />
        <a
          href="/login"
          data-testid="link-login"
          style={{
            position: "absolute",
            top: "10px",
            left: "12px",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "13px",
            fontFamily: "Verdana, Arial, sans-serif",
            textDecoration: "none",
            textShadow: "1px 1px 2px #000",
          }}
        >
          Login
        </a>
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "bold", color: "#333" }}>
          <span>Current time: {getTimeInZone(tzOffset)}</span>
          <select
            data-testid="select-timezone"
            value={tzOffset}
            onChange={(e) => setTzOffset(Number(e.target.value))}
            style={{
              fontSize: "10px",
              fontFamily: "Verdana, Arial, sans-serif",
              border: "1px solid #8899bb",
              backgroundColor: "#f0f4ff",
              padding: "1px 2px",
              cursor: "pointer",
            }}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.label} value={tz.offset}>{tz.label}</option>
            ))}
          </select>
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
                  <div>Posts: <b>{totalPosts.toLocaleString()}</b></div>
                  <div>Members: <b>{totalMembers.toLocaleString()}</b></div>
                  <div>Newest: <b><a href="#" data-testid="link-newest-member">{newestMember}</a></b></div>
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
            2006blox is not affiliated with Roblox or the Roblox Corporation. All times are {selectedTz.label}.
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
