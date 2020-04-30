import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import style from './style.js'
const useStyles = makeStyles(style)

export default ({
    primary = "",
    icon = "",
}) => {
    const classes = useStyles()
    return (
        <ListItem button>
            { !!icon && <ListItemIcon className={classes.icon}>{icon}</ListItemIcon> }
            <ListItemText primary={primary}></ListItemText>
        </ListItem>
    )
}
