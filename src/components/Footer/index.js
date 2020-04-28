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

export default () => {
    const classes = useStyles()
    return (
        <footer className={classes.root}>
            <Container maxWidth="md">
                <Typography className={classes.footer}>
                    &copy; 2020 Ondata - Associazione di promozione sociale
                </Typography>
                <Typography className={classes.footer}>
                    People vector created by studiogstock - <a target="_blank" href="https://www.freepik.com/free-photos-vectors/people">freepik.com</a>
                </Typography>
            </Container>
        </footer>
    )
}
