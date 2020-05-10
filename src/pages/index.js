import { useState, useEffect } from 'react'

import Link from 'next/link'

import axios from 'axios'

import {
    map,
    filter,
    sumBy,
} from 'lodash'

import {
    getTaskForses,
    getTaskForseId,
    getTaskForseUri,

    GFORM_URL_TASKFORSE,
    getGFormUrl,
} from '../config'

import {
    Container,
    Typography,
    List,
    Divider,
    Button,
    Grid,
} from '@material-ui/core'

import {
    ArrowForward,
    Add,
} from '@material-ui/icons'

import {
    Header,
    Footer,
    IconListItem,
    IconListAddItem,
    TextListItem,
    BarListItem,
    Counter,
} from '../components'

export default function Index({
    staticTaskForses = [],
}) {

    const [taskForses, setTaskForses] = useState(staticTaskForses)

    useEffect(() => {
        axios
            .get(`/api/task-forses`)
            .then(response => setTaskForses(response.data))
    }, [])

    return (
        <>
            <Header
                suptitle="nel dubbio ..."
                title={<>Task<br/>Forse</>}
                subtitle={<>by @<a target="_blank" href="https://twitter.com/ondatait">ondatait</a></>}
            />

            <main>

                <Container maxWidth="sm">

                    <Typography gutterBottom>
                        Da quando in Italia è stato dichiarato lo stato di emergenza nazionale il 30 gennaio 2020 sono state istituite numerose task force e una serie di comitati, gruppi di lavoro, tavoli tecnici a livello nazionale e locale.
                    </Typography>

                    <Grid container spacing={4} style={{marginBottom:"1rem",marginTop:"1rem"}}>
                        <Grid item xs={6}>
                            <Counter count={taskForses.length || "-"} title="Task force istituite" />
                        </Grid>
                        <Grid item xs={6}>
                            <Counter count={sumBy(taskForses, "Numero membri conosciuti") || "-"} title="Membri delle task force" />
                        </Grid>
                    </Grid>

                    <Typography gutterBottom>
                        Le informazioni su chi fa parte di questi gruppi, su che obiettivi si pongono e su quali risultati producono sono ancora incerte e disperse in molte pagine web difficilmente ricercabili.
                    </Typography>
                    
                    <Typography gutterBottom>
                        Con il progetto Task Forse proviamo a raccogliere e organizzare in un unico luogo tutte queste informazioni per metterle a disposizione di tutti. Dai una mano anche tu!
                    </Typography>

                </Container>

                <Container maxWidth="sm">

                    <Typography variant="h2" gutterBottom>
                        Tutte le task force
                    </Typography>

                    <Typography gutterBottom>
                        Al momento sappiamo che {taskForses.length} task force sono attive con lo specifico mandato di gestire l'emergenza COVID-19.
                        {` `}Se hai informazioni su task force non presenti in questo elenco, <a target="_blank" href={getGFormUrl(GFORM_URL_TASKFORSE)}>mandaci tutti i dettagli</a>.
                    </Typography>

                </Container>

                <Container maxWidth="md">

                    <List>
                        <a target="_blank" href={GFORM_URL_TASKFORSE}>
                            <IconListAddItem
                                primary="Segnala una nuova task force"
                                icon={<Add />}
                            />
                        </a>
                        {
                            map(taskForses, d => (
                                <Link key={getTaskForseId(d)} href="/task-forse/[Id]" as={getTaskForseUri(d)}>
                                    <span>
                                        <IconListItem
                                            primary={d["Nome"]}
                                            secondary={d["Descrizione"]}
                                            icon={<ArrowForward />}
                                        />
                                        <Divider variant="inset" />
                                    </span>
                                </Link>
                            ))
                        }
                    </List>
                    
                </Container>

                <Container maxWidth="sm">

                    <Typography variant="h2" gutterBottom>
                        Task force in numeri
                    </Typography>

                    <List>

                        <TextListItem
                            keyText="Task force istituite"
                            valueText={taskForses.length}
                        />

                        <TextListItem
                            keyText="Membri conosciuti"
                            valueText={sumBy(taskForses, "Numero membri conosciuti")}
                        />

                        <BarListItem
                            items={[
                                { label: "Donne", value: sumBy(taskForses, tf => +tf["Numero donne"] || 0), color: "primary" },
                                { label: "Uomini", value: sumBy(taskForses, tf => +tf["Numero uomini"] || 0), color: "secondary" },
                            ]}
                        />

                        <TextListItem
                            keyText="Task force attive"
                            valueText={
                                filter(
                                    taskForses,
                                    tf => !tf["Data fine lavori"] || (new Date(tf["Data fine lavori"])) > (new Date())
                                ).length
                            }
                        />

                        <TextListItem
                            keyText="Risorse pubblicate"
                            valueText={
                                sumBy(
                                    taskForses,
                                    tf => +tf["Numero verbali pubblicati"] || 0
                                )
                                +
                                sumBy(
                                    taskForses,
                                    tf => +tf["Numero risorse disponibili"] || 0
                                )
                            }
                        />
                    </List>

                    <Divider />

                    <Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            startIcon={<Add />}
                            fullWidth
                            target="_blank"
                            href={getGFormUrl(GFORM_URL_TASKFORSE)}
                        >
                            Segnala una nuova task force
                        </Button>
                    </Typography>

                </Container>

            </main>

            <Footer />
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {
            taskForses: await getTaskForses(),
        },
    }
}
