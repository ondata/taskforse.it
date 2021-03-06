import clsx from 'clsx'

import {
  map,
  sumBy,
  filter
} from 'lodash'

import {
  Grid,
  ListItem,
  Typography,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  items = []
}) => {
  const classes = useStyles()
  const tot = sumBy(items, 'value')
  return (
    <ListItem disableGutters className={classes.root}>
      <Grid container>
        {
          map(
            filter(
              items,
              item => item.value
            ),
            ({ value, label, color }, index) => (
              <Grid item key={index} style={{ width: `${value / tot * 100}%` }} className={classes.item}>
                <Box className={clsx(classes.bar, classes[color])} />
                <Typography variant='body2' className={classes.label}>
                  {`${label} ${value}`}
                </Typography>
              </Grid>
            )
          )
        }
      </Grid>
    </ListItem>
  )
}

export default Index
