export default theme => ({
  icon: {
    minWidth: 'auto',
    marginRight: theme.spacing(3),
    border: `2px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    borderRadius: theme.spacing(0.5)
  },
  topsecret: {
    '&>*': {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.grey[900],
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  }
})
