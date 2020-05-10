export default theme => ({
    root: {
        textAlign: `center`,
        backgroundColor: theme.palette.grey[100],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
    },
    count: {
        fontSize: `4.88rem`,
        fontWeight: 900,
        color: theme.palette.secondary.main,
    },
})
