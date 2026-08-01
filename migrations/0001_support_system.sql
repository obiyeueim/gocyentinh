PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 80),
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expiry ON sessions(expires_at);

CREATE TABLE support_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  display_name TEXT NOT NULL CHECK (length(display_name) BETWEEN 2 AND 80),
  contact_method TEXT NOT NULL CHECK (contact_method IN ('phone', 'email', 'zalo', 'other')),
  contact_value TEXT NOT NULL CHECK (length(contact_value) BETWEEN 5 AND 160),
  subject TEXT NOT NULL CHECK (length(subject) BETWEEN 3 AND 120),
  description TEXT NOT NULL CHECK (length(description) BETWEEN 10 AND 3000),
  urgency TEXT NOT NULL DEFAULT 'soon' CHECK (urgency IN ('routine', 'soon', 'urgent')),
  immediate_risk INTEGER NOT NULL DEFAULT 0 CHECK (immediate_risk IN (0, 1)),
  stress_depression INTEGER CHECK (stress_depression BETWEEN 0 AND 42),
  stress_anxiety INTEGER CHECK (stress_anxiety BETWEEN 0 AND 42),
  stress_stress INTEGER CHECK (stress_stress BETWEEN 0 AND 42),
  stress_summary TEXT CHECK (length(stress_summary) <= 160),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacting', 'in_progress', 'resolved')),
  assigned_to TEXT REFERENCES users(id) ON DELETE SET NULL,
  private_notes TEXT NOT NULL DEFAULT '' CHECK (length(private_notes) <= 4000),
  consented_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_support_priority ON support_requests(immediate_risk DESC, urgency, status, created_at);
CREATE INDEX idx_support_user ON support_requests(user_id, created_at DESC);

CREATE TABLE support_messages (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL REFERENCES support_requests(id) ON DELETE CASCADE,
  author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  author_role TEXT NOT NULL CHECK (author_role IN ('user', 'admin')),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 1 AND 3000),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_support_messages_request ON support_messages(request_id, created_at);

CREATE TABLE auth_attempts (
  attempt_key TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  window_started_at TEXT NOT NULL,
  blocked_until TEXT
);
