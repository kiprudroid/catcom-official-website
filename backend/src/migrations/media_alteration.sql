-- Alter media_items to include 'poster' in the type check constraint
ALTER TABLE media_items DROP CONSTRAINT media_items_type_check;

ALTER TABLE media_items
ADD CONSTRAINT media_items_type_check
CHECK (type IN ('youtube', 'tiktok', 'instagram', 'announcement', 'poster'));