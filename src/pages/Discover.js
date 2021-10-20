import React, {useState} from 'react';
import {API_KEY} from "../utils/consts";
import {useAxiosGet} from "../hooks/httpRequests";
import Loader from "../components/Loader";
import FilmCard from "../components/film-card/FilmCard";
import Container from "@mui/material/Container";
import PaginationRounded from "../components/Pagination";
import DropSelector from "../components/DropSelector";

const Discover = () => {
    const [releaseDateSortValue, setReleaseDateSortValue] = useState('asc');
    const [page, setPage] = useState(1)
    let content = null

    let discoverUrl = 'https://api.themoviedb.org/3/discover/movie' +
        '?api_key=' + API_KEY +
        '&page=' + page +
        '&sort_by=release_date.' + releaseDateSortValue
    ;
    let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`

    let films = useAxiosGet(discoverUrl)
    let genres = useAxiosGet(genresUrl)

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
            content = films.data.results.map((film, id) =>
                <FilmCard key={id} film={film} genres={genres.data.genres}/>
            )
        }
    }

    return (
        <div>
            <Container sx={{paddingTop: '50px'}} maxWidth="lg">
                <Container sx={{paddingBottom: '50px'}} maxWidth="lg">
                    <DropSelector
                        select={releaseDateSortValue}
                        setSelect={setReleaseDateSortValue}
                        options={["Asc", "Desc"]}
                        values={["asc", "desc"]}
                        label="Sort by release date"
                    />
                        { content }
                    <PaginationRounded setPage={setPage} countOfPages={films.data ? films.data.total_pages : 1}/>
                </Container>
            </Container>
        </div>

    );
};

export default Discover;