import {
  Box,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  count = 0,
  title = ''
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography variant='h1' component='div' className={classes.count}>{count}</Typography>
      <Typography variant='body1' className={classes.title}>{title}</Typography>
    </Box>
  )
}

export default Index
