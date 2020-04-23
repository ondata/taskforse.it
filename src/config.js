import {
    map,
    filter,
    groupBy,
    values,
    range,
    find,
    zipObject,
} from 'lodash'

export const GSHEET_PREFIX = "https://spreadsheets.google.com/feeds/cells"
export const GSHEET_SUFFIX = "public/full?alt=json"
export const GSHEET_ID = "15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8"
export const GSHEET_SHEET_META = 1
export const GSHEET_SHEET_TASKFORSES = 2
export const GSHEET_SHEET_MEMBERS = 3
export const GSHEET_SHEET_RESOURCES = 4

export const getGSheetUrl = sheet => `${GSHEET_PREFIX}/${GSHEET_ID}/${sheet}/${GSHEET_SUFFIX}`

export function normalizeGSheetJSON(response) {

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
                const e = find(row, c => +c["gs$cell"].col === col+1)
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
