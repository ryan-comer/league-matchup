import {
    Box,
    Button,
    Typography,
} from '@mui/material'

import ChampionPicker from '../components/ChampionPicker'

import { useState } from 'react'
import axios from 'axios'
import { ChampionToURLName } from '../utils/championUtils'

const CHAMPIONS_KEY = "LEAGUE_CHAMPIONS"
const CHAMPIONS_URL = "http://ddragon.leagueoflegends.com/cdn/%s/data/en_US/champion.json"

// 1 - A > B
// 0 - A == B
// -1 - A < B
function compareVersions(versionOne, versionTwo){
    const versionOneParts = versionOne.split('.')
    const versionTwoParts = versionTwo.split('.')

    // Check first part
    const partOneA = parseInt(versionOneParts[0])
    const partOneB = parseInt(versionTwoParts[0])
    if (partOneA > partOneB) {
        return 1
    } else if (partOneA < partOneB){
        return -1
    }

    // Check second part
    const partTwoA = parseInt(versionOneParts[1])
    const partTwoB = parseInt(versionTwoParts[1])
    if (partTwoA > partTwoB) {
        return 1
    } else if (partTwoA < partTwoB){
        return -1
    }

    // Check third part
    const partThreeA = parseInt(versionOneParts[2])
    const partThreeB = parseInt(versionTwoParts[2])
    if (partThreeA > partThreeB) {
        return 1
    } else if (partThreeA === partThreeB) {
        return 0
    } else {
        return -1
    }
}

// Get the most recent league version
async function getCurrentLeagueVersion(){
    const versionJson = (await axios.get('https://ddragon.leagueoflegends.com/api/versions.json'))['data']
    return versionJson[0]
}

function MainPage(props){

    const [champions, setChampions] = useState(null)
    const [yourChampion, setYourChampion] = useState(null)
    const [theirChampion, setTheirChampion] = useState(null)
    if (champions === null) {
        getChampionData()
    }

    function yourPick(champion) {
        setYourChampion(champion)
    }

    function theirPick(champion) {
        setTheirChampion(champion)
    }

    // Launch the windows based on the matchup selection
    function launch() {
        window.ipcRenderer.send('launch', `http://www.leagueofgraphs.com/champions/runes/${ChampionToURLName(yourChampion)}/vs-${ChampionToURLName(theirChampion)}`)
        window.ipcRenderer.send('launch', `http://www.leagueofgraphs.com/champions/items/${ChampionToURLName(yourChampion)}/vs-${ChampionToURLName(theirChampion)}`)
        window.ipcRenderer.send('launch', `http://www.leagueofgraphs.com/champions/spells/${ChampionToURLName(yourChampion)}/vs-${ChampionToURLName(theirChampion)}`)
    }

    // Initialize the champion data for the dropdowns
    async function getChampionData() {
        let champions
        const newestVersion = await getCurrentLeagueVersion()
        const url = CHAMPIONS_URL.replace('%s', newestVersion)

        // First check local storage
        champions = JSON.parse(await localStorage.getItem(CHAMPIONS_KEY))
        if(champions === null){
            console.log('Pulling initial champions data')
            // Champions are null - pull from internet
            champions = (await axios.get(url)).data

            // Save to local storage
            localStorage.setItem(CHAMPIONS_KEY, JSON.stringify(champions))
            setChampions(champions)
        } else {
            // Found local storage - check version
            if (compareVersions(champions.version, newestVersion) !== 0) {
                console.log('Refreshing champion data')
                // Refresh data - version doesn't match
                champions = (await axios.get(url)).data

                // Save to local storage
                localStorage.setItem(CHAMPIONS_KEY, JSON.stringify(champions))
                setChampions(champions)
            } else {
                // Just set champions fro local storage
                setChampions(champions)
            }
        }
    }

    return (
        <Box
            sx={{
                padding: 4
            }}
        >
            <Typography variant='h5' textAlign="center">
                Select the champion that you are playing and the champion you are playing against. Press 'Launch' to open the web pages for that matchup.
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: 4
            }}>
                <ChampionPicker label="Your champion" champions={champions} onValueChange={yourPick}/>
                <ChampionPicker label="Their champion" champions={champions} onValueChange={theirPick}/>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Button variant='contained' color='secondary' onClick={launch}>Launch</Button>
            </Box>
        </Box>
    )
}

export default MainPage