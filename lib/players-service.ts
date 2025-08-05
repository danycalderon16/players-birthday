import { supabase } from './supabase'

export interface Player {
  id: number
  name: string
  team: string
  birthdate: string
  created_at?: string
}

export class PlayersService {
  static async getPlayersWithBirthdayToday(): Promise<Player[]> {
    const today = new Date()
    const month = today.getMonth() + 1 // getMonth() returns 0-11
    const day = today.getDate()
    
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('birthday_month', month)
      .eq('birthday_day', day)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching players:', error)
      return []
    }

    return data || []
  }

  static async getAllPlayers(): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching all players:', error)
      return []
    }

    return data || []
  }

  static async createPlayer(player: Omit<Player, 'id' | 'created_at'>): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .insert([player])
      .select()
      .single()

    if (error) {
      console.error('Error creating player:', error)
      return null
    }

    return data
  }

  static async updatePlayer(id: number, updates: Partial<Player>): Promise<Player | null> {
    const { data, error } = await supabase
      .from('players')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating player:', error)
      return null
    }

    return data
  }

  static async deletePlayer(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting player:', error)
      return false
    }

    return true
  }

  static async getRandomPlayer(): Promise<Player | null> {
    try {
      // Get total count of players
      const { count, error: countError } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })

      if (countError) {
        console.error('Error getting player count:', countError)
        return null
      }

      if (!count || count === 0) {
        console.log('No players found in the database')
        return null
      }

      // Generate random offset
      const randomOffset = Math.floor(Math.random() * count)

      // Fetch random player
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .range(randomOffset, randomOffset)
        .single()

      if (error) {
        console.error('Error fetching random player:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error:', error)
      return null
    }
  }

  static async getCurrentRandomPlayer(): Promise<Player | null> {
    try {
      const { data, error } = await supabase
        .from('random_player')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching current random player:', error)
        return null
      }

      if (!data) {
        console.log('No random player found in random_player table')
        return null
      }

      // Convert random_player data to Player format
      return {
        id: data.player_id,
        name: data.player_name,
        team: data.player_team,
        birthdate: data.player_birthday,
        created_at: data.updated_at
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      return null
    }
  }
} 