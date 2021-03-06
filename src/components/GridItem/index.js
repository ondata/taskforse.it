import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  image = '',
  title = '',
  subtitle = ''
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <CardMedia
          className={classes.cover}
          image={image}
          title={title}
        />
        <span className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              {title}
            </Typography>
            <Typography variant='subtitle1' color='secondary'>
              {subtitle}
            </Typography>
          </CardContent>
        </span>
      </Card>
    </Box>
  )
}

export default Index
