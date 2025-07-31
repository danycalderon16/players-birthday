-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON public.players;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.players
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON public.players
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public update access
CREATE POLICY "Allow public update access" ON public.players
  FOR UPDATE USING (true);

-- Create policy to allow public delete access
CREATE POLICY "Allow public delete access" ON public.players
  FOR DELETE USING (true); 