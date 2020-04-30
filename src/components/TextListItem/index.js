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
    color = "inherit",
    variant = "body1",
    topsecret = false,
}) => {
    const classes = useStyles(topsecret)
    return (
        <ListItem disableGutters className={classes.root}>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant={variant} color={color} className={classes.keyText}>
                        <span className={topsecret ? classes.topsecret : ""}>{topsecret ? "XX/XX/XXXX" : keyText}</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.valueText}>
                        <span className={topsecret ? classes.topsecret : ""}>{topsecret ? "XX/XXXX" : valueText}</span> { topsecret && <AddBox size="small" /> }
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    )
}
