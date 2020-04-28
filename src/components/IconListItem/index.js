import React from 'react'

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
    secondary = "",
    icon = "",
}) => {
    const classes = useStyles()
    return (
        <ListItem button>
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={primary} secondary={secondary}></ListItemText>
        </ListItem>
    )
}
