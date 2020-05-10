export default theme => ({
    item: {
        "&:first-child > .MuiBox-root": {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderTopLeftRadius: theme.shape.borderRadius,
        },
        "&:last-child > .MuiBox-root": {
            borderBottomRightRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
        },
    },
    bar: {
        width: `100%`,
        height: `1rem`,
    },
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    label: {
        marginLeft: theme.shape.borderRadius/2,
        fontFamily: `"Montserrat", sans-serif`,
        fontWeight: 500,
        fontSize: `1rem`,
        display: `flex`,
        alignItems: `center`,
    },
})
