import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import Loading from "react-loading";

const GifPlayer = React.lazy(() => import('react-gif-player'))
const Gallery = React.lazy(() => import('react-stack-gallery'))

const GIPHY = () => {
    const [gifs, setGifs] = useState([]);

    const gifInRedux = useSelector((state) => state.gifs.gifs.data)

    useEffect(() => {
        setGifs(gifInRedux)
    }, [gifInRedux])

    return (
        <React.Suspense fallback={<Loading type="spin" className="loader-spin" color="#03e9f4" />}>
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
        </React.Suspense>
    );

}

export default GIPHY

