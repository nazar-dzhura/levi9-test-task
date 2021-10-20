import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function PaginationRounded({setPage, countOfPages}) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        setPage(value);
    }

    return (
        <div className={classes.root} style={{display: "flex", justifyContent: "center"}}>
            <Pagination count={countOfPages} onChange={handleChange} shape="rounded" className="pb-5"  />
        </div>
    );
}

PaginationRounded.propTypes = {
    setPage: PropTypes.func,
    countOfPages: PropTypes.number
}

export default PaginationRounded