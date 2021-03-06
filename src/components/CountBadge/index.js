import { Badge } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  count = 0,
  color = 'default',
  children
}) => {
  const classes = useStyles()
  return (
    <Badge badgeContent={count} color={color} className={classes.root}>{children}</Badge>
  )
}

export default Index
