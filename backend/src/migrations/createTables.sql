CREATE TABLE daily_mass_readings (
  id SERIAL PRIMARY KEY,
  reading_date DATE NOT NULL UNIQUE,              -- The calendar date of the reading
  
  liturgical_day VARCHAR(255),                    -- e.g., "Monday of the 5th Week in Ordinary Time"
  liturgical_season VARCHAR(100),                 -- e.g., "Advent", "Lent", "Easter", "Ordinary Time"
  feast VARCHAR(255),                             -- e.g., "Feast of St. Francis of Assisi", nullable
  
  first_reading_reference VARCHAR(100),           -- e.g., "Isaiah 58:1-9"
  first_reading_text TEXT,                        -- The scripture passage
  
  responsorial_psalm_reference VARCHAR(100),      -- e.g., "Psalm 51:3-4, 5-6ab, 18-19"
  responsorial_psalm_response TEXT,               -- e.g., "Create in me a clean heart, O God."
  responsorial_psalm_text TEXT,                   -- Full psalm text
  
  second_reading_reference VARCHAR(100),          -- Optional (e.g., Sundays/Feasts)
  second_reading_text TEXT,
  
  gospel_acclamation TEXT,                        -- e.g., "Alleluia, alleluia. I am the light of the world..."
  gospel_reference VARCHAR(100),                  -- e.g., "Matthew 5:13-16"
  gospel_text TEXT,                               -- The full gospel text
  
  reflection TEXT,                                --  reflection or homily 
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_date DATE  NOT NULL UNIQUE ,
    activity VARCHAR(100) UNIQUE NOT NULL,
    venue VARCHAR(100) NOT NULL
);

CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
create table join_scc (
    user_id SERIAL PRIMARY KEY,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone_number varchar(15),
    email varchar(100) not null unique,
    year_joined int,
    gender gender_type, 
    scc_name varchar(100) not null
);

create table scc_execut (
    exec_id SERIAL PRIMARY KEY,
    exec_first_name varchar(50) not null,
    exec_last_name varchar(50) not null,
    position varchar(50) not null,
    phone_number varchar(15),
    exec_image varchar(255)
);


CREATE TABLE groups (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    college VARCHAR(100) NOT NULL,
    group_joined VARCHAR(50) NOT NULL
);

CREATE TABLE executive_leaders (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    post_title VARCHAR(100) NOT NULL,
    exec_description VARCHAR(255),
    image_url VARCHAR(255)
);