export default theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        position: `relative`,
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
        textAlign: `center`,
        "&::after": {
            position: `absolute`,
            top: `100%`,
            left: `50%`,
            marginLeft: `-50%`,
            content: `''`,
            width: 0,
            height: 0,
            borderTop: `solid ${theme.spacing(8)}px ${theme.palette.primary.main}`,
            borderLeft: `solid 50vw transparent`,
            borderRight: `solid 50vw transparent`,
        },
    },
    title: {
        fontFamily: `"Montserrat", sans-serif`,
        fontWeight: 900,
        fontSize: `6.11rem`,
        textTransform: `uppercase`,
    },
    nav: {
        fontFamily: `"PT Serif", serif`,
        fontWeight: 400,
        fontSize: `1.33rem`,
        padding: `12px`,
    }
})
