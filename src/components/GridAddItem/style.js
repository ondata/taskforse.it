export default theme => ({
    root: topsecret => ({
        borderWidth: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        borderStyle: `dashed`,
        borderColor: topsecret ? "transparent" : theme.palette.grey[400],
        '&:hover': {
            borderColor: theme.palette.grey[400],
        },
    }),
    card: topsecret => ({
        display: 'flex',
        backgroundColor: theme.palette.grey[100],
        cursor: `pointer`,
        position: `relative`,
        '&>*': {
            opacity: 0.1,
        },
        '&::after': {
            content: topsecret ? `""` : `"+"`,
            position: "absolute",
            display: "block",
            width: "100%",
            textAlign: "center",
            color: theme.palette.grey[400],
            fontSize: "6rem",
            fontWeight: "bold",
        },
        '&:hover': {
            borderColor: theme.palette.grey[400],
            '&::after': {
                content: `"+"`,
            },
        },
    }),
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    topsecret: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.grey[900],
        paddingLeft: theme.spacing(.5),
        paddingRight: theme.spacing(.5),
    },
})
