import React, { useState, useEffect } from "react";
// import GIPHY from "./components/GIPHY";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import 'antd/dist/antd.css';
import "./App.css"
import { Skeleton } from 'antd';
import GIPHY from './components/GiphyComponent'
import { useSelector, useDispatch } from 'react-redux'
import { searchGifs, trendingGifs } from "./store/action/userAction";
// const GIPHY = React.lazy(() => import('./components/GIPHY'));
// const api = axios.create({
//     baseURL: "https://api.giphy.com/v1/gifs"
// });


const App = () => {
    const [limit, setLimit] = useState(15)
    const [darkMode, setDarkMode] = useState(false)
    const [query, setQuery] = useState('')
    const [search, setSearch] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("darkMode")) {
            // console.log("mode in cdm", localStorage.getItem("darkMode"));
            setDarkMode(localStorage.getItem("darkMode"));
        }
        else {
            setDarkMode(false);
        }
    }, [localStorage.getItem("darkMode")])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        const box = document.getElementById('lastMarker');
        let observer = new IntersectionObserver((entries) => {
            // console.log("entry", entries);
            if (entries[0].intersectionRatio <= 0) {
                return;
            };
            loadMore()
        }, options);
        observer.observe(box);
    }, [])


    const trending = () => {
        console.log("limit trending", limit);
        dispatch(trendingGifs(limit))
    };

    const searchGIF = (q, cb) => {
        // setSearch(true)
        console.log("limit search", limit);
        setQuery(q)
        const isSearched = dispatch(searchGifs(query, limit))
        // if (isSearched) cb(false)
    };

    const loadMore = () => {
        console.log("loadmore", limit);
        setLimit(limit + 5);
        if (query != '') {
            searchGIF()
        } else {
            trending()
        }
    };

    const handleMode = (e) => {
        console.log("switch", e.target.checked);
        localStorage.setItem("darkMode", e.target.checked);
        setDarkMode(e.target.checked)
    }
    return (
        <div className={`App ${darkMode ? "dark" : ""}`}>
            <section className="header">
                <p className="title">Giphy Store</p>
                <SearchBar onSearch={searchGIF} />
                <div className="mode-switcher">
                    {darkMode ? "Go Light" : "Go Dark"}
                    <label className="switch">
                        <input type="checkbox" checked={darkMode} onChange={handleMode} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </section>
            <section className="content">
                <GIPHY />
            </section>
            <div id="lastMarker" >
                <Skeleton active />
                <Skeleton active />
            </div>
        </div>
    )
}

export default App

