import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import {
    map,
    isEmpty,
    concat,
    range,
} from 'lodash'

import {
    getTaskForse,
    getTaskForses,
    getMembersByTaskForse,
    getMinutesByTaskForse,
    getResourcesByTaskForse,
    yyyy,
    ddmmyyyy,
} from '../../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({
    taskForse = {},
    members = [],
    minutes = [],
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
                        isEmpty(members) && !taskForse["Numero membri"]
                        ?
                        <Typography>Nessun membro disponibile.</Typography>
                        :
                        <ul>
                        {
                            map(
                                concat(
                                    members,
                                    map(
                                        range(
                                            taskForse["Numero membri"]
                                            ?
                                            taskForse["Numero membri"] - members.length
                                            :
                                            0
                                        ),
                                        () => undefined
                                    )
                                ),
                                (d,i) => {
                                    if (!isEmpty(d)) {
                                        return (
                                            <li key={d["Id"]}>
                                                <Link href="/members/[Id]" as={`/members/${String(d["Id"]).toLowerCase()}`}>
                                                    <a>{`${d["Nome"]} ${d["Cognome"]}`}</a>
                                                </Link>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={i}>
                                                "N/A"
                                            </li>
                                        )
                                    }
                                }
                            )
                        }
                        </ul>
                    }
                </Box>
                <Box my={4}>
                    <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center" }}>
                        Verbali
                    </Typography>
                    {
                        isEmpty(minutes) && !taskForse["Numero verbali"]
                        ?
                        <Typography>Nessun verbale disponibile.</Typography>
                        :
                        <ul>
                        {
                            map(
                                concat(
                                    minutes,
                                    map(
                                        range(
                                            taskForse["Numero verbali"]
                                            ?
                                            taskForse["Numero verbali"] - minutes.length
                                            :
                                            0
                                        ),
                                        () => undefined
                                    )
                                ),
                                (d,i) => {
                                    if (!isEmpty(d)) {
                                        return (
                                            <li key={`${d["Task forse"]}-${String(d["Id"]).toLowerCase()}`}>
                                                <Link href="/minutes/[Id]" as={`/minutes/${d["Task forse"]}-${String(d["Id"]).toLowerCase()}`}>
                                                    <a>{`${d["Numero"]}/${yyyy(d["Data di pubblicazione"])} del ${ddmmyyyy(d["Data di pubblicazione"])}`}</a>
                                                </Link>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li key={i}>
                                                "N/A"
                                            </li>
                                        )
                                    }
                                }
                            )
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
                        <Typography>Nessuna risorsa aggiuntiva disponibile.</Typography>
                        :
                        <ul>
                        {
                            map(resources, d => (
                                <li key={`${d["Task forse"]}-${String(d["Id"]).toLowerCase()}`}>
                                    <Link href="/resources/[Id]" as={`/resources/${d["Task forse"]}-${String(d["Id"]).toLowerCase()}`}><a>{d["Titolo"]}</a></Link>
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
            minutes: await getMinutesByTaskForse(params["Id"]),
            resources: await getResourcesByTaskForse(params["Id"]),
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getTaskForses(),
            e => ({ params: { Id: String(e["Id"]).toLowerCase() } })
        ),
        fallback: true,
    }
}
