import "./StudentSettings.css";

import {
  Bell,
  Lock,
  Moon,
  Save,
  Sun,
  User,
  Zap,
} from "lucide-react";

import { useState } from "react";

/* =========================================================
   SETTINGS STATE
   All settings are local UI preferences only until a
   backend settings endpoint is available.
   Settings that cannot persist to the backend are saved
   to localStorage and clearly marked.
   ========================================================= */

function getInitialSettings() {
  try {
    const stored = localStorage.getItem("nexus_student_settings");
    if (stored) return JSON.parse(stored);
  } catch {
    // fallback to defaults
  }
  return {
    // APPEARANCE
    sidebarCollapsed: false,
    compactMode: false,
    // NOTIFICATIONS (local prefs — not yet connected to backend)
    notifyProjectUpdates: true,
    notifyMentorRequests: true,
    notifyOpportunities: true,
    notifyIntelligence: false,
    // PROFILE PREFERENCES
    profileVisibility: "campus", // campus | private
    showSkillsToOthers: true,
    showProjectsToOthers: true,
    // INTERFACE
    keyboardShortcuts: true,
    animationsEnabled: true,
  };
}

const SECTIONS = [
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile Preferences", icon: User },
  { id: "interface", label: "Interface", icon: Zap },
  { id: "account", label: "Account", icon: Lock },
];

