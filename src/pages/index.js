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
} from '../config'

import {
    Container,
    Typography,
    List,
    Divider,
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

                    <List>
                        <TextListItem
                            keyText="Task force istituite"
                            valueText={taskForses.length}
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
                            keyText="Membri conosciuti"
                            valueText={`${sumBy(taskForses, "Numero membri conosciuti")} / ${sumBy(taskForses, "Numero membri")}`}
                        />
                        <TextListItem
                            keyText="&nbsp;-&nbsp;Donne"
                            valueText={sumBy(taskForses, tf => +tf["Numero donne"] || 0)}
                        />
                        <TextListItem
                            keyText="&nbsp;-&nbsp;Uomini"
                            valueText={sumBy(taskForses, tf => +tf["Numero uomini"] || 0)}
                        />
                        <TextListItem
                            keyText="Risorse pubbliche"
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

                    <Typography gutterBottom>
                        Da quando in Italia è stato dichiarato lo stato di emergenza nazionale il 30 gennaio 2020 sono state istituite numerose task force e una serie di comitati, gruppi di lavoro, tavoli tecnici a livello nazionale e locale.
                    </Typography>
                    <Typography gutterBottom>
                        Le informazioni su chi fa parte di questi gruppi, su che obiettivi si pongono e su quali risultati producono sono ancora incerte e disperse in molte pagine web difficilmente ricercabili.
                    </Typography>
                    <Typography gutterBottom>
                        Con il progetto Task Forse proviamo a raccogliere e organizzare in un unico luogo tutte queste informazioni per metterle a disposizione di tutti. Dai una mano anche tu!
                    </Typography>

                    <Typography variant="h2">
                        Tutte le task forse
                    </Typography>

                </Container>

                <Container maxWidth="md">

                    <List>
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
                        <a target="_blank" href={GFORM_URL_TASKFORSE}>
                            <IconListAddItem
                                primary="Segnala una task force"
                                icon={<Add />}
                            />
                        </a>
                    </List>
                    
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
