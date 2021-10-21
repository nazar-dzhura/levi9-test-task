import React, {useEffect, useState} from 'react';
import {API_KEY} from "../utils/consts";
import {useAxiosGet} from "../hooks/httpRequests";
import Loader from "../components/Loader";
import FilmCard from "../components/film-card/FilmCard";
import Container from "@mui/material/Container";
import PaginationRounded from "../components/Pagination";
import DropSelector from "../components/selectors/DropSelector";
import MultipleSelector from "../components/selectors/MultipleSelector";

const Discover = () => {
    const [page, setPage] = useState(1)
    const [releaseDateSortValue, setReleaseDateSortValue] = useState('asc');
    const [genreSelectorValues, setGenreSelectorValues] = useState([])
    const [wantedGenresIdsUrlSlice, setWantedGenresIdsUrlSlice] = useState('')
    let content = null

    let discoverUrl = 'https://api.themoviedb.org/3/discover/movie' +
        '?api_key=' + API_KEY +
        '&page=' + Math.ceil(page/2) +
        '&sort_by=release_date.' + releaseDateSortValue +
        '&with_genres=' + wantedGenresIdsUrlSlice
    ;

    //film object contains array of genres ids, but if we need their names - they should be reached separately
    let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`

    let films = useAxiosGet(discoverUrl)
    let genres = useAxiosGet(genresUrl)

    useEffect(() => {
        let wantedGenresIds = ''
        for (const genreSelectorValue of genreSelectorValues) {
            for (const genre of genres.data.genres) {
                if (genre.name === genreSelectorValue) {
                    wantedGenresIds += genre.id + '%2C'
                }
            }
        }
        setWantedGenresIdsUrlSlice(wantedGenresIds)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreSelectorValues]);

    if (films.error) {
        content = <div className="bg-blue-300 mb-2 p-3 rounded">
            There was an error. Please, try to reload the page.
        </div>
    }

    if (films.loading) {
        content = <Loader/>
    }

    if(films.data) {
        if(genres.data) {
            const splitArray  =  //needed to split limit items per page
                page % 2 !== 0
                ? 
                films.data.results.slice(0, Math.round(films.data.results.length/2)) 
                :
                films.data.results.slice(Math.round(films.data.results.length/2), films.data.results.length)
            content = splitArray.map((film, id) =>
                <FilmCard key={id} film={film} genres={genres.data.genres}/>
            )
        }
    }

    return (
        <div>
            <Container maxWidth="lg">
                <Container sx={{paddingBottom: '50px'}} maxWidth="lg">
                    <DropSelector
                        select={releaseDateSortValue}
                        setSelect={setReleaseDateSortValue}
                        options={["Asc", "Desc"]}
                        values={["asc", "desc"]}
                        label="Sort by release date"
                    />
                    <MultipleSelector
                        select={genreSelectorValues}
                        setSelect={setGenreSelectorValues}
                        label="Filter by genres"
                        placeholder="Select"
                        options={genres.data ? genres.data.genres.map(item => item.name) : []}
                        values={genres.data ? genres.data.genres.map(item => item.name) : []}/>
                    { content }
                    <PaginationRounded setPage={setPage} countOfPages={films.data ? films.data.total_pages * 2 : 1}/>
                </Container>
            </Container>
        </div>

    );
};

export default Discover;