import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CircularProgress } from "@mui/material";

export default function SingleReel({ url, title }) {
    const [isVideoPlaying, setisVideoPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const vidRef = useRef();

    const onVideoClick = () => {
        if (isVideoPlaying) {
            vidRef.current.pause();
            setisVideoPlaying(false);
        } else {
            vidRef.current.play();
            setisVideoPlaying(true);
        }
    };



    const handleLikeButton = () => {
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // When 50% of the video is in view
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    vidRef.current.play();
                    setisVideoPlaying(true);
                } else {
                    vidRef.current.pause();
                    setisVideoPlaying(false);
                }
            });
        }, options);

        observer.observe(vidRef.current);

        // Cleanup function
        return () => {
            observer.unobserve(vidRef.current);
        };
    }, []);


    const handleProgress = (e) => {
        if (isNaN(e.target.duration))
            return;
        setProgress((e.target.currentTime / e.target.duration) * 100);
    };

    const handleWaiting = () => {
        setIsBuffering(true);
    };

    const handleCanPlayThrough = () => {
        setIsBuffering(false);
    };

    return (

        <div className="video-cards">
            <video
                className="video-player"
                onTimeUpdate={handleProgress}
                onClick={onVideoClick}
                ref={vidRef}
                src={url}
                loop
                autoPlay
                muted
                onWaiting={handleWaiting}
                onCanPlayThrough={handleCanPlayThrough}
            />
            {isBuffering && (
                <div className="loader" >
                    <div className="buffering-overlay">
                        <CircularProgress />
                    </div>
                </div>
            )}
            <div className="video-controls">
                <button onClick={onVideoClick} className="play-button">
                    {isVideoPlaying ? <PauseCircleIcon fontSize="large" /> : <PlayCircleIcon fontSize="large" />}
                </button>
                <p className="title">{title}</p>
                <div className="like">
                    <FavoriteIcon onClick={handleLikeButton} sx={{ color: isLiked ? "red" : "white" }} />
                </div>
                <progress id="progress" max="100" value={progress}>
                    Progress
                </progress>
                

            </div>
        </div>
    );

}
