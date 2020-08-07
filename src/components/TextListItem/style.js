export default theme => ({
  keyText: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    fontSize: '1rem'
  },
  valueText: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    fontSize: '1rem',
    textAlign: 'right',
    paddingLeft: theme.spacing(2)
  },
  topsecret: {
    cursor: 'help',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[900],
    paddingRight: theme.spacing(0.5),
    marginLeft: 'auto'
  },
  tooltip: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: '.85rem',
    lineHeight: '1.5',
    '& a, & a:hover': {
      textDecoration: 'underline !important'
    }
  }
})
