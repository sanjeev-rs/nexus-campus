import "./StudentCommunity.css";

import {
  ArrowUpRight,
  Brain,
  Code2,
  FolderKanban,
  Heart,
  Lightbulb,
  MessageSquare,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   STATIC DEMONSTRATION DATA
   Clearly identified placeholder content.
   Replace with real API endpoints when available.
   ========================================================= */

const TOPICS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & Data" },
  { id: "dev", label: "Development" },
  { id: "research", label: "Research" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
];

const DISCUSSIONS = [
  {
    id: 1,
    title: "Best resources for getting started with PyTorch?",
    author: "Arjun K.",
    avatar: "A",
    topic: "ai",
    replies: 14,
    likes: 23,
    time: "2 hours ago",
    excerpt:
      "Looking for practical tutorials or projects to learn PyTorch. I have a Python background but no deep learning experience.",
  },
  {
    id: 2,
    title: "How to structure a research project with limited data?",
    author: "Priya N.",
    avatar: "P",
    topic: "research",
    replies: 8,
    likes: 17,
    time: "5 hours ago",
    excerpt:
      "Working on a campus data analysis project. The dataset is small — any advice on methodology?",
  },
  {
    id: 3,
    title: "Looking for collaborators: AI Accountability project",
    author: "Vikram S.",
    avatar: "V",
    topic: "projects",
    replies: 6,
    likes: 12,
    time: "Yesterday",
    excerpt:
      "Working on a trust engine for AI agents. Need one or two people with backend or systems architecture experience.",
  },
  {
    id: 4,
    title: "How do internship applications work through the campus portal?",
    author: "Rahul M.",
    avatar: "R",
    topic: "career",
    replies: 11,
    likes: 9,
    time: "Yesterday",
    excerpt:
      "First time applying for internships. Does NEXUS connect to the opportunities pipeline directly?",
  },
  {
    id: 5,
    title: "React vs Vue — which should I learn first for campus projects?",
    author: "Nithya R.",
    avatar: "N",
    topic: "dev",
    replies: 19,
    likes: 31,
    time: "2 days ago",
    excerpt:
      "Most campus projects seem to use React. Curious if there's a reason or if Vue would also be acceptable.",
  },
  {
    id: 6,
    title: "Tips for documenting a research project properly?",
    author: "Karthik V.",
    avatar: "K",
    topic: "research",
    replies: 5,
    likes: 14,
    time: "3 days ago",
    excerpt:
      "My supervisor wants thorough documentation. Looking for a practical structure for academic + technical docs.",
  },
];

const COMMUNITIES = [
  {
    id: "ai-ds",
    name: "AI & Data Science",
    description: "Machine learning, data, and AI projects",
    members: 142,
    icon: Brain,
    accent: "blue",
  },
  {
    id: "dev",
    name: "Student Developers",
    description: "Frontend, backend, and system development",
    members: 231,
    icon: Code2,
    accent: "purple",
  },
  {
    id: "research",
    name: "Research Network",
    description: "Academic research, papers, and experiments",
    members: 98,
    icon: Lightbulb,
    accent: "orange",
  },
  {
    id: "projects",
    name: "Project Builders",
    description: "Collaboration, project ideas, and teams",
    members: 187,
    icon: FolderKanban,
    accent: "green",
  },
];

const ACTIVE_STUDENTS = [
  { name: "Priya N.", initials: "PN", dept: "Computer Science", posts: 28 },
  { name: "Arjun K.", initials: "AK", dept: "AI & Data Science", posts: 24 },
  { name: "Vikram S.", initials: "VS", dept: "AI & Data Science", posts: 19 },
  { name: "Rahul M.", initials: "RM", dept: "Computer Science", posts: 16 },
];

function StudentCommunity() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return DISCUSSIONS.filter((post) => {
      const matchesTopic = activeTopic === "all" || post.topic === activeTopic;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchesTopic && matchesSearch;
    });
  }, [activeTopic, search]);

  return (
    <div className="student-community">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="community-hero">

        <div className="community-hero-content">

          <span className="community-eyebrow">
            NEXUS / COMMUNITY
          </span>

          <h1>
            Your campus,
            <span> connected.</span>
          </h1>

          <p>
            Discuss ideas, find collaborators, share knowledge
            and connect with students building things across campus.
          </p>

        </div>

        <div className="community-stats-strip">

          <div>
            <strong>1,284</strong>
            <span>Students</span>
          </div>

          <div>
            <strong>342</strong>
            <span>Discussions</span>
          </div>

          <div>
            <strong>4</strong>
            <span>Communities</span>
          </div>

        </div>

      </section>


      {/* =========================================================
          MAIN LAYOUT
      ========================================================= */}

      <div className="community-layout">

        {/* -------------------------------------------------------
            LEFT: DISCUSSIONS
            ------------------------------------------------------- */}
        <div className="community-main">

          {/* SEARCH */}
          <div className="community-search-row">

            <div className="community-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search discussions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search discussions"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="community-start-post"
              disabled
              title="Post discussions — coming soon"
            >
              <MessageSquare size={16} />
              Start a discussion
            </button>

          </div>

          {/* TOPIC FILTERS */}
          <div className="community-topics">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`community-topic ${activeTopic === topic.id ? "active" : ""}`}
                onClick={() => setActiveTopic(topic.id)}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <div className="community-results-header">
            <span>{filtered.length} discussion{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* DISCUSSION LIST */}
          {filtered.length > 0 ? (
            <div className="community-discussion-list">
              {filtered.map((post) => (
                <article key={post.id} className="community-post">

                  <div className="community-post-author">
                    <div className="community-avatar">{post.avatar}</div>
                    <div>
                      <strong>{post.author}</strong>
                      <span>{post.time}</span>
                    </div>
                  </div>

                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <div className="community-post-footer">

                    <button
                      type="button"
                      className={`community-like ${likedPosts.has(post.id) ? "liked" : ""}`}
                      onClick={() => toggleLike(post.id)}
                      aria-label={likedPosts.has(post.id) ? "Unlike" : "Like"}
                    >
                      <Heart size={15} />
                      <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </button>

                    <div className="community-replies">
                      <MessageSquare size={15} />
                      <span>{post.replies} replies</span>
                    </div>

                    <span className={`community-topic-tag topic-${post.topic}`}>
                      {TOPICS.find((t) => t.id === post.topic)?.label || post.topic}
                    </span>

                    <button
                      type="button"
                      className="community-open-post"
                      disabled
                      title="Open discussion — coming soon"
                    >
                      Read thread
                      <ArrowUpRight size={14} />
                    </button>

                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="community-empty">
              <Search size={28} />
              <h3>No discussions found</h3>
              <p>Try a different search or change the topic filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setActiveTopic("all"); }}
              >
                Clear filters
              </button>
            </div>
          )}

        </div>

        {/* -------------------------------------------------------
            RIGHT: SIDEBAR
            ------------------------------------------------------- */}
        <aside className="community-sidebar">

          {/* COMMUNITIES */}
          <div className="community-sidebar-card">

            <div className="sidebar-card-heading">
              <Users size={17} />
              <span>Communities</span>
            </div>

            <div className="community-list">
              {COMMUNITIES.map((community) => {
                const Icon = community.icon;
                return (
                  <button
                    key={community.id}
                    type="button"
                    className="community-item"
                    disabled
                    title="Join communities — coming soon"
                  >
                    <div className={`community-icon community-icon-${community.accent}`}>
                      <Icon size={17} />
                    </div>
                    <div className="community-item-info">
                      <strong>{community.name}</strong>
                      <span>{community.members} members</span>
                    </div>
                    <ArrowUpRight size={15} className="community-item-arrow" />
                  </button>
                );
              })}
            </div>

          </div>

          {/* ACTIVE STUDENTS */}
          <div className="community-sidebar-card">

            <div className="sidebar-card-heading">
              <TrendingUp size={17} />
              <span>Active this week</span>
            </div>

            <div className="active-students-list">
              {ACTIVE_STUDENTS.map((student) => (
                <div key={student.name} className="active-student">
                  <div className="active-student-avatar">{student.initials}</div>
                  <div className="active-student-info">
                    <strong>{student.name}</strong>
                    <span>{student.dept}</span>
                  </div>
                  <span className="active-student-posts">{student.posts} posts</span>
                </div>
              ))}
            </div>

          </div>

          {/* KNOWLEDGE LINK */}
          <div className="community-knowledge-card">
            <Sparkles size={18} />
            <div>
              <strong>Explore campus knowledge</strong>
              <p>Research, guides, and documented campus work.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/student/knowledge")}
            >
              Explore
              <ArrowUpRight size={14} />
            </button>
          </div>

        </aside>

      </div>

    </div>
  );
}

export default StudentCommunity;
