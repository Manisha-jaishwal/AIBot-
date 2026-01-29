import { Box, Typography, Stack, Grid } from '@mui/material'
import icon from '../../asset/BotIcon.png'
import Card from './Card'

export default function InitialChat({ generateResponse }) {

  const initialData = [
    { heading: 'Hi, what is the weather', subtext: 'Get immediate AI generated response' },
    { heading: 'Hi, what is my location', subtext: 'Get immediate AI generated response' },
    { heading: 'Hi, what is the temperature', subtext: 'Get immediate AI generated response' },
    { heading: 'Hi, how are you', subtext: 'Get immediate AI generated response' },
  ]

  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="100%"
      px={2}
    >
      <Stack alignItems="center" spacing={2} mb={4}>
        <Typography fontSize={{ xs: 22, md: 32 }} fontWeight={700}>
          How Can I Help You Today?
        </Typography>

        <Box
          component="img"
          src={icon}
          height={60}
          width={60}
          borderRadius="50%"
          boxShadow={3}
        />
      </Stack>

      <Box width="100%" maxWidth="900px">
        <Grid container spacing={2}>
          {initialData.map(item => (
            <Grid item xs={12} sm={6} key={item.heading}>
              <Card
                heading={item.heading}
                subtext={item.subtext}
                handleClick={generateResponse}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}
