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
    image = "",
    title = "",
    subtitle = "",
}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root} elevation={0} component="a">
            <CardMedia
                className={classes.cover}
                image={image}
                title={title}
            />
            <span className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        {subtitle}
                    </Typography>
                </CardContent>
            </span>
        </Card>
    )
}
