// Convert a champion to their name in the matchup URL
export function ChampionToURLName(champion) {
    if (champion.toLowerCase() === 'wukong') {
        return 'monkeyking'
    } else if (champion.toLowerCase() === 'renata glasc') {
        return 'renata'
    } else {
        return champion.replace(' ', '').replace("\'", '').replace('.', '').toLowerCase()
    }
}