import { isEmpty, map } from 'lodash'

import {
    getTaskForse,
    getTaskForseUri,
    getMembersByTaskForse,
    getMemberUri,
    getMinutesByTaskForse,
    getMinuteUri,
    getResourcesByTaskForse,
    getResourceUri,
} from '../../../config'

export default async ({ query }, res) => {
    if (query["Id"].length === 1) {
        const taskForse = await getTaskForse(query["Id"][0])
        if (isEmpty(taskForse)) {
            return res.status(404).json({})
        } else {
            return res.status(200).json({ ...taskForse, _url: getTaskForseUri(taskForse) })
        }
    } else {
        switch (query["Id"][1]) {
            case "members":
                return res.status(200).json(
                    map(
                        await getMembersByTaskForse(query["Id"][0]),
                        member => ({ ...member, _url: getMemberUri(member) })
                    )
                )
            case "minutes":
                return res.status(200).json(
                    map(
                        await getMinutesByTaskForse(query["Id"][0]),
                        minute => ({ ...minute, _url: getMinuteUri(minute) })
                    )
                )
            case "resources":
                return res.status(200).json(
                    map(
                        await getResourcesByTaskForse(query["Id"][0]),
                        resource => ({ ...resource, _url: getResourceUri(resource) })
                    )
                )
            default:
                return res.status(404).json([])
        }
    }
}
