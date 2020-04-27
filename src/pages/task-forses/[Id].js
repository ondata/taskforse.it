import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import {
    map,
    isEmpty,
} from 'lodash'

import {
    getTaskForse,
    getTaskForses,
    getMembersByTaskForse,
    getResourcesByTaskForse,
} from '../../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({
    taskForse = {},
    members = [],
    resources = [],
}) {

    const router = useRouter()

    if (router.isFallback) {

        return (
            <Container maxWidth="xs">
                <Typography>Loading...</Typography>
            </Container>
        )

    } else {

        return (
            <Container maxWidth="xs">
                <Box my={4}>
                    <Typography variant="h1" style={{ fontWeight: "bold", textAlign: "center" }}>
                        {`${taskForse["Nome"] || "N/A"}`}
                    </Typography>
                </Box>
                <Box my={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                        Membri
                    </Typography>
                    {
                        isEmpty(members)
                        ?
                        <Typography>N/A</Typography>
                        :
                        <ul>
                        {   
                            map(members, d => (
                                <li key={d["Id"]}>
                                    <Link href="/members/[Id]" as={`/members/${d["Id"]}`}><a>{`${d["Nome"]} ${d["Cognome"]}`}</a></Link>
                                </li>
                            ))
                        }
                        </ul>
                    }
                </Box>
                <Box my={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                        Risorse
                    </Typography>
                    {
                        isEmpty(resources)
                        ?
                        <Typography>N/A</Typography>
                        :
                        <ul>
                        {
                            map(resources, d => (
                                <li key={d["Id"]}>
                                    <Link href="/resources/[Id]" as={`/resources/${d["Id"]}`}><a>{d["Titolo"]}</a></Link>
                                </li>
                            ))
                        }
                        </ul>
                    }
                </Box>
            </Container>
        )

    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            taskForse: await getTaskForse(params["Id"]),
            members: await getMembersByTaskForse(params["Id"]),
            resources: await getResourcesByTaskForse(params["Id"]),
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getTaskForses(),
            e => ({ params: { Id: e["Id"] } })
        ),
        fallback: true,
    }
}
