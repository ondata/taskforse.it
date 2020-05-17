import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import axios from 'axios'
import useSwr from 'swr'

import {
    map,
} from 'lodash'

import {
    getMember,
    getMemberId,
    getMembers,
    getTaskForsesByMember,
    getTaskForseId,
    getTaskForseUri,
    ddmmyyyy,

    GFORM_URL_MEMBER,
    GFORM_FIELDS_MEMBER,
    getGFormUrl,

    AVATARS,
} from '../../config'

import {
    Container,
    Typography,
    List,
    Grid,
    Divider,
    Button,
} from '@material-ui/core'

import {
    Edit,
    ArrowForward,
    Facebook,
    Twitter,
    LinkedIn,
    School,
    PictureAsPdf,
} from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faLinkedin,
    faGoogle,
    faInstagram,
    faWikipediaW,
} from '@fortawesome/free-brands-svg-icons'

import {
    Header,
    Footer,
    IconListItem,
    TextListItem,
    AvatarImage,
} from '../../components'

export default function Index({
    member = {},
    staticTaskForses = [],
}) {

    const router = useRouter()

    const { data: { data: taskForses = staticTaskForses } = {} } = useSwr(`/api/member/${member["Id"]}/task-forses`, axios.get)

    if (router.isFallback) {

        return (
            <Container maxWidth="sm">
                <Typography>Loading...</Typography>
            </Container>
        )

    } else {

        return (
            <>
                <NextSeo
                    title={`${member["Nome"]} ${member["Cognome"]}`}
                    description={`${member["Ruolo"]} di ${taskForses[0]["Nome"]}`}
                    openGraph={{
                        title: `${member["Nome"]} ${member["Cognome"]} | Task Forse by @ondatait`,
                        description: `${member["Ruolo"]} di ${taskForses[0]["Nome"]}`
                    }}
                />

                <Header
                    title={taskForses[0]["Nome"]}
                    href="/task-forse/[Id]"
                    as={getTaskForseUri(taskForses[0])}
                />

                <main>
                    <Container maxWidth="sm">

                        <Typography variant="h1" gutterBottom>{member["Nome"]} {member["Cognome"]}</Typography>
                        <Typography gutterBottom align="center">{member["Bio"]}</Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AvatarImage
                                    image={member["Foto"] || AVATARS[member["Genere"].toLowerCase()]}
                                    title={`${member["Nome"]} ${member["Cognome"]}`}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <List>
                                    <TextListItem
                                        keyText="Twitter"
                                        valueText={!!member["Twitter"] && <a target="_blank" href={member["Twitter"]}><FontAwesomeIcon icon={faTwitter} /></a>}
                                    />
                                    <TextListItem
                                        keyText="Linkedin"
                                        valueText={!!member["Linkedin"] && <a target="_blank" href={member["Linkedin"]}><FontAwesomeIcon icon={faLinkedin} /></a>}
                                    />
                                    <TextListItem
                                        keyText="Facebook"
                                        valueText={!!member["Facebook"] && <a target="_blank" href={member["Facebook"]}><FontAwesomeIcon icon={faFacebook} /></a>}
                                    />
                                    <TextListItem
                                        keyText="Instagram"
                                        valueText={!!member["Instagram"] && <a target="_blank" href={member["Instagram"]}><FontAwesomeIcon icon={faInstagram} /></a>}
                                    />
                                    <TextListItem
                                        keyText="Google Scholar"
                                        valueText={!!member["Google Scholar"] && <a target="_blank" href={member["Google Scholar"]}><FontAwesomeIcon icon={faGoogle} /></a>}
                                    />
                                    <TextListItem
                                        keyText="Wikipedia"
                                        valueText={!!member["Wikipedia"] && <a target="_blank" href={member["Wikipedia"]}><FontAwesomeIcon icon={faWikipediaW} /></a>}
                                    />
                                </List>
                            </Grid>
                        </Grid>

                        <List>

                            <TextListItem
                                keyText="Professione"
                                valueText={member["Professione"]}
                            />

                            <TextListItem
                                keyText="Istituto di affiliazione"
                                valueText={member["Istituto di affiliazione"]}
                            />

                            <TextListItem
                                keyText="E-mail istituzionale"
                                valueText={!!member["E-mail istituzionale"] && <a target="_blank" href={`mailto:${member["E-mail istituzionale"]}`}>{member["E-mail istituzionale"]}</a>}
                            />

                            <TextListItem
                                keyText="Laurea"
                                valueText={member["Laurea"]}
                            />

                            <TextListItem
                                keyText="Curriculum Vitae"
                                valueText={!!member["Curriculum Vitae"] && <a target="_blank" href={member["Curriculum Vitae"]}><PictureAsPdf /></a>}
                            />

                            <TextListItem
                                keyText="Anno di nascita"
                                valueText={member["Anno di nascita"]}
                            />

                            {
                                !!member["Anno di nascita"]
                                &&
                                <TextListItem
                                    keyText="Età"
                                    valueText={`${(new Date()).getFullYear() - member["Anno di nascita"]} anni`}
                                />
                            }

                            <TextListItem
                                keyText="Luogo di nascita"
                                valueText={member["Luogo di nascita"]}
                            />

                            <TextListItem
                                keyText="Luogo di residenza"
                                valueText={member["Luogo di residenza"]}
                            />

                        </List>

                        <Typography align="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                disableElevation
                                startIcon={<Edit />}
                                target="_blank"
                                fullWidth
                                href={
                                    getGFormUrl(
                                        GFORM_URL_MEMBER,
                                        member,
                                        GFORM_FIELDS_MEMBER
                                    )
                                }
                            >
                                Proponi una modifica
                            </Button>
                        </Typography>

                        <Typography variant="h2" gutterBottom>Task force</Typography>
                        <Typography gutterBottom>
                            {member["Nome"]} {member["Cognome"]} fa{member["Data di uscita"] ? "ceva" : ""} parte di {taskForses.length} task force dal {ddmmyyyy(member["Data di ingresso"] || taskForses[0]["Data inizio lavori"] || taskForses[0]["Data di istituzione"])}.
                            {!!member["Data di uscita"] && ` Si è dimesso dal suo ruolo il ${ddmmyyyy(member["Data di uscita"])}: "${member["Motivazione per l'uscita"]}".`}
                        </Typography>

                    </Container>

                    <Container maxWidth="md">

                        <List>
                            {
                                map(
                                    taskForses,
                                    (taskForse, index, arr) => (
                                        <Link key={getTaskForseId(taskForse)} href="/task-forse/[Id]" as={getTaskForseUri(taskForse)}>
                                            <span>
                                                <IconListItem
                                                    primary={taskForse["Nome"]}
                                                    secondary={taskForse["Descrizione"]}
                                                    icon={<ArrowForward />}
                                                />
                                                { index < arr.length-1 && <Divider variant="inset" /> }
                                            </span>
                                        </Link>
                                    )
                                )
                            }
                        </List>
                        
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
            member: await getMember(params["Id"]),
            staticTaskForses: await getTaskForsesByMember(params["Id"]),
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getMembers(),
            member => ({ params: { Id: getMemberId(member) } })
        ),
        fallback: true,
    }
}
