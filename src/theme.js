import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
export default createMuiTheme({
    palette: {
        primary: {
            main: `#fd1d59`,
        },
        secondary: {
            main: `#1d7dfe`,
        },
        grey: {
            100: `#f6f5f5`,
            900: `#312f28`,
        },
    },
    shape: {
        borderRadius: 14,
    },
    typography: {
        fontFamily: `"PT Serif", serif`,
        h1: { // h1
            fontFamily: `"Montserrat", sans-serif`,
            fontWeight: 700,
            fontSize: `2.44rem`,
            textAlign: `center`,
        },
        h2: { // h2
            fontFamily: `"Montserrat", sans-serif`,
            fontWeight: 700,
            fontSize: `1.33rem`,
        },
        subtitle1: { // subtitle
            fontFamily: `"PT Serif", serif`,
            fontWeight: 400,
            fontSize: `1.11rem`,
            fontStyle: `italic`,
        },
        body1: { // body
            fontFamily: `"PT Serif", serif`,
            fontWeight: 400,
            fontSize: `1rem`,
        },
    },
    overrides: {
        MuiTypography: {
            gutterBottom: {
                marginBottom: `1rem`,
            },
        },
    },
})
