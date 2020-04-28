import React from 'react'

import Link from 'next/link'

import {
    map,
} from 'lodash'

import {
    getTaskForses,
    getTaskForseId,
    getTaskForseUri,
    CONTAINER_MAXWIDTH,
} from '../config'

import {
    Container,
} from '@material-ui/core'

import {
    Header,
} from '../components'

export default function Index({ data }) {
    return (
        <>
            <Header
                suptitle="nel dubbio ..."
                title={<>Task<br/>Forse</>}
                subtitle="by @ondatait"
            />
            <Container maxWidth={CONTAINER_MAXWIDTH}>
                <ul>
                {
                    map(data, d => (
                        <li key={getTaskForseId(d)}>
                            <Link href="/task-forse/[Id]" as={getTaskForseUri(d)}><a>{d["Nome"]}</a></Link>
                        </li>
                    ))
                }
                </ul>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            data: await getTaskForses(),
        },
    }
}
