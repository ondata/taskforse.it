export default theme => ({
    root: topsecret => ({
        '&>*': {
            opacity: topsecret ? 0.1 : 1,
        },
    }),
    keyText: {
        fontFamily: `"Montserrat", sans-serif`,
        fontWeight: 600,
        fontSize: `1rem`,
    },
    valueText: {
        fontFamily: `"Montserrat", sans-serif`,
        fontWeight: 500,
        fontSize: `1rem`,
        display: `flex`,
        alignItems: `center`,
    },
    topsecret: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.grey[900],
        paddingLeft: theme.spacing(.5),
        paddingRight: theme.spacing(.5),
    },
})
