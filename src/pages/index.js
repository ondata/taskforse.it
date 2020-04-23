import React from 'react'
import axios from 'axios'

import Link from 'next/link'

import {
    map,
} from 'lodash'

import {
    getGSheetUrl,
    normalizeGSheetJSON,
    GSHEET_SHEET_TASKFORSES,
} from '../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({ data }) {
    return (
        <Container maxWidth="xs">
            <Box my={4}>
                <Typography variant="body1" style={{ textAlign: "center" }}>
                    nel dubbio ...
                </Typography>
                <Typography variant="h1" style={{ fontWeight: "bold", textAlign: "center" }}>
                    Task<br />Forse
                </Typography>
                <Typography variant="body1" style={{ textAlign: "right" }}>
                    by @ondatait
                </Typography>
            </Box>
            <ul>
            {
                map(data, d => (
                    <li key={d["Id"]}>
                        <Link href="/task-forses/[Id]" as={`/task-forses/${d["Id"]}`}><a>{d["Nome"]}</a></Link>
                    </li>
                ))
            }
            </ul>
        </Container>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            data: normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES))),
        },
    }
}
