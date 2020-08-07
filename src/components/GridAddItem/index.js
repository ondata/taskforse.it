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
  topsecret = false
}) => {
  const classes = useStyles(topsecret)
  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={0}>
        {
          topsecret &&
            <CardMedia
              className={classes.cover}
              image='/unknown-woman.png'
              title='unknown'
            />
        }
        <span className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              <span className={topsecret ? classes.topsecret : ''}>{topsecret ? 'XXXXXXX' : <>&nbsp;</>}</span>
              <br />
              <span className={topsecret ? classes.topsecret : ''}>{topsecret ? 'XXXXXXXXX' : <>&nbsp;</>}</span>
            </Typography>
            <Typography variant='subtitle1' color='secondary'>
              <span className={topsecret ? classes.topsecret : ''}>{topsecret ? 'XXXXXX' : <>&nbsp;</>}</span>
            </Typography>
          </CardContent>
        </span>
      </Card>
    </Box>
  )
}

export default Index
