import React from 'react'

import {
    Grid,
    ListItem,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
    keyText = "",
    valueText = "",
}) => {
    const classes = useStyles()
    return (
        <ListItem disableGutters>
            <Grid container justify="space-between">
                <Grid item><Typography className={classes.keyText}>{keyText}</Typography></Grid>
                <Grid item><Typography className={classes.valueText}>{valueText}</Typography></Grid>
            </Grid>
        </ListItem>
    )
}
