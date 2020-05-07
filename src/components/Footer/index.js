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
                    &copy; {(new Date()).getFullYear()} <a target="_blank" href="https://ondata.it/">Ondata - Associazione di promozione sociale</a>
                </Typography>
                <Typography className={classes.footer}>
                    All data are released under a <a target="_blank" href="https://creativecommons.org/licenses/by/4.0/deed.it">Creative Commons Attribution License</a> on <a target="_blank" href="https://docs.google.com/spreadsheets/d/15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8/edit?usp=sharing">Google Sheet</a>
                </Typography>
                <Typography className={classes.footer}>
                    Website developed and maintained with &hearts; by <a target="_blank" href="https://github.com/jenkin">jenkin</a> using <a target="_blank" href="https://nextjs.org/">NextJS</a> and <a target="_blank" href="https://material-ui.com/">Material-UI</a>
                </Typography>
                <Typography className={classes.footer}>
                    Brand name by <a target="_blank" href="https://www.linkedin.com/in/andreaborruso/">aborruso</a>, graphic design by <a target="_blank" href="https://www.linkedin.com/in/jacoposolmi/">japi</a>, database design by <a target="_blank" href="https://www.linkedin.com/in/lorenzo-perone-5aa8412/">lore</a> and <a target="_blank" href="https://www.linkedin.com/in/alicecorona/">alice</a>
                </Typography>
                <Typography className={classes.footer}>
                    Source code is available under a <a target="_blank" href="https://opensource.org/licenses/MIT">MIT License</a> on <a target="_blank" href="https://github.com/ondata/taskforse.it">Github</a>
                </Typography>
                <Typography className={classes.footer}>
                    People vector created by studiogstock - <a target="_blank" href="https://www.freepik.com/free-photos-vectors/people">freepik.com</a>
                </Typography>
            </Container>
        </footer>
    )
}
