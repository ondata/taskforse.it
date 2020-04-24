import { isEmpty } from 'lodash'
import { getResource } from '../../../config'

export default async ({ query }, res) => {
    const resource = await getResource(query["Id"])
    if (isEmpty(resource)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json(resource)
    }
}
