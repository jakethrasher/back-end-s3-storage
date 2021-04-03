DROP TABLE IF EXISTS bassists;

-- INT or INTEGER or SERIAL -> 32bit number
-- BIGINT or BIGINTEGER or BIGSERIAL -> 64bit number
CREATE TABLE bassists (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  image_url TEXT NOT NULL,
  full_name TEXT NOT NULL,
  associated_acts TEXT NOT NULL
);
