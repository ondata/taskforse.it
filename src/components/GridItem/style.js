export default theme => ({
  root: {
    borderWidth: theme.spacing(1),
    borderStyle: 'solid',
    borderColor: 'transparent'
  },
  card: {
    display: 'flex',
    backgroundColor: theme.palette.grey[100]
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto',
    whiteSpace: 'nowrap'
  },
  cover: {
    width: '33%',
    flexShrink: 0,
    flexGrow: 0
  }
})
