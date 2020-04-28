import React from 'react'

import Link from 'next/link'

import {
    map,
    filter,
} from 'lodash'

import {
    getTaskForses,
    getMembers,
    getMinutes,
    getResources,
    getTaskForseId,
    getTaskForseUri,
} from '../config'

import {
    Container,
    Typography,
    List,
    Divider,
} from '@material-ui/core'

import {
    ArrowForward,
} from '@material-ui/icons'

import {
    Header,
    Footer,
    IconListItem,
    TextListItem,
} from '../components'

export default function Index({
    taskForses,
    nOfMembers,
    nOfMinutes,
    nOfResources,
}) {
    return (
        <>
            <Header
                suptitle="nel dubbio ..."
                title={<>Task<br/>Forse</>}
                subtitle="by @ondatait"
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
                            keyText="Componenti nominati"
                            valueText={nOfMembers}
                        />
                        <TextListItem
                            keyText="Risorse pubbliche"
                            valueText={nOfMinutes+nOfResources}
                        />
                    </List>

                    <Divider />

                    <Typography gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare eu nunc in euismod. Pellentesque finibus elit ac urna venenatis egestas. In fermentum, orci quis suscipit efficitur, augue turpis porta ex, eu mattis lacus neque at tellus. Nunc eget molestie eros, eget sodales nulla. Phasellus vel odio vel libero tincidunt vehicula. Phasellus condimentum posuere accumsan. In hac habitasse platea dictumst. Proin sagittis sapien ut libero hendrerit mattis. Vivamus nulla orci, consectetur et elit vel, varius pulvinar enim. Quisque vestibulum venenatis magna ac placerat. Curabitur lobortis maximus ante, non laoreet enim facilisis vitae. Ut pulvinar turpis eget neque hendrerit, et mollis eros vestibulum. Nullam id elementum massa.
                    </Typography>
                    <Typography gutterBottom>
                        Sed nec quam ut ex ultrices luctus. Sed ut volutpat ligula, eu semper orci. Donec semper sem sed efficitur consequat. Morbi tempor ultrices congue. Etiam tincidunt, nisi in tincidunt blandit, ante ligula congue ligula, in porttitor elit augue at sem. Ut dapibus eu dui nec semper. Pellentesque scelerisque nulla turpis, eu pharetra odio luctus eget. Sed ac rhoncus enim, vitae feugiat quam. Nunc commodo, mi a dictum hendrerit, dui metus lobortis dolor, vitae cursus purus turpis eu elit.
                    </Typography>
                    <Typography gutterBottom>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                    </Typography>

                    <Typography variant="h2">
                        Tutte le task force
                    </Typography>
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
                                    </span>
                                </Link>
                            ))
                        }
                    </List>
                </Container>
            </main>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            taskForses: await getTaskForses(),
            nOfMembers: (await getMembers()).length,
            nOfMinutes: (await getMinutes()).length,
            nOfResources: (await getResources()).length,
        },
    }
}
