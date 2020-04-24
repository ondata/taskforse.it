import React from 'react'

import {
    map,
} from 'lodash'

import {
    getResource,
    getResources,
} from '../../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({ data }) {
    return (
        <Container maxWidth="xs">
            <Box my={4}>
                <Typography variant="h1" style={{ fontWeight: "bold", textAlign: "center" }}>
                    {`${data["Titolo"]}`}
                </Typography>
            </Box>
        </Container>
    )
}

export async function getStaticProps({ params }) {
    return {
        props: {
            data: await getResource(params["Id"])
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getResources(),
            e => ({ params: { Id: e["Id"] } })
        ),
        fallback: false,
    }
}
