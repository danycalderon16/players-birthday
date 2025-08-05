-- Borrar la tabla existente si existe
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS random_player CASCADE;

-- Crear la tabla de jugadores con solo los campos necesarios
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  team VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  position VARCHAR(10) NOT NULL,
  titles INTEGER DEFAULT 0,
  image TEXT,
  birthday DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear la tabla para el jugador aleatorio (solo un registro)
CREATE TABLE random_player (
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  player_name VARCHAR(255) NOT NULL,
  player_team VARCHAR(255) NOT NULL,
  player_birthday DATE NOT NULL,
  player_country VARCHAR(255) NOT NULL,
  player_position VARCHAR(10) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_players_birthday ON players(birthday);
CREATE INDEX idx_players_name ON players(name);

-- Habilitar RLS (Row Level Security)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE random_player ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Allow public read access" ON players
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON random_player
  FOR SELECT USING (true);

-- Política para permitir inserción pública
CREATE POLICY "Allow public insert" ON players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert" ON random_player
  FOR INSERT WITH CHECK (true);

-- Política para permitir actualización y eliminación en random_player
CREATE POLICY "Allow public update" ON random_player
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON random_player
  FOR DELETE USING (true); 