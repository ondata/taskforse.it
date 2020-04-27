import { setup } from 'axios-cache-adapter'

import {
    map,
    filter,
    groupBy,
    values,
    range,
    find,
    zipObject,
} from 'lodash'

const GSHEET_PREFIX = "https://spreadsheets.google.com/feeds/cells"
const GSHEET_SUFFIX = "public/full?alt=json"
const GSHEET_ID = "15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8"
const GSHEET_SHEET_META = 1
const GSHEET_SHEET_TASKFORSES = 2
const GSHEET_SHEET_MEMBERS = 3
const GSHEET_SHEET_MINUTES = 4
const GSHEET_SHEET_RESOURCES = 5

export const CONTAINER_MAXWIDTH = "sm"
export const PRIMARY_COLOR = "#fd1d59"

const api = setup({
    baseURL: `${GSHEET_PREFIX}/${GSHEET_ID}`,
    cache: {
        maxAge: 15 * 60 * 1000,
    },
})

export async function getMeta() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_META)))
}

export async function getTaskForses() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES)))
}

export async function getTaskForse(id) {
    return id ? find(
        await getTaskForses(),
        e => e["Id"] === id
    ) || {} : {}
}

export async function getMembers() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MEMBERS)))
}

export async function getMember(id) {
    return id ? find(
        await getMembers(),
        e => e["Id"] === id
    ) || {} : {}
}

export async function getMembersByTaskForse(id) {
    return id ? filter(
        await getMembers(),
        e => e["Task forse"] === id
    ) : []
}

export async function getMinutes() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MINUTES)))
}

export async function getMinute(id) {
    return id ? find(
        await getMinutes(),
        e => e["Id"] === id
    ) || {} : {}
}

export async function getMinutesByTaskForse(id) {
    return id ? filter(
        await getMinutes(),
        e => e["Task forse"] === id
    ) : []
}

export async function getResources() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_RESOURCES)))
}

export async function getResource(id) {
    return id ? find(
        await getResources(),
        e => e["Id"] === id
    ) || {} : {}
}

export async function getResourcesByTaskForse(id) {
    return id ? filter(
        await getResources(),
        e => e["Task forse"] === id
    ) : []
}

const getGSheetUrl = sheet => `/${sheet}/${GSHEET_SUFFIX}`

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

export const yyyy = dt => dt.getFullYear()
export const mm = dt => dt.getMonth()+1
export const dd = dt => dt.getDate()

export const yyyymmdd = dt => `${yyyy(dt)}/${mm(dt)}/${dd(dt)}`
