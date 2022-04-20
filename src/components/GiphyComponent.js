import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import Gallery from "react-stack-gallery";
import GifPlayer from "react-gif-player";


const GIPHY = () => {
    const [gifs, setGifs] = useState([]);

    const gifInRedux = useSelector((state) => state.gifs.gifs.data)

    useEffect(() => {
        setGifs(gifInRedux)
    }, [gifInRedux])

    return (
        <Gallery>
            {gifs && gifs.map((gif) => {
                return (
                    <div className="gif_player" key={gif.id}>
                        <GifPlayer
                            gif={gif.images.original.url}
                            still={gif.images.original_still.url}
                        />
                    </div>
                );
            })}
        </Gallery>
    );

}

export default GIPHY

