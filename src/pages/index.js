import React from 'react'

import Link from 'next/link'

import {
    map,
} from 'lodash'

import {
    getTaskForses,
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
                        <li key={d["Id"]}>
                            <Link href="/task-forses/[Id]" as={`/task-forses/${d["Id"]}`}><a>{d["Nome"]}</a></Link>
                        </li>
                    ))
                }
                </ul>
            </Container>
        </>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            data: await getTaskForses(),
        },
    }
}
