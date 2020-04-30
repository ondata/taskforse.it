import { useRouter } from 'next/router'

import {
    map,
} from 'lodash'

import {
    getMinute,
    getMinuteId,
    getMinutes,
    yyyy,
    ddmmyyyy,
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
                        {`Verbale n. ${data["Numero"]}/${yyyy(data["Data di pubblicazione"])} del ${ddmmyyyy(data["Data di pubblicazione"])}`}
                    </Typography>
                </Box>
            </Container>
        )

    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            data: await getMinute(params["Id"])
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: map(
            await getMinutes(),
            minute => ({ params: { Id: getMinuteId(minute) } })
        ),
        fallback: true,
    }
}