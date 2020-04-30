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
    topsecret = false,
}) => {
    const classes = useStyles(topsecret)
    return (
        <Card className={classes.root} elevation={0}>
            {
                topsecret
                &&
                <CardMedia
                    className={classes.cover}
                    image="/unknown-woman.png"
                    title="unknown"
                />
            }
            <span className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        <span className={topsecret ? classes.topsecret : ""}>{topsecret ? "XXXXXXX" : <>&nbsp;</>}</span>
                        <br/>
                        <span className={topsecret ? classes.topsecret : ""}>{topsecret ? "XXXXXXXXX" : <>&nbsp;</>}</span>
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                        <span className={topsecret ? classes.topsecret : ""}>{topsecret ? "XXXXXX" : <>&nbsp;</>}</span>
                    </Typography>
                </CardContent>
            </span>
        </Card>
    )
}
