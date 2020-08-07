import {
  Grid,
  ListItem,
  Typography,
  Tooltip,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import {
  getGFormUrl,
  GFORM_URL_ISSUE
} from '../../config.js'

import style from './style.js'
const useStyles = makeStyles(style)

const Index = ({
  keyText = '',
  valueText = ''
}) => {
  const classes = useStyles()
  return (
    <ListItem disableGutters className={classes.root}>
      <Grid container>
        <Grid item>
          <Typography variant='body1' color='inherit' className={classes.keyText}>
            <span>{keyText}</span>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography className={classes.valueText}>
            <Tooltip
              interactive arrow placement='left'
              open={valueText ? false : undefined}
              title={!valueText && <Box className={classes.tooltip}>Informazione non ancora disponibile.<br /><a target='_blank' href={getGFormUrl(GFORM_URL_ISSUE)} rel='noopener noreferrer'>+++ Aiutaci anche tu! +++</a></Box>}
            >
              <span className={!valueText ? classes.topsecret : ''}>{valueText || '????'}</span>
            </Tooltip>
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Index
