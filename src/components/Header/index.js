import React from 'react'

import {
    Container,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import {
    CONTAINER_MAXWIDTH,
} from '../../config'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
    suptitle = "",
    title = "",
    subtitle = "",
}) => {
    const classes = useStyles()
    return (
        <header className={classes.root}>
            <Container maxWidth={CONTAINER_MAXWIDTH}>
                <Typography variant="subtitle1" className={classes.suptitle}>
                    {suptitle}
                </Typography>
                <Typography variant="h1" className={classes.title}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {subtitle}
                </Typography>
            </Container>
        </header>
    )
}
