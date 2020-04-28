import React from 'react'

import Link from 'next/link'

import {
    Container,
    Grid,
    Typography,
    IconButton,
} from '@material-ui/core'

import {
    ArrowBackIos,
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
    suptitle = "",
    title = "",
    subtitle = "",
    href = "",
    as = "",
}) => {
    const classes = useStyles()
    return (
        <header className={classes.root}>
            {
                !!href && !!as
                ?
                <Container maxWidth="sm">
                    <Grid container alignItems="baseline">
                        <Grid item xs style={{textAlign:"right"}}>
                            <Link href={href} as={as}>
                                <IconButton color="inherit">
                                    <ArrowBackIos />
                                </IconButton>
                            </Link>
                        </Grid>
                        <Grid item xs style={{textAlign:"left"}}>
                            <Typography className={classes.nav}>
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                :
                <Container maxWidth="sm">
                    <Typography className={classes.suptitle}>
                        {suptitle}
                    </Typography>
                    <Typography variant="h1" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>
                        {subtitle}
                    </Typography>
                </Container>
            }
        </header>
    )
}
