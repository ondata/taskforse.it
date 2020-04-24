export default theme => ({
    root: {
        backgroundColor: "#fd1d59",
        color: "white",
        position: "relative",
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
        textAlign: "center",
        "&::after": {
            position: "absolute",
            top: "100%",
            left: "50%",
            marginLeft: "-50%",
            content: "''",
            width: 0,
            height: 0,
            borderTop: `solid ${theme.spacing(8)}px #fd1d59`,
            borderLeft: "solid 50vw transparent",
            borderRight: "solid 50vw transparent",
        },
    },
    title: {
        fontWeight: "bold",
    },
})
