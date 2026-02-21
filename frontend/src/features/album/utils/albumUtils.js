export const functionTypesOptions = [
    "Wedding", "Pre Wedding", "Engagement", "Reception", "Birthday",
    "Maternity", "Newborn", "Family", "Corporate", "Other"
]

export const parseViews = (viewsStr) => {
    if (!viewsStr) return 0
    if (typeof viewsStr === 'number') return viewsStr
    const str = viewsStr.toString().toLowerCase()
    if (str.endsWith('k')) {
        return parseFloat(str) * 1000
    }
    if (str.endsWith('m')) {
        return parseFloat(str) * 1000000
    }
    return parseFloat(str) || 0
}

export const isDateInRange = (dateStr, rangeStr) => {
    if (rangeStr === 'all') return true

    // Assuming dateStr is in YYYY-MM-DD format
    const itemDate = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (rangeStr) {
        case 'today':
            return itemDate.getTime() === today.getTime()
        case '7days': {
            const sevenDaysAgo = new Date(today)
            sevenDaysAgo.setDate(today.getDate() - 7)
            return itemDate >= sevenDaysAgo
        }
        case '30days': {
            const thirtyDaysAgo = new Date(today)
            thirtyDaysAgo.setDate(today.getDate() - 30)
            return itemDate >= thirtyDaysAgo
        }
        case 'thisMonth': {
            return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear()
        }
        default:
            return true
    }
}
