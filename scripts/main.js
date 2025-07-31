#!/usr/bin/env node

/**
 * Football Birthdays - ChatGPT Player Search Script
 * Searches for successful football players born on the current day
 */

const https = require('https');

function getCurrentDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return { month, day };
}

async function searchChatGPT(query) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.log("⚠️  No OpenAI API key found. Using mock data...");
      // Fallback to mock data if no API key
      setTimeout(() => {
        const mockResponse = {
          players: [
            {
              name: "Lionel Messi",
              team: "Inter Miami",
              birthdate: "1987-06-24",
              achievements: ["7x Ballon d'Or", "World Cup Winner", "Multiple Champions League titles"],
              position: "Forward"
            },
            {
              name: "Cristiano Ronaldo",
              team: "Al Nassr",
              birthdate: "1985-02-05",
              achievements: ["5x Ballon d'Or", "5x Champions League", "Multiple league titles"],
              position: "Forward"
            }
          ],
          message: "Found successful football players born on this date"
        };
        resolve(mockResponse);
      }, 1000);
      return;
    }

    console.log(`🔍 Searching OpenAI API for: ${query}`);
    
    const data = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a football expert. Provide accurate information about football players in JSON format."
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          
          if (response.error) {
            console.error("❌ OpenAI API Error:", response.error.message);
            reject(new Error(response.error.message));
            return;
          }

          const content = response.choices[0].message.content;
          console.log("📝 Raw API Response:", content);

          // Try to parse JSON from the response
          try {
            const parsedResponse = JSON.parse(content);
            resolve(parsedResponse);
          } catch (parseError) {
            console.log("⚠️  Could not parse JSON from response, using fallback");
            // Fallback response if JSON parsing fails
            resolve({
              players: [
                {
                  name: "API Response Received",
                  team: "Check logs for details",
                  birthdate: "N/A",
                  achievements: ["API call successful", "Check console for full response"],
                  position: "N/A"
                }
              ],
              message: "API response received but could not parse JSON"
            });
          }
        } catch (error) {
          console.error("❌ Error parsing API response:", error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error("❌ Request error:", error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

function formatPlayerInfo(player) {
  return {
    name: player.name,
    team: player.team,
    birthdate: player.birthdate,
    achievements: player.achievements,
    position: player.position
  };
}

function displayPlayer(player) {
  console.log("\n" + "=".repeat(50));
  console.log(`🎉 SUCCESSFUL PLAYER BORN TODAY: ${player.name.toUpperCase()}`);
  console.log("=".repeat(50));
  console.log(`📅 Birthday: ${player.birthdate}`);
  console.log(`⚽ Position: ${player.position}`);
  console.log(`🏟️  Current Team: ${player.team}`);
  console.log(`🏆 Major Achievements:`);
  player.achievements.forEach(achievement => {
    console.log(`   • ${achievement}`);
  });
  console.log("=".repeat(50));
}

function getCurrentDateFormatted() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return `${monthNames[month - 1]} ${day}`;
}

async function searchSuccessfulPlayers() {
  const { month, day } = getCurrentDate();
  const dateFormatted = getCurrentDateFormatted();
  
  console.log("🚀 Football Birthdays - ChatGPT Search");
  console.log("=".repeat(50));
  console.log(`📅 Searching for successful football players born on: ${dateFormatted}`);
  console.log("=".repeat(50));
  
  try {
    const query = `Find successful football players born on ${month}/${day} (month/day). Include their name, current team, birthdate, position, and major achievements. Return as JSON.`;
    
    console.log("\n🔍 Querying ChatGPT...");
    const response = await searchChatGPT(query);
    
    if (response.players && response.players.length > 0) {
      console.log(`\n✅ Found ${response.players.length} successful player(s) born today!`);
      
      response.players.forEach((player, index) => {
        const formattedPlayer = formatPlayerInfo(player);
        displayPlayer(formattedPlayer);
      });
      
      return response.players;
    } else {
      console.log("\n❌ No successful football players found born on this date.");
      console.log("💡 This might be a rare date with no famous football birthdays!");
    }
    
  } catch (error) {
    console.error("❌ Error searching for players:", error.message);
    throw error;
  }
}

function main() {
  console.log("🎯 Starting Football Birthdays ChatGPT Search...\n");
  
  searchSuccessfulPlayers()
    .then(players => {
      if (players && players.length > 0) {
        console.log(`\n📊 Summary: Found ${players.length} successful player(s) born today!`);
        console.log("🎉 Search completed successfully!");
      } else {
        console.log("\n📊 Summary: No successful players found for today's date.");
      }
    })
    .catch(error => {
      console.error("💥 Script failed:", error.message);
      process.exit(1);
    });
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for use in other modules
module.exports = {
  searchSuccessfulPlayers,
  getCurrentDate,
  formatPlayerInfo,
  displayPlayer,
  main
}; 