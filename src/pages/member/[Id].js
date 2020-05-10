import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import {
    map,
} from 'lodash'

import {
    getMember,
    getMemberId,
    getMembers,
} from '../../config'

import {
    Container,
    Typography,
    Box,
} from '@material-ui/core'

export default function Index({
    member = {},
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
            <>
                <NextSeo
                    title={`${member["Nome"]} ${member["Cognome"]}`}
                    //description={taskForse["Descrizione"]}
                    openGraph={{
                        title: `${member["Nome"]} ${member["Cognome"]} | Task Forse by @ondatait`,
                        //description: taskForse["Descrizione"],
                    }}
                />
                <Container maxWidth="xs">
                    <Box my={4}>
                        <Typography variant="h1">
                            {`${member["Nome"] || "N/A"} ${member["Cognome"] || "N/A"}`}
                        </Typography>
                    </Box>
                </Container>
            </>
        )
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            member: await getMember(params["Id"])
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
