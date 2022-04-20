import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import 'antd/dist/antd.css';
import "./App.css"
import { Skeleton } from 'antd';
import { connect } from "react-redux";
import { trendingGifs, searchGifs } from "./store/action/userAction";
import Loading from "react-loading";
const GIPHY = React.lazy(() => import('./components/GiphyComponent'));


class App extends Component {
    state = {
        gif: {},
        slimit: 15,
        tlimit: 15,
        search: false,
        searchItem: "",
        darkMode: false,
        isMoreContent: true,
    };

    componentDidMount() {
        if (localStorage.getItem("darkMode") === 'true') {
            this.setState({ darkMode: true });
        }
        else if (localStorage.getItem("darkMode") === 'false') {
            this.setState({ darkMode: false });
        }
        else {
            localStorage.setItem("darkMode", false)
            this.setState({ darkMode: false });
        }
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        const box = document.getElementById('lastMarker');
        let observer = new IntersectionObserver(() => {
            this.loadMore()
        }, options);
        observer.observe(box);
    }

    trending = async () => {
        let trendingRes = await this.props.trendingGifs(this.state.tlimit);
        if (trendingRes === false) this.setState({ isMoreContent: false })
    };

    search = async (q, cb) => {
        this.setState({ searchItem: q });
        this.setState({ search: true });
        if (q == '') {
            this.trending();
            cb(false)
        }
        else {
            let searchRes = await this.props.searchGifs(q, this.state.slimit);
            if (searchRes === true && cb != null) { cb(false) }
            else if (searchRes === false) { this.setState({ isMoreContent: false }) }
        }
    };

    loadMore = () => {
        if (this.state.search === true) {
            this.setState({ slimit: this.state.slimit + 5 });
            this.search(this.state.searchItem);
        } else {
            this.setState({ tlimit: this.state.tlimit + 5 })
            this.trending();
        }
    };

    handleMode = (e) => {
        // console.log("switch", e.target.checked);
        localStorage.setItem("darkMode", e.target.checked);
        this.setState({ darkMode: e.target.checked })
    }



    render() {
        return (
            <div className={`App ${this.state.darkMode ? "dark" : ""}`}>
                <section className="header">
                    <p className="title">Giphy Store</p>
                    <SearchBar onSearch={this.search} />
                    <div className="mode-switcher">
                        <p className="mode-text">{this.state.darkMode ? "Go Light" : "Go Dark"}</p>
                        <label className="switch">
                            <input type="checkbox" checked={this.state.darkMode} onChange={e => this.handleMode(e)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
                <section className="content">
                    <React.Suspense fallback={<Loading type="spin" className="loader-spin" color="#03e9f4" />}>
                        <GIPHY gifs={this.state.gif} />
                    </React.Suspense>
                </section>
                {
                    this.state.isMoreContent
                        ?
                        <ul id="lastMarker" >
                            <li className="loader-block">
                                <Skeleton active />
                            </li>
                        </ul>
                        :
                        <div className="no-content">No More Content to show</div>
                }
            </div>
        );
    }
}

export default connect((state) => { return { gifs: state.gifs.gifs } }, { trendingGifs, searchGifs })(App);