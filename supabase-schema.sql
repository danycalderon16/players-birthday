-- Crear la tabla de jugadores
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
  birthday_month INTEGER GENERATED ALWAYS AS (EXTRACT(MONTH FROM birthday)) STORED,
  birthday_day INTEGER GENERATED ALWAYS AS (EXTRACT(DAY FROM birthday)) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_players_birthday_month_day ON players(birthday_month, birthday_day);
CREATE INDEX idx_players_titles ON players(titles DESC);
CREATE INDEX idx_players_name ON players(name);

-- Insertar algunos datos de ejemplo
INSERT INTO players (name, age, team, country, position, titles, image, birthday) VALUES
  ('Lionel Messi', 37, 'Inter Miami', 'Argentina', 'RW', 44, '/placeholder.svg?height=80&width=80', '1987-06-24'),
  ('Sergio Ramos', 38, 'PSG', 'España', 'CB', 28, '/placeholder.svg?height=80&width=80', '1986-03-30'),
  ('Luka Modrić', 39, 'Real Madrid', 'Croacia', 'CM', 26, '/placeholder.svg?height=80&width=80', '1985-09-09'),
  ('Karim Benzema', 36, 'Al-Ittihad', 'Francia', 'ST', 25, '/placeholder.svg?height=80&width=80', '1987-12-19'),
  ('Marco Verratti', 31, 'Al-Arabi', 'Italia', 'CM', 15, '/placeholder.svg?height=80&width=80', '1992-11-05'),
  ('Cristiano Ronaldo', 39, 'Al Nassr', 'Portugal', 'ST', 35, '/placeholder.svg?height=80&width=80', '1985-02-05'),
  ('Neymar Jr', 32, 'Al Hilal', 'Brasil', 'LW', 20, '/placeholder.svg?height=80&width=80', '1992-02-05'),
  ('Robert Lewandowski', 35, 'Barcelona', 'Polonia', 'ST', 30, '/placeholder.svg?height=80&width=80', '1988-08-21');

-- Habilitar RLS (Row Level Security) si es necesario
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Allow public read access" ON players
  FOR SELECT USING (true);

-- Política para permitir inserción/actualización solo a usuarios autenticados (opcional)
-- CREATE POLICY "Allow authenticated users to insert" ON players
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated'); 