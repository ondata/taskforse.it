import {
  Card,
  CardMedia,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  image = '',
  title = ''
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={0} component='a'>
        <CardMedia
          className={classes.cover}
          image={image}
          title={title}
        />
      </Card>
    </Box>
  )
}

export default Index
