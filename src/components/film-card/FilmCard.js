import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import no_image from '../../assets/img/no_image.jpg'
import './film-card.css'

const FilmCard = ({film, genres}) => {
    const genresNames = []
    for (const genreId of film.genre_ids) {  //getting genre names by comparing with ids
        for (const genre of genres) {
            if (genre.id === genreId) {genresNames.push(genre.name)}
        }
    }

    return (
        <Card className="film-card">
            <CardMedia
                className="film-card__image"
                component="img"
                image={film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : no_image}
                alt={film.original_title + " poster"}
            />
            <Box>
                <CardContent>
                    <Typography className="film-card__title" component="div" variant="h4">
                        {film.original_title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{my: 2}}>
                        {film.release_date.match(/\d{4}/)}
                    </Typography>
                    <Typography className="film-card__additional" component="div">
                        {genresNames.length === 0 ? 'Genres for this film was not specified' : genresNames.map((name) =>
                            (genresNames.indexOf(name) !== genresNames.length -1 ? `${name}, ` : `${name}`))}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}


FilmCard.propTypes = {
    film: PropTypes.shape({
        genre_ids: PropTypes.arrayOf(PropTypes.number),
        poster_path: PropTypes.string,
        original_title: PropTypes.string,
        release_date: PropTypes.string
    }),
    genres: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    )
};

export default FilmCard;