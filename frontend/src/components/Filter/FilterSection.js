import {
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Button,
    Typography, Slider
} from "@mui/material";
import React, {useState} from 'react'
import {CATEGORY_FILTER, DIFFICULTY_FILTER} from "../../assets/constants";

const FilterSection = (props) => {
    const [range, setRange] = useState(0);
    const handleRangeChange = (event, newValue) => {
        setRange(newValue);
    };
    const [catFilter, setCatFilter] = useState(CATEGORY_FILTER.map(item => {
        return {
            name: item.name,
            checked: false
        }
    }) );
    const [difFilter, setDifFilter] = useState(DIFFICULTY_FILTER.map(item => {
        return {
            name: item.name,
            checked: false
        }
    }));

    const handleDifFilterChange = (event, index) => {
        const list = [...difFilter];
        list[index]['checked'] = event.target.checked;
        setDifFilter( list);
    };

    const handleCatFilterChange = (event, index) => {
        const list = [...catFilter];
        list[index]['checked'] = event.target.checked;
        setCatFilter( list);
    };

    const onApplyFilter = () => {
        props.setFilterOn(true);
        let categories = catFilter.filter(cat => cat.checked);
        let difficulty = difFilter.filter(diff => diff.checked);
        props.setFilter([categories, difficulty, range]);
    }

    const onRemoveFilter = () => {
        let unsetCat = CATEGORY_FILTER.map(item => {
            return {
                name: item.name,
                checked: false
            }
        }) ;
        setCatFilter(unsetCat);
        let unsetDif = DIFFICULTY_FILTER.map(item => {
            return {
                name: item.name,
                checked: false
            }
        }) ;
        setDifFilter(unsetDif);
        setRange(0);
        props.setFilter([null, null, null]);
        props.setFilterOn(false);
    }

    return (
        <div>
            <div style={{textAlign: 'left'}}>
                <Typography variant="h6" gutterBottom>
                    Filter
                </Typography>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant={'body1'} textAlign={'left'}>Category Filter</Typography>
                    </FormLabel>
                    <FormGroup>
                        {
                            catFilter.map((item, index) => {
                                return <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={item.checked}
                                            onChange={(event) => handleCatFilterChange(event,index)}
                                            name={item.name}
                                        />
                                    }
                                    label={ <Typography variant={'body2'} textAlign={'left'}>
                                        {item.name}
                                    </Typography>
                                    }
                                />
                            })
                        }
                    </FormGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant={'body1'} textAlign={'left'}>Difficulty Filter</Typography>
                    </FormLabel>
                    <FormGroup>
                        {
                            difFilter.map((item, index) => {
                                return <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={item.checked}
                                            onChange={(event) => handleDifFilterChange(event,index)}
                                            name={item.name}
                                        />
                                    }
                                    label={ <Typography variant={'body2'} textAlign={'left'}>
                                        {item.name}
                                    </Typography>
                                    }
                                />
                            })
                        }
                    </FormGroup>
                </FormControl>
                <FormLabel component="legend">
                    <Typography variant={'body1'} textAlign={'left'}>Cooking Time (min)</Typography>
                </FormLabel>
                <Slider
                    value={range}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                />
                {
                    props.filterOn ?  <Button variant={"contained"} fullWidth={true}
                                              onClick={onRemoveFilter}>Remove Filter</Button>
                        :
                        <Button variant={"contained"} fullWidth={true}
                                onClick={onApplyFilter}>Apply Filter</Button>
                }
            </div>
        </div>
    );
}

export default FilterSection;