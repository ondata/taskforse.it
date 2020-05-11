import {
    Grid,
    ListItem,
    Typography,
} from '@material-ui/core'

import {
    AddBox,
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
    keyText = "",
    valueText = "",
}) => {
    const classes = useStyles()
    return (
        <ListItem disableGutters className={classes.root}>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="body1" color="inherit" className={classes.keyText}>
                        <span className={!keyText ? classes.topsecret : ""}>{keyText || "??????????????"}</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.valueText}>
                        <span className={!valueText ? classes.topsecret : ""}>{valueText || "??????????????"}</span>
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}
