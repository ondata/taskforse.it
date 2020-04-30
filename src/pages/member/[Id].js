import { useRouter } from 'next/router'

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
    data = {},
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
                    <Typography variant="h1">
                        {`${data["Nome"] || "N/A"} ${data["Cognome"] || "N/A"}`}
                    </Typography>
                </Box>
            </Container>
        )
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            data: await getMember(params["Id"])
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
