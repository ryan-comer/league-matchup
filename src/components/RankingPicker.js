import { Box, Autocomplete, TextField } from '@mui/material'

// The possible ranks to choose from
const ranks = [
    {
        label: 'Iron+',
        urlName: 'iron'
    },
    {
        label: 'Bronze+',
        urlName: 'bronze'
    },
    {
        label: 'Silver+',
        urlName: 'silver'
    },
    {
        label: 'Gold+',
        urlName: 'gold'
    },
    {
        label: 'Platinum+',
        urlName: ''
    },
    {
        label: 'Diamond+',
        urlName: 'diamond'
    },
    {
        label: 'Master+',
        urlName: 'master'
    },
]

export default function RankingPicker(props) {
    return (
        <Box>
            <Autocomplete
                sx={{width: 300}}
                options={ranks}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label='Rank'/>}
                onChange={(e, data) => props.onValueChange(data.urlName)}
            />
        </Box>
    )
}