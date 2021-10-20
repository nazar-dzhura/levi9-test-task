import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {InputLabel} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function MultipleSelector({select, setSelect, options, values, label, placeholder}) {
    const classes = useStyles();
    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">{placeholder}</InputLabel>
            <Select
                multiple
                value={select}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {options ? options
                    .map(((option, key) =><MenuItem key={key} value={values[key]}>{option}</MenuItem>)) : null}
            </Select>
            <FormHelperText>{label}</FormHelperText>
        </FormControl>
    );
}

MultipleSelector.propTypes = {
    select: PropTypes.array.isRequired,
    setSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.array.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string
}

export default MultipleSelector