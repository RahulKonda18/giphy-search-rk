import "./index.css";
import { Component } from "react";
import GifItem from "../GifItem";
import Cookies from "js-cookie";
import Logo from "../../giphy-search.png";
import { Navigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { BsSearchHeart, BsHeartbreak } from "react-icons/bs";
import Pagination from "../Pagination/Pagination";

const pages = [1, 2, 3, 4, 5];

class Home extends Component {
  state = {
    searchInput: "",
    offset: 0,
    searchResults: [],
    favourites: [],
    showFavourites: false,
    isLoading: false,
  };

  onFavourite = (fav) => {
    const { favourites } = this.state;
    if (favourites.includes(fav)) {
      const index = favourites.indexOf(fav);
      if (index > -1) {
        favourites.splice(index, 1);
        this.setState({ favourites: favourites });
      }
    } else {
      this.setState((prev) => ({ favourites: [...prev.favourites, fav] }));
    }
  };

  changeOffset = (val) => {
    this.setState({ offset: val * 20 });
    this.searchGifs();
  };

  searchGifs = async () => {
    const { searchInput, offset } = this.state;

    const gifs = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=15&offset=${offset}&q=${searchInput}`
    );
    const res = await gifs.json();
    this.setState({ searchResults: res.data, isLoading: false });
  };

  onChange = (e) => {
    this.setState({
      searchInput: e.target.value,
      isLoading: true,
    });
    this.searchGifs();
  };

  showFavourites = () => {
    this.setState((prev) => ({
      showFavourites: !prev.showFavourites,
    }));
  };

  showFavouritesFalse = () => {
    this.setState({ showFavourites: false });
  };

  navigateToHome = () => {
    Cookies.remove("giphy_search_token");
    this.setState({});
    console.log("removed");
  };

  renderLoader = () => {
    return (
      <div className="products-loader-container">
        <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    );
  };

  renderAddFavourites = () => {
    <div className="center-align">
      <div className="row-align">
        <h1 className="message">There are no Favourites yet</h1>
      </div>
      <BsSearchHeart color="#ebd834" size={60} />
    </div>;
  };

  renderEmptyView = (showFavourites) => {
    if (showFavourites) {
      return (
        <div className="center-align">
          <div className="row-align">
            <h1 className="message">There are no Favourites</h1>
          </div>
          <BsHeartbreak color="#ebd834" size={60} />
        </div>
      );
    }
    return (
      <div className="center-align">
        <div className="row-align">
          <h1 className="message">Search to get the results</h1>
        </div>
        <BsSearchHeart color="#ebd834" size={60} />
      </div>
    );
  };

  render() {
    const {
      searchResults,
      searchInput,
      favourites,
      isLoading,
      showFavourites,
    } = this.state;
    const results = showFavourites ? favourites : searchResults;
    if (Cookies.get("giphy_search_token") === undefined) {
      return <Navigate to="/" replace={true} />;
    }
    return (
      <div>
        <div className="home-container">
          <div className="search-bar">
            <img className="nav-logo" src={Logo} alt="logo" />
            <input
              type="text"
              onChange={this.onChange}
              value={searchInput}
              className="search-input"
              placeholder="Search"
              onClick={this.showFavouritesFalse}
            />
            <button
              className={showFavourites ? "alter-bg" : "search-button"}
              type="button"
              onClick={this.showFavourites}
            >
              Favourites
            </button>
            <h2 className="log-out" onClick={this.navigateToHome}>
              Log out
            </h2>
          </div>
          {isLoading ? (
            this.renderLoader()
          ) : results.length === 0 ? (
            this.renderEmptyView(showFavourites)
          ) : (
            <div>
              <ul className="results-list">
                {results.map((each) => (
                  <GifItem
                    onFavourite={this.onFavourite}
                    favourites={favourites}
                    data={each}
                    key={each.id}
                  />
                ))}
              </ul>
              <ul className="pages">
                {pages.map((each) => (
                  <Pagination
                    key={each}
                    data={each}
                    change={this.changeOffset}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
