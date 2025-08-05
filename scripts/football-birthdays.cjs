const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function updateRandomPlayer() {
  try {
    // Get total count of players
    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })

    if (countError || !count || count === 0) {
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
      return null
    }

    // Delete any existing records in random_player table
    const { error: deleteError } = await supabase
      .from('random_player')
      .delete()
      .neq('id', 0)

    if (deleteError) {
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
      return null
    }

    return insertedPlayer

  } catch (error) {
    return null
  }
}

async function main() {
  const randomPlayer = await updateRandomPlayer()
  
  if (randomPlayer) {
    console.log(`✅ Random player updated: ${randomPlayer.player_name} (${randomPlayer.player_team})`)
  } else {
    console.log('❌ Failed to update random player')
    process.exit(1)
  }
}

main()