import React from 'react'
import axios from 'axios'

import {
    map,
    find
} from 'lodash'

import {
    getGSheetUrl,
    normalizeGSheetJSON,
    GSHEET_SHEET_RESOURCES,
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
            data: find(
                normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_RESOURCES))),
                e => e["Id"] === params["Id"]
            )
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_RESOURCES))),
            e => ({ params: { Id: e["Id"] } })
        ),
        fallback: false,
    }
}
