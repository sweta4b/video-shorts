import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./App.css";

export default function Footer() {

    const [isLiked, setIsLiked] = useState(false)

    const handleLikeButton = () => {
        setIsLiked(!isLiked)
    }

    return (
        <div className="video-footer">
            <div className="footer-buttons">
                <div className="flex-box">
                    <FavoriteIcon onClick={handleLikeButton} sx={{ color: isLiked ? "red" : "white" }} />
                </div>
            </div>
        </div>
    );
}
