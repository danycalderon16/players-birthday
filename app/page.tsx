"use client"

import { useState, useEffect } from "react"
import { Trophy, Calendar, Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayersService, type Player } from "@/lib/players-service"

export default function FootballBirthdays() {
  const [todayPlayers, setTodayPlayers] = useState<Player[]>([])
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [currentDate, setCurrentDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPlayers = async () => {
      const today = new Date()
      const todayFormatted = today.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      setCurrentDate(todayFormatted)

      try {
        // Obtener jugadores que cumplen años hoy desde Supabase
        const playersWithBirthdayToday = await PlayersService.getPlayersWithBirthdayToday()
        setTodayPlayers(playersWithBirthdayToday)
        
        // Obtener todos los jugadores
        const allPlayersData = await PlayersService.getAllPlayers()
        setAllPlayers(allPlayersData)
      } catch (error) {
        console.error('Error fetching players:', error)
        // Fallback a datos estáticos si hay error
        const fallbackPlayers: Player[] = [
          {
            id: 1,
            name: "Lionel Messi",
            team: "Inter Miami",
            birthdate: "1987-06-24",
          },
          {
            id: 2,
            name: "Sergio Ramos",
            team: "PSG",
            birthdate: "1986-03-30",
          },
          {
            id: 3,
            name: "Luka Modrić",
            team: "Real Madrid",
            birthdate: "1985-09-09",
          },
        ]
        setTodayPlayers(fallbackPlayers)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cumpleaños Futbolísticos
            </h1>
          </div>
          <p className="text-xl text-slate-300 capitalize">{currentDate}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-200">{todayPlayers.length} futbolistas celebran hoy</span>
          </div>
        </div>

        {/* Players Grid */}
        {todayPlayers.length > 0 ? (
          <div className="grid gap-6 md:gap-8">
            {todayPlayers.map((player, index) => (
              <Card
                key={player.id}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-6">
                    {/* Ranking Badge */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                            : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
                              : "bg-gradient-to-r from-amber-600 to-amber-800 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Player Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-colors duration-300 bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{player.name.charAt(0)}</span>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{player.name}</h3>
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4" />
                            <span>{player.team}</span>
                            <span className="text-slate-500">•</span>
                            <span>{new Date(player.birthdate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                          {new Date(player.birthdate).getFullYear()}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-slate-300">
                          <p className="font-medium">Cumpleaños: {new Date(player.birthdate).toLocaleDateString('es-ES')}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-yellow-400" />
                          <span className="text-slate-400 text-sm">¡Feliz cumpleaños!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No hay cumpleaños hoy</h3>
            <p className="text-slate-400">Ningún futbolista famoso cumple años en esta fecha</p>
          </div>
        )}

        {/* All Players Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Todos los Jugadores</h2>
            <p className="text-slate-300">Total: {allPlayers.length} jugadores</p>
          </div>
          
          {allPlayers.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allPlayers.map((player) => (
                <Card
                  key={player.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{player.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{player.name}</h3>
                        <p className="text-sm text-slate-300">{player.team}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(player.birthdate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400">No hay jugadores en la base de datos</p>
            </div>
          )}
        </div>

        {/* Test Button */}
        <div className="mt-8 text-center">
          <button
            onClick={async () => {
              setIsLoading(true)
              try {
                const testPlayer = {
                  name: "Test Player",
                  team: "Test Team",
                  birthdate: new Date().toISOString().split('T')[0] // Today's date
                }
                const result = await PlayersService.createPlayer(testPlayer)
                if (result) {
                  alert('Player created successfully!')
                  // Refresh the players list
                  const playersWithBirthdayToday = await PlayersService.getPlayersWithBirthdayToday()
                  setTodayPlayers(playersWithBirthdayToday)
                } else {
                  alert('Failed to create player')
                }
              } catch (error) {
                console.error('Error creating player:', error)
                alert('Error creating player')
              } finally {
                setIsLoading(false)
              }
            }}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Test: Add Player (Today\'s Birthday)'}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300">Ordenados por nombre</span>
          </div>
        </div>
      </div>
    </div>
  )
}
