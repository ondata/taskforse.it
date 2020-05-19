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
                <a target="_blank" href="https://ondata.it/">
                    <img src="/ondata-logo.png" alt="Logo di Ondata" title="Logo di Ondata" className={classes.logo} />
                </a>
                <Typography className={classes.footer}>
                    &copy; {(new Date()).getFullYear()} <a target="_blank" href="https://ondata.it/">onData - Associazione di promozione sociale</a>
                </Typography>
                <Typography className={classes.footer}>
                    All data are released under a <a target="_blank" href="https://creativecommons.org/licenses/by/4.0/deed.it">Creative Commons Attribution License</a> on <a target="_blank" href="https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit?usp=sharing">Google Sheet</a>
                </Typography>
                <Typography className={classes.footer}>
                    Source code is available under a <a target="_blank" href="https://opensource.org/licenses/MIT">MIT License</a> on <a target="_blank" href="https://github.com/ondata/taskforse.it">Github</a>
                </Typography>
                <Typography className={classes.footer}>
                    This website <strong>doesn't set</strong> any first- or third-party cookie for profiling or marketing pourposes.
                </Typography>
            </Container>
        </footer>
    )
}
