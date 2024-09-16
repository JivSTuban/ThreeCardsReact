import { Typography, Card as MUICard, Box } from '@mui/material'
import { motion } from 'framer-motion'

const MyCard = ({ card, isRevealed }) => {
  const getColor = (suit) => ['♥', '♦'].includes(suit) ? 'red' : 'black'

  return (
    <motion.div
      animate={{ rotateY: isRevealed ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      <MUICard sx={{ 
        width: 120, 
        height: 160, 
        borderRadius: '10px', 
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        position: 'relative',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
      }}>
        {isRevealed && card ? (
          <>
            <Box sx={{ 
              position: 'absolute', 
              top: 5, 
              left: 5, 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: getColor(card.suit) }}>
                {card.value}
              </Typography>
              <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, color: getColor(card.suit) }}>
                {card.suit}
              </Typography>
            </Box>
            <Typography sx={{ 
              fontSize: '4rem', 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: getColor(card.suit)
            }}>
              {card.suit}
            </Typography>
            <Box sx={{ 
              position: 'absolute', 
              bottom: 5, 
              right: 5, 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'rotate(180deg)',
            }}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold', color: getColor(card.suit) }}>
                {card.value}
              </Typography>
              <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, color: getColor(card.suit) }}>
                {card.suit}
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#1976d2', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography sx={{ color: 'white', fontSize: '2rem' }}>?</Typography>
          </Box>
        )}
      </MUICard>
    </motion.div>
  )
}

export default MyCard