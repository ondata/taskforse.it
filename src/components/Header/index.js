import Link from 'next/link'

import {
    Container,
    Grid,
    Typography,
    IconButton,
    Divider,
    Button,
} from '@material-ui/core'

import {
    ArrowBackIos,
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

import {
    GFORM_URL_ISSUE,
    getGFormUrl,
} from '../../config'

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
            <Container maxWidth="sm">

                <Grid container justify="center">
                    <Grid item xs>
                        <Link as="/" href="/">
                            <Button color="inherit">Home</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Link as="/about" href="/about">
                            <Button color="inherit">About</Button>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Button color="inherit" href={getGFormUrl(GFORM_URL_ISSUE)} target="_blank">
                            Contribuisci!
                        </Button>
                    </Grid>
                </Grid>

                <Divider />

                {
                    !!href && !!as
                    ?
                    <Grid container alignItems="center">
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
                    :
                    <>
                        <Typography className={classes.suptitle}>
                            {suptitle}
                        </Typography>
                        <Typography variant="h1" className={classes.title}>
                            {title}
                        </Typography>
                        <Typography className={classes.subtitle}>
                            {subtitle}
                        </Typography>
                    </>
                }
                
            </Container>
        </header>
    )
}
