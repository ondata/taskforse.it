export default theme => ({
    root: {
        borderWidth: theme.spacing(1),
        borderStyle: `solid`,
        borderColor: "transparent",
        height: `100%`,
        '& *': {
            height: `100%`,
        },
    },
    card: {
        display: `flex`,
        backgroundColor: `transparent`,
    },
    cover: {
        width: `100%`,
        flexShrink: 0,
        flexGrow: 0,
    },
})
