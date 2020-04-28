export default theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.grey[100],
        cursor: `pointer`,
        position: `relative`,
        border: `${theme.spacing(1)}px dashed ${theme.palette.grey[400]}`,
        '&::after': {
            content: `"+"`,
            position: "absolute",
            display: "block",
            width: "100%",
            textAlign: "center",
            color: theme.palette.grey[400],
            fontSize: "6rem",
            fontWeight: "bold",
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
})
