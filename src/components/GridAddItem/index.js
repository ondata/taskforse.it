import React from 'react'

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root} elevation={0}>
            <span className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        &nbsp;<br/>&nbsp;
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        &nbsp;
                    </Typography>
                </CardContent>
            </span>
        </Card>
    )
}
