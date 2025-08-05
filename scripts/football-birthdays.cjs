const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const updateRandomPlayer = async () => {
  try {
    // Get total count of players
    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })

    console.log({count})

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
    const { data: randomPlayer, error: fetchError } = await supabase
      .from('players')
      .select('*')
      .range(randomOffset, randomOffset)
      .single()

    if (fetchError) {
      console.error('Error fetching random player:', fetchError)
      return null
    }

    // Delete any existing records in random_player table
    const { error: deleteError } = await supabase
      .from('random_player')
      .delete()
      .neq('id', 0) // Delete all records

    if (deleteError) {
      console.error('Error deleting existing random player:', deleteError)
      return null
    }

    // Insert the new random player
    const { data: insertedPlayer, error: insertError } = await supabase
      .from('random_player')
      .insert([{
        player_id: randomPlayer.id,
        player_name: randomPlayer.name,
        player_team: randomPlayer.team,
        player_birthday: randomPlayer.birthday,
        player_country: randomPlayer.country,
        player_position: randomPlayer.position
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting random player:', insertError)
      return null
    }

    return insertedPlayer
  } catch (error) {
    console.error('Unexpected error:', error)
    return null
  }
}

const main = async () => {
  console.log('🎯 Actualizando jugador aleatorio en la tabla random_player...')
  
  const randomPlayer = await updateRandomPlayer()
  
  if (randomPlayer) {
    console.log('✅ Jugador aleatorio actualizado exitosamente:')
    console.log(`📝 Nombre: ${randomPlayer.player_name}`)
    console.log(`🏟️  Equipo: ${randomPlayer.player_team}`)
    console.log(`🎂 Fecha de nacimiento: ${randomPlayer.player_birthday}`)
    console.log(`🌍 País: ${randomPlayer.player_country}`)
    console.log(`⚽ Posición: ${randomPlayer.player_position}`)
    console.log(`🆔 ID del jugador: ${randomPlayer.player_id}`)
    console.log(`🕒 Actualizado: ${randomPlayer.updated_at}`)
  } else {
    console.log('❌ No se pudo actualizar el jugador aleatorio')
    process.exit(1)
  }
}

main()