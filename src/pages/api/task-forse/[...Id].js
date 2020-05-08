import { isEmpty, map } from 'lodash'

import {
    getTaskForse,
    getTaskForseApiUri,
    getMembersByTaskForse,
    getMemberApiUri,
    getMinutesByTaskForse,
    getMinuteApiUri,
    getResourcesByTaskForse,
    getResourceApiUri,
} from '../../../config'

export default async ({ query }, res) => {
    const taskForse = await getTaskForse(query["Id"][0])
    if (query["Id"].length === 1) {
        const members = await getMembersByTaskForse(taskForse["Id"])
        const minutes = await getMinutesByTaskForse(taskForse["Id"])
        const resources = await getResourcesByTaskForse(taskForse["Id"])
        if (isEmpty(taskForse)) {
            return res.status(404).json({})
        } else {
            return res.status(200).json({
                ...taskForse,
                "Membri conosciuti": members,
                "Verbali pubblicati": minutes,
                "Risorse disponibili": resources,
                _url: getTaskForseApiUri(taskForse)
            })
        }
    } else {
        switch (query["Id"][1]) {
            case "members":
                return res.status(200).json(
                    map(
                        await getMembersByTaskForse(taskForse["Id"]),
                        member => ({
                            ...member,
                            "Task forse": taskForse,
                            _url: getMemberApiUri(member)
                        })
                    )
                )
            case "minutes":
                return res.status(200).json(
                    map(
                        await getMinutesByTaskForse(taskForse["Id"]),
                        minute => ({
                            ...minute,
                            "Task forse": taskForse,
                            _url: getMinuteApiUri(minute)
                        })
                    )
                )
            case "resources":
                return res.status(200).json(
                    map(
                        await getResourcesByTaskForse(taskForse["Id"]),
                        resource => ({
                            ...resource,
                            "Task forse": taskForse,
                            _url: getResourceApiUri(resource)
                        })
                    )
                )
            default:
                return res.status(404).json([])
        }
    }
}
