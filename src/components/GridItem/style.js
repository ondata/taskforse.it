export default theme => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.grey[100],
        cursor: `pointer`,
    },
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
})
