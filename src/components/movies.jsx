import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "./../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import authService from "../services/authService";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchString: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    this.setState({ movies: await getMovies() });
    this.setState({
      genres: [{ _id: "", name: "All" }, ...(await getGenres())],
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has been already deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleToggleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchString: "" });
  };
  handleSelectGenre = (e) => {
    const _id = e.currentTarget.value;
    const genre = this.state.genres.find((g) => g._id === _id);
    this.setState({ selectedGenre: genre, searchString: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchString: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      searchString,
      sortColumn,
    } = this.state;

    let filtered = movies;
    if (searchString)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchString.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const paged = paginate(sorted, pageSize, currentPage);
    return { paged, filtered };
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchString,
      sortColumn,
    } = this.state;

    const user = authService.getCurrentUser();

    if (movies.length === 0) return <p>There are no movies in the database.</p>;

    const { paged, filtered } = this.getPagedData();

    return (
      <>
        <p>Showing {filtered.length} movies in the database</p>

        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {user && (
              <Link className="btn btn-primary mb-2" to="/movies/new">
                New Movie
              </Link>
            )}
            <SearchBox value={searchString} onChange={this.handleSearch} />
            <MoviesTable
              movies={paged}
              onDelete={this.handleDelete}
              onToggleLike={this.handleToggleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={filtered.length}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}
