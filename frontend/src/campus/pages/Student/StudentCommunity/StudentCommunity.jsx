import "./StudentCommunity.css";

import {
  ArrowUpRight,
  Brain,
  CheckCircle,
  Code2,
  FolderKanban,
  Heart,
  Lightbulb,
  MessageSquare,
  Plus,
  Search,
  Send,
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

const INITIAL_DISCUSSIONS = [
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

const INITIAL_REPLIES = {
  1: [
    { id: 101, author: "Dr. Sarah Chen", avatar: "SC", time: "1 hour ago", text: "Start with the official 'Deep Learning with PyTorch: A 60 Minute Blitz'. It covers tensors and autograd thoroughly before jumping into neural nets." },
    { id: 102, author: "Vikram S.", avatar: "V", time: "45 mins ago", text: "Also check out fast.ai chapter 1-4. Very hands-on and gets you training models in code right away." },
  ],
  2: [
    { id: 201, author: "Prof. Michael Torres", avatar: "MT", time: "3 hours ago", text: "Look into transfer learning or few-shot techniques. Also cross-validation with stratified folds is essential when sample size is constrained." }
  ],
  3: [
    { id: 301, author: "Nithya R.", avatar: "N", time: "18 hours ago", text: "Interested! I've been working with FastAPI backend microservices and Redis for distributed queueing." }
  ],
  4: [
    { id: 401, author: "Academic Affairs", avatar: "AA", time: "20 hours ago", text: "Yes, opportunities on NEXUS integrate with department verified listings. Your profile intelligence score is automatically attached." }
  ],
  5: [
    { id: 501, author: "Arjun K.", avatar: "A", time: "1 day ago", text: "React has much wider adoption in the campus labs, plus our shared component libraries are React-based." }
  ],
  6: [
    { id: 601, author: "Dr. Sarah Chen", avatar: "SC", time: "2 days ago", text: "Use the NEXUS Knowledge submission template. It includes methodology, reproducibility checklist, and architecture diagrams." }
  ]
};

const COMMUNITIES = [
  {
    id: "ai",
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

  const [discussions, setDiscussions] = useState(INITIAL_DISCUSSIONS);
  const [repliesMap, setRepliesMap] = useState(INITIAL_REPLIES);
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const [likedPosts, setLikedPosts] = useState(new Set());
  
  // Modals & Feedback
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("ai");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [activeThread, setActiveThread] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) return;

    const newPost = {
      id: Date.now(),
      title: newTitle.trim(),
      author: "Alex Morgan",
      avatar: "AM",
      topic: newTopic,
      replies: 0,
      likes: 1,
      time: "Just now",
      excerpt: newExcerpt.trim(),
    };

    setDiscussions((prev) => [newPost, ...prev]);
    setRepliesMap((prev) => ({ ...prev, [newPost.id]: [] }));
    setLikedPosts((prev) => new Set(prev).add(newPost.id));
    setNewTitle("");
    setNewExcerpt("");
    setIsNewPostModalOpen(false);
    showToast("Discussion post published to campus feed.");
  };

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const newReply = {
      id: Date.now(),
      author: "Alex Morgan",
      avatar: "AM",
      time: "Just now",
      text: replyText.trim(),
    };

    setRepliesMap((prev) => ({
      ...prev,
      [activeThread.id]: [...(prev[activeThread.id] || []), newReply],
    }));

    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === activeThread.id ? { ...d, replies: d.replies + 1 } : d
      )
    );

    setActiveThread((prev) =>
      prev ? { ...prev, replies: prev.replies + 1 } : null
    );

    setReplyText("");
    showToast("Reply added to thread.");
  };

  const filtered = useMemo(() => {
    return discussions.filter((post) => {
      const matchesTopic = activeTopic === "all" || post.topic === activeTopic;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchesTopic && matchesSearch;
    });
  }, [discussions, activeTopic, search]);

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
              className="community-start-post active-btn"
              onClick={() => setIsNewPostModalOpen(true)}
              title="Start a new discussion thread"
            >
              <Plus size={16} />
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
                      onClick={() => setActiveThread(post)}
                      title="Open and reply to this discussion"
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
                const isSelected = activeTopic === community.id;
                return (
                  <button
                    key={community.id}
                    type="button"
                    className={`community-item ${isSelected ? "selected-community" : ""}`}
                    onClick={() => setActiveTopic(community.id)}
                    title={`Filter by ${community.name}`}
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

      {/* =========================================================
          NEW DISCUSSION MODAL
          ========================================================= */}
      {isNewPostModalOpen && (
        <div className="comm-modal-backdrop" onClick={() => setIsNewPostModalOpen(false)}>
          <div className="comm-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="comm-modal-header">
              <div>
                <span className="comm-modal-eyebrow">CAMPUS FORUM</span>
                <h2>Start a New Discussion</h2>
              </div>
              <button
                type="button"
                className="comm-modal-close"
                onClick={() => setIsNewPostModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="comm-modal-form">
              <div className="comm-form-group">
                <label htmlFor="comm-post-title">Discussion Title</label>
                <input
                  id="comm-post-title"
                  type="text"
                  placeholder="e.g. Best architecture patterns for multi-tenant telemetry..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="comm-form-group">
                <label htmlFor="comm-post-topic">Category Topic</label>
                <select
                  id="comm-post-topic"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                >
                  <option value="ai">AI &amp; Data</option>
                  <option value="dev">Development</option>
                  <option value="research">Research</option>
                  <option value="career">Career</option>
                  <option value="projects">Projects</option>
                </select>
              </div>

              <div className="comm-form-group">
                <label htmlFor="comm-post-body">Content / Question</label>
                <textarea
                  id="comm-post-body"
                  rows={4}
                  placeholder="Provide context, problem statements, or questions for your campus peers..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  required
                />
              </div>

              <div className="comm-modal-actions">
                <button
                  type="button"
                  className="comm-btn-cancel"
                  onClick={() => setIsNewPostModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="comm-btn-submit"
                  disabled={!newTitle.trim() || !newExcerpt.trim()}
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          THREAD VIEWER & REPLY MODAL
          ========================================================= */}
      {activeThread && (
        <div className="comm-modal-backdrop" onClick={() => setActiveThread(null)}>
          <div className="comm-modal-dialog comm-thread-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="comm-modal-header">
              <div className="comm-thread-meta">
                <span className={`community-topic-tag topic-${activeThread.topic}`}>
                  {TOPICS.find((t) => t.id === activeThread.topic)?.label || activeThread.topic}
                </span>
                <span className="comm-thread-time">{activeThread.time}</span>
              </div>
              <button
                type="button"
                className="comm-modal-close"
                onClick={() => setActiveThread(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="comm-thread-original-post">
              <div className="community-post-author">
                <div className="community-avatar">{activeThread.avatar}</div>
                <div>
                  <strong>{activeThread.author}</strong>
                  <span>Author</span>
                </div>
              </div>
              <h2>{activeThread.title}</h2>
              <p>{activeThread.excerpt}</p>
            </div>

            <div className="comm-thread-replies-section">
              <h3>Responses ({repliesMap[activeThread.id]?.length || 0})</h3>
              
              <div className="comm-replies-list">
                {(repliesMap[activeThread.id] || []).length > 0 ? (
                  repliesMap[activeThread.id].map((reply) => (
                    <div key={reply.id} className="comm-reply-card">
                      <div className="comm-reply-header">
                        <div className="comm-reply-avatar">{reply.avatar}</div>
                        <strong>{reply.author}</strong>
                        <span>{reply.time}</span>
                      </div>
                      <p className="comm-reply-text">{reply.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="comm-no-replies">No replies yet. Be the first to respond!</p>
                )}
              </div>

              <form onSubmit={handleAddReply} className="comm-reply-composer">
                <input
                  type="text"
                  placeholder="Write a response..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
                <button type="submit" disabled={!replyText.trim()}>
                  <Send size={15} />
                  Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TOAST FEEDBACK
          ========================================================= */}
      {toastMessage && (
        <div className="comm-toast-notification">
          <CheckCircle size={17} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default StudentCommunity;
