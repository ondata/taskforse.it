import React from 'react'
import axios from 'axios'

import Link from 'next/link'

import {
    map,
    find,
    filter,
} from 'lodash'

import {
    getGSheetUrl,
    normalizeGSheetJSON,
    GSHEET_SHEET_TASKFORSES,
    GSHEET_SHEET_MEMBERS,
    GSHEET_SHEET_RESOURCES,
} from '../../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({ taskForse, members, resources }) {
    return (
        <Container maxWidth="xs">
            <Box my={4}>
                <Typography variant="h1" style={{ fontWeight: "bold", textAlign: "center" }}>
                    {`${taskForse["Nome"]}`}
                </Typography>
            </Box>
            <Box my={4}>
                <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                    Membri
                </Typography>
                <ul>
                    {
                        map(members, d => (
                            <li key={d["Id"]}>
                                <Link href="/members/[Id]" as={`/members/${d["Id"]}`}><a>{`${d["Nome"]} ${d["Cognome"]}`}</a></Link>
                            </li>
                        ))
                    }
                </ul>
            </Box>
            <Box my={4}>
                <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                    Risorse
                </Typography>
                <ul>
                    {
                        map(resources, d => (
                            <li key={d["Id"]}>
                                <Link href="/resources/[Id]" as={`/resources/${d["Id"]}`}><a>{d["Titolo"]}</a></Link>
                            </li>
                        ))
                    }
                </ul>
            </Box>
        </Container>
    )
}

export async function getStaticProps({ params }) {

    const taskForse = find(
        normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES))),
        e => e["Id"] === params["Id"]
    )

    const members = filter(
        normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_MEMBERS))),
        e => e["Task forse"] === params["Id"]
    )

    const resources = filter(
        normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_RESOURCES))),
        e => e["Task forse"] === params["Id"]
    )

    return {
        props: {
            taskForse,
            members,
            resources,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            normalizeGSheetJSON(await axios.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES))),
            e => ({ params: { Id: e["Id"] } })
        ),
        fallback: false,
    }
}
