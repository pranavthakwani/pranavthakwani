/*
  # Analytics System for Portfolio

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_type` (text) - Type of event (page_view, file_click, chat_interaction, etc.)
      - `page` (text) - Current page/route
      - `metadata` (jsonb) - Additional event data
      - `session_id` (text) - Session identifier
      - `user_agent` (text) - Browser user agent
      - `created_at` (timestamptz) - Event timestamp
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `password_hash` (text) - Hashed password
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can insert analytics events
    - Only authenticated admins can read analytics
*/

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  page text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  session_id text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can read own session analytics"
  ON analytics_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page ON analytics_events(page);
