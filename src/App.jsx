import './App.css'
import { Container, Typography } from '@mui/material'
import Game from './components/Game'

function App() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h3" component="h1">
        Three cards
      </Typography>
      <Game />
    </Container>
  )
}

export default App
