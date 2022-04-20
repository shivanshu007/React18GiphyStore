import React, { Component } from "react";
// import GIPHY from "./components/GIPHY";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import ReactLoading from "react-loading";
import 'antd/dist/antd.css';
import "./App.css"
import { Skeleton, Switch, List, Avatar } from 'antd';
import GIPHY from './components/GiphyComponent'
import { connect } from "react-redux";
import { trendingGifs, searchGifs } from "./store/action/userAction";
// const GIPHY = React.lazy(() => import('./components/GIPHY'));


class App extends Component {
    state = {
        gif: {},
        limit: 25,
        search: false,
        searchItem: "",
        darkMode: false
    };

    componentDidMount() {
        if (localStorage.getItem("darkMode") == 'true') {
            this.setState({ darkMode: true });
        }
        else if (localStorage.getItem("darkMode") == 'false') {
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
        let observer = new IntersectionObserver((entries) => {
            // console.log("entry", entries);
            if (entries[0].intersectionRatio <= 0) {
                return;
            };
            this.loadMore()
        }, options);
        observer.observe(box);
    }
    trending = () => {
        this.props.trendingGifs(this.state.limit)
    };

    search = async (q, cb) => {
        this.setState({ searchItem: q });
        this.setState({ search: true });
        const res = await this.props.searchGifs(this.state.searchItem, this.state.limit)
        if (res === true) cb(false)
    };

    loadMore = () => {
        this.setState({
            limit: this.state.limit + 5
        });
        if (this.state.search === true) {
            this.search(this.state.searchItem);
        } else {
            this.trending();
        }
    };

    handleMode = (e) => {
        console.log("switch", e.target.checked);
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
                        {this.state.darkMode ? "Go Light" : "Go Dark"}
                        <label className="switch">
                            <input type="checkbox" checked={this.state.darkMode} onChange={e => this.handleMode(e)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
                <section className="content">
                    <GIPHY gifs={this.state.gif} />
                </section>
                <ul id="lastMarker" >
                    <li className="loader-block">
                        <Skeleton active />
                    </li>
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { gifs: state.gifs.gifs };
};




export default connect(mapStateToProps, { trendingGifs, searchGifs })(App);