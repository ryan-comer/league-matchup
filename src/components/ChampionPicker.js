import {
    Autocomplete,
    Box,
    TextField,
    Typography
} from '@mui/material'

import { useState } from 'react'

export default function ChampionPicker(props){
    const [championOptions, setChampionOptions] = useState([])
    if (props.champions && championOptions.length === 0) {
        const championsList = []
        for (const key in props.champions.data) {
            championsList.push({
                label: props.champions.data[key].name,
                image: props.champions.data[key].image.full
            })
        }

        setChampionOptions(championsList)
    }

    return (
        <Box>
            <Autocomplete
                sx={{width: 400}}
                options={championOptions}
                getOptionLabel={(option) => option.label}
                autoComplete={true}
                autoHighlight={true}
                autoSelect={true}
                onChange={(e, data) => props.onValueChange(data.label)}
                renderInput={(params) => <TextField {...params} label={props.label}/>}
                /*
                renderOption={(props, option, state) => (
                    <Box
                        sx={{
                            display: 'flex'
                        }}
                    >
                        <img
                            sx={{
                                maxWidth: 30,
                                minWidth: 30,
                                marginRight: 5
                            }}
                        />
                        <TextField label={option.label}/>
                    </Box>
                )}
                */
                color='primary'
            />
        </Box>
    )
}