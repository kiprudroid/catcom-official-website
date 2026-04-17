-- ─────────────────────────────────────────────────────────────────
-- MEDIA ITEMS — announcements, videos, social links
-- ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS media_items (
  id          SERIAL PRIMARY KEY,
  type        VARCHAR(20) NOT NULL
              CHECK (type IN ('youtube', 'tiktok', 'instagram', 'announcement')),
  title       VARCHAR(255) NOT NULL,
  url         VARCHAR(500),          -- null for announcements
  description TEXT,                  -- body for announcements, caption for others
  thumbnail   VARCHAR(500),          -- optional custom thumbnail
  published   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_type      ON media_items (type);
CREATE INDEX IF NOT EXISTS idx_media_published ON media_items (published);
CREATE INDEX IF NOT EXISTS idx_media_created   ON media_items (created_at DESC);