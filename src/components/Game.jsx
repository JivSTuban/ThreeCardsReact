import { useState, useEffect } from 'react'
import { Box, Button, Typography, Grid } from '@mui/material'
import MyCard from './MyCard'

const Game = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', cards: [null, null, null], score: 0, gamesWon: 0 },
    { id: 2, name: 'Player 2', cards: [null, null, null], score: 0, gamesWon: 0 },
  ])
  const [result, setResult] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [revealedCards, setRevealedCards] = useState(0)
  const [showScores, setShowScores] = useState(false)

  const cardValues = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 }

  const dealCards = () => {
    const deck = Object.keys(cardValues).flatMap(value => ['♠', '♥', '♦', '♣'].map(suit => ({ value, suit })))
    const shuffled = deck.sort(() => Math.random() - 0.5)
    
    const newPlayers = players.map(player => {
      const cards = shuffled.splice(0, 3)
      const score = cards.reduce((sum, card) => sum + cardValues[card.value], 0)
      return { ...player, cards, score }
    })

    setPlayers(newPlayers)
    setGameStarted(true)
    setRevealedCards(0)
    setShowScores(false)
    setResult('')
    revealCards()
  }

  const revealCards = () => {
    let currentCard = 0
    const interval = setInterval(() => {
      if (currentCard < 6) {
        setRevealedCards(prev => prev + 1)
        currentCard++
      } else {
        clearInterval(interval)
        setShowScores(true)
      }
    }, 500)
  }

  useEffect(() => {
    if (showScores) {
      determineWinner(players)
    }
  }, [showScores])

  const determineWinner = (players) => {
    if (players[0].score > players[1].score) {
      setResult(`${players[0].name} wins!`)
      updateGamesWon(0)
    } else if (players[1].score > players[0].score) {
      setResult(`${players[1].name} wins!`)
      updateGamesWon(1)
    } else {
      setResult("It's a tie!")
    }
  }

  const updateGamesWon = (winnerIndex) => {
    setPlayers(prevPlayers => 
      prevPlayers.map((player, index) => 
        index === winnerIndex 
          ? { ...player, gamesWon: player.gamesWon + 1 }
          : player
      )
    )
  }

  const playAgain = () => {
    dealCards()
  }

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Grid container spacing={4} justifyContent="center">
        {players.map((player, playerIndex) => (
          <Grid item key={player.id} xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {player.name}<br/> 
              {showScores && `Score: ${player.score}`}<br/>
              Wins: {player.gamesWon}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              mb: 2,
              flexWrap: 'wrap',
            }}>
              {player.cards.map((card, index) => (
                <Box key={index} sx={{ m: 1 }}>
                  <MyCard 
                    card={card} 
                    isRevealed={gameStarted && revealedCards > playerIndex * 3 + index}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
      {showScores && result && (
        <Typography variant="h6" gutterBottom>
          {result}
        </Typography>
      )}
      <Button variant="contained" onClick={gameStarted ? playAgain : dealCards}>
        {gameStarted ? 'Play Again' : 'Start Game'}
      </Button>
    </Box>
  )
}

export default Game