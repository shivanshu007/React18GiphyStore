import React, { useState } from "react";
import Loading from "react-loading";


const SearchBar = (props) => {
    const [isLoading, setIsLoading] = useState(false)


    function debounce(func, timeout = 1000) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    function searchInput(e) {
        // console.log('Searching data', e.target.value);
        setIsLoading(true)
        props.onSearch(e.target.value, setIsLoading)
    }

    const handleChange = debounce((e) => searchInput(e));
    return (
        <div className="search-area">
            <input
                name="search"
                className="input-gif"
                type="text"
                onChange={handleChange}
                placeholder="Search any gif here."
            />
            {isLoading ? <Loading type="spin" className="loader-spin" color="#03e9f4" /> : null}
        </div>
    );
}

export default SearchBar


