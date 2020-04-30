import { useRouter } from 'next/router'
import Link from 'next/link'

import {
    map,
    isEmpty,
    concat,
    range,
    orderBy,
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
    GFORM_URL_MINUTE,
    GFORM_URL_RESOURCE,
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
    Header,
    Footer,
    GridItem,
    IconListItem,
    IconListAddItem,
    TextListItem,
    GridAddItem,
} from '../../components'

export default function Index({
    taskForse = {},
    members = [],
    minutes = [],
    resources = [],
}) {

    const router = useRouter()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

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

                        <Typography variant="h1" gutterBottom>
                            {`${taskForse["Nome"] || "N/A"}`}
                        </Typography>

                        <Typography gutterBottom>
                            {taskForse["Descrizione"]}
                        </Typography>

                        <Typography variant="h2" gutterBottom>
                            Mission
                        </Typography>

                        <Typography gutterBottom>
                            {taskForse["Mission"]}
                        </Typography>

                        <Typography variant="h2" gutterBottom>
                            Membri
                        </Typography>

                    </Container>

                    <Container maxWidth="lg">

                        {
                            isEmpty(members) && !taskForse["Numero membri"]
                                ?
                                <Typography>Nessun membro conosciuto.</Typography>
                                :
                                <Grid container spacing={2}>
                                    {
                                        map(
                                            concat(
                                                orderBy(
                                                    members,
                                                    ["Ruolo","Cognome"],
                                                    ["desc","asc"]
                                                ),
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
                                            (d, i) => {
                                                if (!isEmpty(d)) {
                                                    return (
                                                        <Grid item xs={12} sm={6} md={3} key={getMemberId(d)}>
                                                            <Link href="/member/[Id]" as={getMemberUri(d)}>
                                                                <span>
                                                                    <GridItem
                                                                        title={`${d["Nome"]} ${d["Cognome"]}`}
                                                                        subtitle={d["Ruolo"]}
                                                                        image={d["Foto"] || (d["Genere"].toLowerCase() === 'm' ? "/unknown-man.png" : "/unknown-woman.png")}
                                                                    />
                                                                </span>
                                                            </Link>
                                                        </Grid>
                                                    )
                                                } else {
                                                    return (
                                                        <Grid item xs={12} sm={6} md={3} key={i}>
                                                            <a target="_blank" href={GFORM_URL_MEMBER}>
                                                                <GridAddItem topsecret />
                                                            </a>
                                                        </Grid>
                                                    )
                                                }
                                            }
                                        )
                                    }
                                    <Grid item xs={12} sm={6} md={3}>
                                        <a target="_blank" href={GFORM_URL_MEMBER}>
                                            <GridAddItem />
                                        </a>
                                    </Grid>
                                </Grid>
                        }

                    </Container>

                    <Container maxWidth="sm">

                        <Grid container spacing={matches ? 1 : 8}>

                            <Grid item xs={12} sm={6}>
                                
                                <Typography variant="h2" gutterBottom>
                                    Verbali
                                </Typography>
                                {
                                    isEmpty(minutes) && !taskForse["Numero verbali"]
                                    ?
                                    <Typography>Nessun verbale disponibile.</Typography>
                                    :
                                    <List>
                                        {
                                            map(
                                                concat(
                                                    orderBy(
                                                        minutes,
                                                        "Data di pubblicazione",
                                                        "desc"
                                                    ),
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
                                                (minute, i) => {
                                                    if (!isEmpty(minute)) {
                                                        return (
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
                                                    } else {
                                                        return (
                                                            <a key={i} target="_blank" href={GFORM_URL_MINUTE}>
                                                                <TextListItem
                                                                    color="secondary"
                                                                    variant="subtitle1"
                                                                    topsecret
                                                                />
                                                                <Divider variant="middle" />
                                                            </a>
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                        <a target="_blank" href={GFORM_URL_MINUTE}>
                                            <TextListItem
                                                color="secondary"
                                                variant="subtitle1"
                                                topsecret
                                            />
                                        </a>
                                    </List>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h2">
                                    Risorse
                                </Typography>
                                {
                                    isEmpty(resources)
                                    ?
                                    <Typography>Nessuna risorsa aggiuntiva disponibile.</Typography>
                                    :
                                    <List dense disablePadding>
                                        <a target="_blank" href={GFORM_URL_RESOURCE}>
                                            <IconListAddItem primary="+ Segnala una risorsa" />
                                            <Divider variant="middle" />
                                        </a>
                                        {
                                            map(resources, resource => (
                                                <a target="_blank" href={resource["Pagina web"]} key={getResourceId(resource)}>
                                                    <IconListItem
                                                        primary={resource["Titolo"]}
                                                        secondary={resource["Categoria"]}
                                                    />
                                                    <Divider variant="middle" />
                                                </a>
                                            ))
                                        }
                                        <a target="_blank" href={GFORM_URL_RESOURCE}>
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
