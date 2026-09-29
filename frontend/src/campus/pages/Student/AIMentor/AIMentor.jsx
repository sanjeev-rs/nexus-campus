import "./AIMentor.css";

import {
  Brain,
  Loader2,
  RefreshCw,
  Send,
  Sparkles,
  X,
  AlertTriangle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   SIMULATED RESPONSE ENGINE
   This is a LOCAL frontend-only simulation.
   Replace simulateResponse() with a real API call to the
   NEXUS AI Mentor backend endpoint when available.

   Expected API contract (future):
   POST /api/student/ai-mentor/message
   Body: { message: string, history: Array<{role, content}> }
   Response: { reply: string }
   ========================================================= */

const SIMULATED_RESPONSES = {
  default: [
    "That's a great area to focus on. Based on your current profile, I'd suggest starting with a focused mini-project that applies the concept directly. What specific aspect would you like to explore first?",
    "Your intelligence profile shows strong technical foundations. Building on those, the most effective next step would be to connect your skills to a real-world problem you care about. What problem interests you most?",
    "Looking at your current development path, that aligns well with the Machine Learning growth area identified in your profile. I'd recommend starting with the fundamentals — do you have any existing data you could work with?",
    "That's a meaningful question. Campus projects like yours often benefit from connecting technical depth with clear problem framing. Would you like me to help you structure your thinking on this?",
    "Your progress this semester has been consistent. This kind of question shows you're ready to push into the next level of complexity. Let's break it down — what do you already know about this topic?",
  ],
  greeting: [
    "Hello! I'm your NEXUS AI Mentor. I can help you think through your development path, projects, skills and campus goals. What's on your mind today?",
    "Welcome back. Your intelligence profile has been updated recently — there's some interesting growth in your technical skills. What would you like to work through today?",
  ],
};

const SUGGESTED_PROMPTS = [
  "How should I develop my Machine Learning skills further?",
  "Help me think through my NEXUS project architecture",
  "What should I focus on for my career goals?",
  "I'm stuck on a research problem — can you help?",
  "How do I improve my technical communication?",
  "What project should I build next?",
];

let responseIndex = 0;

function simulateResponse(userMessage) {
  // Simple keyword routing for demo purposes
  const lower = userMessage.toLowerCase();
  let pool;

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    pool = SIMULATED_RESPONSES.greeting;
  } else {
    pool = SIMULATED_RESPONSES.default;
  }

  // Rotate through responses deterministically
  const response = pool[responseIndex % pool.length];
  responseIndex++;
  return response;
}

/* =========================================================
   COMPONENT
   ========================================================= */

function AIMentor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  const msgIdRef = useRef(1);
  const nextId = () => { msgIdRef.current += 1; return msgIdRef.current; };

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Focus input when session starts
  useEffect(() => {
    if (sessionStarted) {
      inputRef.current?.focus();
    }
  }, [sessionStarted]);

  const startSession = () => {
    setSessionStarted(true);
    setMessages([
      {
        id: nextId(),
        role: "assistant",
        content:
          "Hello! I'm your NEXUS AI Mentor. I'm here to help you think through your development path, projects, skills and campus goals. What would you like to explore today?",
      },
    ]);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setInput("");
    setError(null);

    const userMsg = {
      id: nextId(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));

      const reply = simulateResponse(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    if (!sessionStarted) startSession();
    setInput(prompt);
    inputRef.current?.focus();
  };

  const clearSession = () => {
    setMessages([]);
    setInput("");
    setError(null);
    setSessionStarted(false);
    responseIndex = 0;
  };

  return (
    <div className="ai-mentor">

      {/* =========================================================
          HEADER BAR
      ========================================================= */}

      <div className="ai-mentor-header">

        <div className="ai-mentor-identity">

          <div className="ai-mentor-avatar">
            <Brain size={20} />
          </div>

          <div>
            <span className="ai-mentor-eyebrow">NEXUS AI MENTOR</span>
            <h1>Your intelligent development guide.</h1>
          </div>

        </div>

        <div className="ai-mentor-header-actions">

          <div className="ai-mentor-status">
            <span className="ai-status-dot" aria-hidden="true" />
            <span>AI Simulation Mode</span>
          </div>

          {sessionStarted && (
            <button
              type="button"
              className="ai-mentor-clear"
              onClick={clearSession}
              title="Start a new conversation"
              aria-label="Clear conversation"
            >
              <RefreshCw size={15} />
              New conversation
            </button>
          )}

        </div>

      </div>

      {/* =========================================================
          SIMULATION NOTICE
      ========================================================= */}

      <div className="ai-simulation-notice" role="note">
        <Sparkles size={14} />
        <span>
          Responses are locally simulated. Connect the NEXUS AI backend
          to enable real AI guidance.
        </span>
      </div>

      {/* =========================================================
          MAIN CHAT AREA
      ========================================================= */}

      <div className="ai-mentor-body">

        {/* -------------------------------------------------
            MESSAGES
            ------------------------------------------------- */}
        <div className="ai-mentor-messages" aria-live="polite" aria-label="Conversation">

          {/* EMPTY STATE */}
          {!sessionStarted && (
            <div className="ai-mentor-empty">

              <div className="ai-empty-icon">
                <Brain size={36} />
              </div>

              <h2>Start a conversation</h2>

              <p>
                Your NEXUS AI Mentor is ready to help you think through
                your development path, projects, skills and career goals.
              </p>

              <button
                type="button"
                className="ai-start-button"
                onClick={startSession}
              >
                <Sparkles size={16} />
                Start session
              </button>

              <div className="ai-empty-prompts">
                <span>Or try a suggested prompt:</span>
                <div className="ai-suggested-chips">
                  {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="ai-chip"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* MESSAGES */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-message ai-message-${msg.role}`}
            >

              {msg.role === "assistant" && (
                <div className="ai-message-avatar" aria-hidden="true">
                  <Brain size={16} />
                </div>
              )}

              <div className={`ai-message-bubble ai-bubble-${msg.role}`}>
                {msg.content}
              </div>

            </div>
          ))}

          {/* THINKING STATE */}
          {isThinking && (
            <div className="ai-message ai-message-assistant">
              <div className="ai-message-avatar" aria-hidden="true">
                <Brain size={16} />
              </div>
              <div className="ai-thinking">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="ai-error-message">
              <AlertTriangle size={16} />
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* -------------------------------------------------
            SUGGESTED PROMPTS (when session active)
            ------------------------------------------------- */}
        {sessionStarted && messages.length < 3 && (
          <div className="ai-prompts-strip">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="ai-prompt-chip"
                onClick={() => handleSuggestedPrompt(prompt)}
                disabled={isThinking}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* -------------------------------------------------
            INPUT COMPOSER
            ------------------------------------------------- */}
        <div className="ai-mentor-composer">

          <textarea
            ref={inputRef}
            className="ai-composer-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              sessionStarted
                ? "Ask your AI Mentor anything about your development..."
                : "Start a session to begin..."
            }
            rows={1}
            disabled={!sessionStarted || isThinking}
            aria-label="Message to AI Mentor"
          />

          <button
            type="button"
            className="ai-send-button"
            onClick={sessionStarted ? handleSend : startSession}
            disabled={sessionStarted && (!input.trim() || isThinking)}
            aria-label={sessionStarted ? "Send message" : "Start session"}
          >
            {isThinking ? (
              <Loader2 size={19} className="ai-spinner" />
            ) : (
              <Send size={19} />
            )}
          </button>

        </div>

        <p className="ai-composer-hint">
          Press Enter to send · Shift+Enter for a new line
        </p>

      </div>

    </div>
  );
}

export default AIMentor;
