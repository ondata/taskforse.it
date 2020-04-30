import { setup } from 'axios-cache-adapter'

import {
    map,
    filter,
    groupBy,
    values,
    range,
    find,
    zipObject,
    padStart,
} from 'lodash'

const GSHEET_PREFIX = `${process.env.CACHE_URL || "https://spreadsheets.google.com"}/feeds/cells`
const GSHEET_SUFFIX = "public/full?alt=json"
const GSHEET_ID = "15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8"
const GSHEET_SHEET_META = 1
const GSHEET_SHEET_TASKFORSES = 2
const GSHEET_SHEET_MEMBERS = 3
const GSHEET_SHEET_MINUTES = 4
const GSHEET_SHEET_RESOURCES = 5

const getGSheetUrl = sheet => `/${sheet}/${GSHEET_SUFFIX}`

export const GFORM_URL_TASKFORSE = "https://docs.google.com/forms/d/e/1FAIpQLScDhV6oWfWaBhKiyALhFNq85W8O2_BI2I9ujUsXH2H8tM6Gwg/viewform"
export const GFORM_URL_MEMBER = "https://docs.google.com/forms/d/e/1FAIpQLSeZ8hkfUPPYEIHacQPjh-t0dGtp4aAkNoT7PNx1ZFcvsr1wCA/viewform"
export const GFORM_URL_MINUTE = "https://docs.google.com/forms/d/e/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/viewform"
export const GFORM_URL_RESOURCE = "https://docs.google.com/forms/d/e/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/viewform"
export const GFORM_URL_ISSUE = "https://docs.google.com/forms/d/e/1FAIpQLSfLU1vs2k0sm3zPlLpvSpn_txb0oYHftbaDCUGS0UXm6BbyeA/viewform"

const api = setup({
    baseURL: `${GSHEET_PREFIX}/${GSHEET_ID}`,
    cache: {
        maxAge: 15 * 60 * 1000,
    },
})

export const normalizeId = id => String(id).toLowerCase()

export async function getMeta() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_META)))
}

export async function getTaskForses() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES)))
}

export async function getTaskForse(id) {
    return id ? find(
        await getTaskForses(),
        e => getTaskForseId(e) === normalizeId(id)
    ) || {} : {}
}

export const getTaskForseId = taskForse => normalizeId(taskForse["Id"])
export const getTaskForseUri = taskForse => `/task-forse/${getTaskForseId(taskForse)}`
export const getTaskForseApiUri = taskForse => `/api${getTaskForseUri(taskForse)}`

export async function getMembers() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MEMBERS)))
}

export async function getMember(id) {
    return id ? find(
        await getMembers(),
        e => getMemberId(e) === normalizeId(id)
    ) || {} : {}
}

export const getMemberId = member => normalizeId(member["Id"])
export const getMemberUri = member => `/member/${getMemberId(member)}`
export const getMemberApiUri = member => `/api${getMemberUri(member)}`

export async function getMembersByTaskForse(id) {
    return id ? filter(
        await getMembers(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

export async function getMinutes() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MINUTES)))
}

export async function getMinute(id) {
    return id ? find(
        await getMinutes(),
        e => getMinuteId(e) === normalizeId(id)
    ) || {} : {}
}

export const getMinuteId = minute => normalizeId(`${minute["Task forse"]}-${minute["Id"]}`)
export const getMinuteUri = minute => `/minute/${getMinuteId(minute)}`
export const getMinuteApiUri = minute => `/api${getMinuteUri(minute)}`

export async function getMinutesByTaskForse(id) {
    return id ? filter(
        await getMinutes(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

export async function getResources() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_RESOURCES)))
}

export async function getResource(id) {
    return id ? find(
        await getResources(),
        e => getResourceId(e) === normalizeId(id)
    ) || {} : {}
}
export const getResourceId = resource => normalizeId(`${resource["Task forse"]}-${resource["Id"]}`)
export const getResourceUri = resource => `/resource/${getResourceId(resource)}`
export const getResourceApiUri = resource => `/api${getResourceUri(resource)}`

export async function getResourcesByTaskForse(id) {
    return id ? filter(
        await getResources(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

function normalizeGSheetJSON(response) {

    const dataKeys = map(
        filter(
            response.data.feed.entry,
            e => +e["gs$cell"].row === 1
        ),
        e => +e["gs$cell"]["$t"] || e["gs$cell"]["$t"] || null
    )

    const dataValues = map(
        values(
            groupBy(
                filter(
                    response.data.feed.entry,
                    e => +e["gs$cell"].row > 1
                ),
                e => e["gs$cell"].row
            )
        ),
        row => map(
            range(dataKeys.length),
            col => {
                const e = find(row, c => +c["gs$cell"].col === col + 1)
                return e ? (+e["gs$cell"]["$t"] || e["gs$cell"]["$t"]) : null
            }
        )
    )

    return map(
        dataValues,
        v => zipObject(
            dataKeys,
            v
        )
    )

}

export const yyyy = dt => padStart((new Date(dt)).getFullYear(),4,0)
export const mm = dt => padStart((new Date(dt)).getMonth()+1,2,0)
export const dd = dt => padStart((new Date(dt)).getDate(),2,0)

export const yyyymmdd = dt => `${yyyy(dt)}/${mm(dt)}/${dd(dt)}`
export const ddmmyyyy = dt => `${dd(dt)}/${mm(dt)}/${yyyy(dt)}`
export const mmddyyyy = dt => `${mm(dt)}/${dd(dt)}/${yyyy(dt)}`
