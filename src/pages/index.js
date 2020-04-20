import React from 'react'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index() {
    return (
        <Container maxWidth="xs">
            <Box my={4}>
                <Typography variant="body1" style={{textAlign:"center"}}>
                    nel dubbio ...
                </Typography>
                <Typography variant="h1" style={{fontWeight:"bold",textAlign:"center"}}>
                    Task<br/>Forse
                </Typography>
                <Typography variant="body1" style={{textAlign:"right"}}>
                    by @ondatait
                </Typography>
            </Box>
        </Container>
    )
}
