import { useRouter } from 'next/router'

import {
    map,
} from 'lodash'

import {
    getResource,
    getResourceId,
    getResources,
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
                        {`${data["Titolo"] || "N/A"}`}
                    </Typography>
                </Box>
            </Container>
        )

    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            data: await getResource(params["Id"])
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getResources(),
            resource => ({ params: { Id: getResourceId(resource) } })
        ),
        fallback: true,
    }
}