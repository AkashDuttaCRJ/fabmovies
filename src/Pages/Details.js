import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from "react-player/youtube";
import { BACKDROP_SIZE, fetchById, fetchCredits, fetchVideoUrl, IMAGE_URL, PROFILE_SIZE } from '../API';
import Plus from "../Assets/plus-solid.svg";
import Star from "../Assets/star-solid.svg";
import Check from "../Assets/check-solid.svg";
import NoImage from "../Assets/No-Image.png";
import "./Details.css";
import { WishlistContext } from '../WishlistContext';

const Details = ({ match }) => {
    const urlComponents = match.url.split("/");
    const [data, setData] = useState();
    const [credits, setCredits] = useState();
    const [videos, setVideos] = useState();
    const [currentActive, setCurrentActive] = useState(0);
    const [currentPlaying, setCurrentPlaying] = useState();
    const [isAdded, setIsAdded] = useState(false);

    const {wishlistMovies, setWishlistMovies,  wishlistShows, setWishlistShows} = useContext(WishlistContext);

    useEffect(() => {
        const getData = async () => {
            setData(await fetchById(urlComponents[1], urlComponents[2]));
            setCredits(await fetchCredits(urlComponents[1], urlComponents[2]));
            setVideos(await fetchVideoUrl(urlComponents[1], urlComponents[2]));
        }
        getData();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        videos && setCurrentPlaying(videos.results[0]?.key);
    }, [videos])

    useEffect(() => {
        const checkWishlistAdded = () => {
            urlComponents[1] === "movie"
            ? setIsAdded(wishlistMovies?.includes(data?.id))
            : setIsAdded(wishlistShows?.includes(data?.id));
        }
        checkWishlistAdded();
        // eslint-disable-next-line
    }, [data, wishlistMovies, wishlistShows])

    return (
        <>
        <div className="cover-container">
        {data?.backdrop_path && <img src={`${IMAGE_URL}${BACKDROP_SIZE}${data?.backdrop_path}`} alt={data?.title || data?.name} className="cover-img" />}
            <div className="content-container content-container-add">
                <div className="poster-container poster-container-add">
                    <img src={data?.poster_path ? `${IMAGE_URL}${BACKDROP_SIZE}${data?.poster_path}` : NoImage} alt="" className="poster" />
                </div>
                <div className="contents contents-add">
                    <h1 className="title">{data?.title || data?.name}</h1>
                    <p style={{ marginBottom: "1.5rem", color: "rgba(255,255,255,0.8)" }}><em>{data?.tagline}</em></p>
                    <div className="genres-container genres-container-add">
                        {data && data.genres.map((genre) => {
                        return (
                            <div key={genre.id} className="genre">
                            {genre.name}
                            </div>
                        );
                        })}
                    </div>
                    <div className="rating rating-add">
                        <img src={Star} alt="" className="star" />
                        {data?.vote_average}
                    </div>
                    <div className="btn-container">
                        <button 
                        className={isAdded ? "watch-btn grey grey-add green" : "watch-btn grey grey-add"}
                        title="Add to Wishlist" 
                        onClick={isAdded ? null : (() => {
                            urlComponents[1] === "movie"
                            ? setWishlistMovies(prev => prev.length === 0 ? [data?.id] :[...prev, data?.id])
                            : setWishlistShows(prev => prev.length === 0 ? [data?.id] :[...prev, data?.id]);
                        })}>
                        {isAdded ? <img src={Check} alt="" className="plus plus-add" /> : <img src={Plus} alt="" className="plus plus-add" />}
                        {isAdded ? "ADDED" : "ADD TO WISHLIST"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="body-details">
            <div className="body-details-section">
                <h3>Overview</h3>
                <p>{data?.overview}</p>
            </div>
            <div className="card-section-container">
                <h3 className="section-title section-title-add">Cast</h3>
                {credits?.cast ? <div className="section-card-container">
                    {credits?.cast.map((result) => {
                    return result.known_for_department === "Acting" && (
                            <div key={result.id} className="section-card section-card-add">
                                <div className="card-poster-container">
                                    <img
                                        src={result.profile_path ?`${IMAGE_URL}${PROFILE_SIZE}${result.profile_path}` : NoImage}
                                        alt=""
                                        className="card-poster card-poster-add"
                                    />
                                </div>
                                <p className="char-name">{result.character}</p>
                                <p className="actor-name"><em>{result.original_name}</em></p>
                            </div>
                    )
                    })}
                </div> : <div className="no-data">No casts to show</div>}
            </div>
            <div className="card-section-container">
                <h3 className="section-title section-title-add">Videos</h3>
                {videos?.results.length !== 0 ? <div className="section-card-container">
                {videos?.results.map((result, index) => {
                    return (
                    <div 
                    key={result.id} 
                    className={currentActive === index ? "section-card section-card-add section-card-add2 card-active" : "section-card section-card-add section-card-add2"} 
                    onClick={() => {
                        setCurrentActive(index);
                        setCurrentPlaying(result.key);
                    }}
                    >
                        <div className="card-poster-container card-poster-container-add">
                            <img
                                src={`https://i.ytimg.com/vi/${result.key}/hqdefault.jpg`}
                                alt=""
                                className="card-poster card-poster-add"
                            />
                        </div>
                    </div>)
                })}
                </div> : <div className="no-data">No videos to show</div>}
            </div>
            {currentPlaying && <div className="video-player">
                <ReactPlayer
                    controls={true}
                    playing={false}
                    width="100%"
                    height="100%"
                    url={`https://www.youtube.com/watch?v=${currentPlaying}`}
                />
            </div>}
        </div>
        </>
    )
}

export default Details
