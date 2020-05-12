import { NextSeo } from 'next-seo'

import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'

import {
    GFORM_URL_ISSUE,
    getGFormUrl,
} from '../config'

import {
    Header,
    Footer,
} from '../components'

export default function Index() {

    return (
        <>
            <NextSeo
                title="About"
                description="Task Forse è un progetto dell'associazione onData."
                openGraph={{
                    title: `About | Task Forse by @ondatait`,
                    description: "Task Forse è un progetto dell'associazione onData.",
                }}
            />
            <Header
                title="Task force"
                href="/"
                as="/"
            />

            <main>

                <Container maxWidth="sm">

                    <Typography gutterBottom>
                        Task Forse è un progetto dell'<a target="_blank" href="https://ondata.it/">associazione onData</a> e ha l'obiettivo di <strong>raccogliere</strong> e <strong>integrare</strong> tutti i dati delle task force attive per fronteggiare l'emergenza nazionale COVID-19, disperse in molte pagine web e documenti pdf difficilmente reperibili.
                    </Typography>

                    <Typography gutterBottom>
                        <strong>Uno spazio unico</strong> in cui puoi trovare l'elenco delle task force, tutti i membri che le costituiscono e tutti i documenti e le risorse che producono, con tutti i dettagli che aggiungeremo insieme nel tempo: <a target="_blank" href="http://blog.ondata.it/nel-dubbio-task-forse/">Task Forse è un progetto di comunità</a>.
                    </Typography>

                    <Typography gutterBottom>
                        Task Forse è una banca dati a supporto di azioni di monitoraggio delle attività espletate da questi gruppi, in modo da avere dei riferimenti diretti per eventuali campagne di richiesta di apertura dei dati.
                    </Typography>

                    <img src="/share.png" style={{width:"100%"}} alt="Card di Task Forse" />

                    <Typography variant="h2" gutterBottom>
                        Crediti
                    </Typography>

                    <Typography gutterBottom>
                        Questo sito è sviluppato e mantenuto con &hearts; da <a target="_blank" href="https://github.com/jenkin">jenkin</a>, utilizzando <a target="_blank" href="https://nextjs.org/">NextJS</a> e <a target="_blank" href="https://material-ui.com/">Material-UI</a>.
                        {` `}
                        Il nome è un'idea di <a target="_blank" href="https://www.linkedin.com/in/andreaborruso/">aborruso</a>, il graphic design di <a target="_blank" href="https://www.linkedin.com/in/jacoposolmi/">japi</a> e la progettazione del database di <a target="_blank" href="https://www.linkedin.com/in/lorenzo-perone-5aa8412/">lore</a> e <a target="_blank" href="https://www.linkedin.com/in/alicecorona/">alice</a>.
                    </Typography>

                    <Typography variant="h2" gutterBottom>
                        Contributori
                    </Typography>

                    <Typography gutterBottom>
                        Coming soon...
                    </Typography>

                    <Typography variant="h2" gutterBottom>
                        Roadmap
                    </Typography>

                    <Typography gutterBottom>
                        <List dense>
                            <ListItem>
                                <ListItemText>Pagina di singolo membro</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Elenco contributori</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>REST API</ListItemText>
                            </ListItem>
                            <ListItem button component="a" target="_blank" href={getGFormUrl(GFORM_URL_ISSUE)}>
                                <ListItemText>+ Suggerisci...</ListItemText>
                            </ListItem>
                        </List>
                    </Typography>

                </Container>

            </main>

            <Footer />
        </>
    )
}
