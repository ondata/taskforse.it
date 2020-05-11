export default theme => ({
    root: {
        paddingTop: 0,
    },
    item: {
        "&:first-child > .MuiBox-root": {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderTopLeftRadius: theme.shape.borderRadius,
        },
        "&:last-child > .MuiBox-root": {
            borderBottomRightRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
        },
        "&:first-child > .MuiTypography-root": {
            textAlign: `left`,
            paddingLeft: theme.shape.borderRadius/2,
        },
        "&:last-child > .MuiTypography-root": {
            textAlign: `right`,
            paddingRight: theme.shape.borderRadius/2,
        },
    },
    bar: {
        width: `100%`,
        height: `1rem`,
        marginBottom: theme.spacing(.5),
    },
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    label: {
        fontFamily: `"Montserrat", sans-serif`,
        fontWeight: 500,
        fontSize: `1rem`,
        whiteSpace: `nowrap`,
    },
})
