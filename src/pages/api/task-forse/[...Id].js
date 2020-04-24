import { isEmpty } from 'lodash'

import {
    getTaskForse,
    getMembersByTaskForse,
    getResourcesByTaskForse,
} from '../../../config'

export default async ({ query }, res) => {
    if (query["Id"].length === 1) {
        const taskForse = await getTaskForse(query["Id"][0])
        if (isEmpty(taskForse)) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(taskForse)
        }
    } else {
        switch (query["Id"][1]) {
            case "members":
                return res.status(200).json(await getMembersByTaskForse(query["Id"][0]))
            case "resources":
                return res.status(200).json(await getResourcesByTaskForse(query["Id"][0]))
            default:
                return res.status(404).json([])
        }
    }
}
