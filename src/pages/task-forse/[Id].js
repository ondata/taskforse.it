import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import axios from 'axios'

import {
    map,
    isEmpty,
    range,
    orderBy,
    max,
} from 'lodash'

import {
    getTaskForse,
    getTaskForseId,
    getTaskForses,
    getMembersByTaskForse,
    getMemberId,
    getMemberUri,
    getMinutesByTaskForse,
    getMinuteId,
    getMinuteUri,
    getResourcesByTaskForse,
    getResourceId,
    getResourceUri,
    yyyy,
    ddmmyyyy,

    GFORM_URL_MEMBER,
    GFORM_FIELDS_MEMBER,
    GFORM_URL_MINUTE,
    GFROM_FIELDS_MINUTE,
    GFORM_URL_RESOURCE,
    GFROM_FIELDS_RESOURCE,
    getGFormUrl,

    AVATARS,
} from '../../config'

import {
    Container,
    Typography,
    List,
    Grid,
    Divider,
    useMediaQuery,
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'

import {
    Group,
    Description,
    InsertLink,
} from '@material-ui/icons'

import {
    Header,
    Footer,
    GridItem,
    IconListItem,
    IconListAddItem,
    TextListItem,
    GridAddItem,
    CountBadge,
} from '../../components'

export default function Index({
    taskForse = {},
    staticMembers = [],
    staticMinutes = [],
    staticResources = [],
}) {

    const router = useRouter()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const [members, setMembers] = useState(staticMembers)
    const [minutes, setMinutes] = useState(staticMinutes)
    const [resources, setResources] = useState(staticResources)

    useEffect(() => {

        axios
            .get(`/api/task-forse/${taskForse["Id"]}/members`)
            .then(response => setMembers(response.data))

        axios
            .get(`/api/task-forse/${taskForse["Id"]}/minutes`)
            .then(response => setMinutes(response.data))
        
        axios
            .get(`/api/task-forse/${taskForse["Id"]}/resources`)
            .then(response => setResources(response.data))

    }, [taskForse])

    if (router.isFallback) {

        return (
            <Container maxWidth="sm">
                <Typography>Loading...</Typography>
            </Container>
        )

    } else {

        return (
            <>
                <Header
                    title="Home"
                    href="/"
                    as="/"
                />
                <main>
                    <Container maxWidth="sm">

                        <Typography variant="h1" gutterBottom>{`${taskForse["Nome"] || "N/A"}`}</Typography>
                        <Typography gutterBottom>{taskForse["Descrizione"]}</Typography>

                        <Typography variant="h2" gutterBottom>Mission</Typography>
                        <Typography gutterBottom>{taskForse["Mission"]}</Typography>

                        <Typography variant="h2" gutterBottom>
                            Membri
                            { !isEmpty(members) && <CountBadge count={members.length} color="secondary"><Group /></CountBadge> }
                        </Typography>

                    </Container>

                    <Container maxWidth="lg">

                        {
                            isEmpty(members) && !taskForse["Numero membri"]
                            ?
                            <Typography>Nessun membro conosciuto.</Typography>
                            :
                            <Grid container spacing={2}>

                                { // Known members
                                    map(
                                        orderBy(
                                            members,
                                            ["Ruolo","Cognome"],
                                            ["desc","asc"]
                                        ),
                                        member => (
                                            <Grid item xs={12} sm={6} md={3} key={getMemberId(member)}>
                                                <Link href="/member/[Id]" as={getMemberUri(member)}>
                                                    <span>
                                                        <GridItem
                                                            title={`${member["Nome"]} ${member["Cognome"]}`}
                                                            subtitle={member["Ruolo"]}
                                                            image={member["Foto"] || AVATARS[member["Genere"].toLowerCase()]}
                                                        />
                                                    </span>
                                                </Link>
                                            </Grid>
                                        )
                                    )
                                }

                                { // Unknown members
                                    map(
                                        range(max([0, taskForse["Numero membri"] - members.length])),
                                        i => (
                                            <Grid item xs={12} sm={6} md={3} key={i}>
                                                <a
                                                    target="_blank"
                                                    href={
                                                        getGFormUrl(
                                                            GFORM_URL_MEMBER,
                                                            { "Task forse": taskForse["Id"] },
                                                            GFORM_FIELDS_MEMBER
                                                        )
                                                    }
                                                >
                                                    <GridAddItem topsecret />
                                                </a>
                                            </Grid>
                                        )
                                    )
                                }

                                { // New members
                                    !taskForse["Numero membri"]
                                    &&
                                    <Grid item xs={12} sm={6} md={3}>
                                        <a
                                            target="_blank"
                                            href={
                                                getGFormUrl(
                                                    GFORM_URL_MEMBER,
                                                    { "Task forse": taskForse["Id"] },
                                                    GFORM_FIELDS_MEMBER
                                                )
                                            }
                                        >
                                            <GridAddItem />
                                        </a>
                                    </Grid>
                                }

                            </Grid>
                        }

                    </Container>

                    <Container maxWidth="sm">

                        <Grid container spacing={matches ? 1 : 8}>

                            <Grid item xs={12} sm={6}>
                                
                                <Typography variant="h2" gutterBottom>
                                    Verbali
                                    { !isEmpty(minutes) && <CountBadge count={minutes.length} color="secondary"><Description /></CountBadge> }
                                </Typography>

                                {
                                    isEmpty(minutes)
                                    &&
                                    <Typography>Nessun verbale disponibile.</Typography>
                                }

                                <List>
                                    
                                    { // Known minutes
                                        map(
                                            orderBy(
                                                minutes,
                                                "Data di pubblicazione",
                                                "desc"
                                            ),
                                            minute => (
                                                //<Link href="/minute/[Id]" as={getMinuteUri(minute)} key={getMinuteId(minute)}>
                                                    //<a>
                                                    <a key={getMinuteId(minute)} target="_blank" href={minute["URL"] || "#"}>
                                                        <TextListItem
                                                            keyText={ddmmyyyy(minute["Data di pubblicazione"])}
                                                            valueText={`${minute["Numero"]}/${yyyy(minute["Data di pubblicazione"])}`}
                                                            color="secondary"
                                                            variant="subtitle1"
                                                        />
                                                        <Divider variant="middle" />
                                                    </a>
                                                //</Link>
                                            )
                                        )
                                    }

                                    { // Unknown minutes
                                        map(
                                            range(max([0,taskForse["Numero verbali"] - minutes.length])),
                                            i => (
                                                <a
                                                    key={i}
                                                    target="_blank"
                                                    href={
                                                        getGFormUrl(
                                                            GFORM_URL_MINUTE,
                                                            { "Task forse": taskForse["Id"] },
                                                            GFROM_FIELDS_MINUTE
                                                        )
                                                    }
                                                >
                                                    <TextListItem
                                                        color="secondary"
                                                        variant="subtitle1"
                                                        topsecret
                                                    />
                                                    <Divider variant="middle" />
                                                </a>
                                            )
                                        )
                                    }

                                    { // New minutes
                                        !taskForse["Numero verbali"]
                                        &&
                                        <a
                                            target="_blank"
                                            href={
                                                getGFormUrl(
                                                    GFORM_URL_MINUTE,
                                                    { "Task forse": taskForse["Id"] },
                                                    GFROM_FIELDS_MINUTE
                                                )
                                            }
                                        >
                                            <TextListItem
                                                color="secondary"
                                                variant="subtitle1"
                                                topsecret
                                            />
                                        </a>
                                    }

                                </List>

                            </Grid>

                            <Grid item xs={12} sm={6}>
                                
                                <Typography variant="h2">
                                    Risorse
                                    { !isEmpty(resources) && <CountBadge count={resources.length} color="secondary"><InsertLink /></CountBadge> }
                                </Typography>

                                {
                                    isEmpty(resources)
                                    ?
                                    <Typography>Nessuna risorsa aggiuntiva disponibile.</Typography>
                                    :
                                    <List dense disablePadding>
                                        {
                                            map(
                                                resources,
                                                resource => (
                                                    <a target="_blank" href={resource["Pagina web"]} key={getResourceId(resource)}>
                                                        <IconListItem
                                                            primary={resource["Titolo"]}
                                                            secondary={resource["Categoria"]}
                                                        />
                                                        <Divider variant="middle" />
                                                    </a>
                                                )
                                            )
                                        }

                                        <a
                                            target="_blank"
                                            href={
                                                getGFormUrl(
                                                    GFORM_URL_RESOURCE,
                                                    { "Task forse": taskForse["Id"] },
                                                    GFROM_FIELDS_RESOURCE
                                                )
                                            }
                                        >
                                            <IconListAddItem primary="+ Segnala una risorsa" />
                                        </a>

                                    </List>
                                }

                            </Grid>

                        </Grid>

                    </Container>
                </main>
                <Footer />
            </>
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
            taskForse => ({ params: { Id: getTaskForseId(taskForse) } })
        ),
        fallback: true,
    }
}