function StudentSettings() {
  const [settings, setSettings] = useState(getInitialSettings);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("nexus_student_settings", JSON.stringify(settings));
    } catch {
      // Ignore storage error
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="student-settings">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="settings-header">

        <div>
          <span className="settings-eyebrow">NEXUS / SETTINGS</span>
          <h1>Preferences</h1>
        </div>

        <button
          type="button"
          className={`settings-save-btn ${saved ? "saved" : ""}`}
          onClick={handleSave}
        >
          <Save size={16} />
          {saved ? "Saved" : "Save preferences"}
        </button>

      </div>

      <div className="settings-notice">
        Settings are saved locally in your browser. Backend-persisted preferences
        will be available in a future update.
      </div>

      {/* =========================================================
          LAYOUT
      ========================================================= */}

      <div className="settings-layout">

        {/* NAV */}
        <nav className="settings-nav" aria-label="Settings sections">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                type="button"
                className={`settings-nav-item ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={17} />
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* CONTENT */}
        <div className="settings-content">

          {/* -------------------------------------------------------
              APPEARANCE
              ------------------------------------------------------- */}
          {activeSection === "appearance" && (
            <section className="settings-section">
              <h2>Appearance</h2>

              <div className="settings-group">

                <div className="settings-row">
                  <div>
                    <strong>Compact mode</strong>
                    <p>Reduce padding and spacing throughout the interface.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => update("compactMode", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Collapse sidebar by default</strong>
                    <p>Start the interface with the sidebar in collapsed state.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.sidebarCollapsed}
                      onChange={(e) => update("sidebarCollapsed", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row settings-row-disabled">
                  <div>
                    <strong>Theme</strong>
                    <p>Dark mode and custom themes — coming in a future update.</p>
                  </div>
                  <div className="settings-theme-preview">
                    <div className="theme-option light active">
                      <Sun size={15} /> Light
                    </div>
                    <div className="theme-option dark disabled">
                      <Moon size={15} /> Dark
                    </div>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* -------------------------------------------------------
              NOTIFICATIONS
              ------------------------------------------------------- */}
          {activeSection === "notifications" && (
            <section className="settings-section">
              <h2>Notifications</h2>

              <p className="settings-section-note">
                Notification delivery requires backend integration. These preferences
                are saved locally and will be applied when the notifications service
                is connected.
              </p>

              <div className="settings-group">

                <div className="settings-row">
                  <div>
                    <strong>Project updates</strong>
                    <p>Alerts when your project receives activity or updates.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.notifyProjectUpdates}
                      onChange={(e) => update("notifyProjectUpdates", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Mentor requests</strong>
                    <p>Alerts when a mentor responds to your request.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.notifyMentorRequests}
                      onChange={(e) => update("notifyMentorRequests", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Opportunity matches</strong>
                    <p>Alerts when new opportunities match your profile.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.notifyOpportunities}
                      onChange={(e) => update("notifyOpportunities", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Intelligence updates</strong>
                    <p>Alerts when your intelligence score or profile changes.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.notifyIntelligence}
                      onChange={(e) => update("notifyIntelligence", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

              </div>
            </section>
          )}

          {/* -------------------------------------------------------
              PROFILE PREFERENCES
              ------------------------------------------------------- */}
          {activeSection === "profile" && (
            <section className="settings-section">
              <h2>Profile Preferences</h2>

              <p className="settings-section-note">
                Profile visibility settings require backend integration to take
                effect across the campus network.
              </p>

              <div className="settings-group">

                <div className="settings-row">
                  <div>
                    <strong>Profile visibility</strong>
                    <p>Who can view your student profile on campus.</p>
                  </div>
                  <select
                    className="settings-select"
                    value={settings.profileVisibility}
                    onChange={(e) => update("profileVisibility", e.target.value)}
                  >
                    <option value="campus">All campus</option>
                    <option value="private">Only me</option>
                  </select>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Show skills to others</strong>
                    <p>Allow other students to see your skill profile.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.showSkillsToOthers}
                      onChange={(e) => update("showSkillsToOthers", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Show projects to others</strong>
                    <p>Allow others to see your project portfolio.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.showProjectsToOthers}
                      onChange={(e) => update("showProjectsToOthers", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

              </div>
            </section>
          )}

          {/* -------------------------------------------------------
              INTERFACE
              ------------------------------------------------------- */}
          {activeSection === "interface" && (
            <section className="settings-section">
              <h2>Interface</h2>

              <div className="settings-group">

                <div className="settings-row">
                  <div>
                    <strong>Keyboard shortcuts</strong>
                    <p>Enable shortcuts like / to focus search.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.keyboardShortcuts}
                      onChange={(e) => update("keyboardShortcuts", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Interface animations</strong>
                    <p>Enable transitions and subtle animations throughout the interface.</p>
                  </div>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.animationsEnabled}
                      onChange={(e) => update("animationsEnabled", e.target.checked)}
                    />
                    <span />
                  </label>
                </div>

              </div>

              <div className="settings-shortcut-reference">
                <h3>Keyboard reference</h3>
                <div className="shortcuts-list">
                  <div><kbd>/</kbd><span>Focus knowledge search</span></div>
                  <div><kbd>Enter</kbd><span>Send AI Mentor message</span></div>
                  <div><kbd>Shift+Enter</kbd><span>New line in AI Mentor</span></div>
                </div>
              </div>

            </section>
          )}

          {/* -------------------------------------------------------
              ACCOUNT
              ------------------------------------------------------- */}
          {activeSection === "account" && (
            <section className="settings-section">
              <h2>Account</h2>

              <div className="settings-group">

                <div className="settings-row settings-row-disabled">
                  <div>
                    <strong>Change password</strong>
                    <p>Password management requires backend authentication integration.</p>
                  </div>
                  <button type="button" className="settings-action-btn" disabled>
                    Change password
                  </button>
                </div>

                <div className="settings-row settings-row-disabled">
                  <div>
                    <strong>Two-factor authentication</strong>
                    <p>Additional security for your campus account — coming soon.</p>
                  </div>
                  <button type="button" className="settings-action-btn" disabled>
                    Set up 2FA
                  </button>
                </div>

                <div className="settings-row settings-row-disabled">
                  <div>
                    <strong>Export your data</strong>
                    <p>Download a copy of your profile, projects and activity.</p>
                  </div>
                  <button type="button" className="settings-action-btn" disabled>
                    Request export
                  </button>
                </div>

              </div>

              <div className="settings-danger-zone">
                <h3>Session</h3>
                <p>
                  Manage your current campus session.
                </p>
                <button
                  type="button"
                  className="settings-logout-btn"
                  onClick={() => {
                    try { localStorage.removeItem("nexusAuth"); } catch {}
                    window.location.href = "/login";
                  }}
                >
                  Sign out of NEXUS
                </button>
              </div>

            </section>
          )}

        </div>

      </div>

    </div>
  );
}

export default StudentSettings;
