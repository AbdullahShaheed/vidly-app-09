import React from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "./../services/movieService";
import Form from "./common/form";
import { getGenres } from "../services/genreService";

export default class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.optional(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };

  async populateFormWithGenres() {
    this.setState({ genres: await getGenres() });
  }

  async populateFormWithMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    this.populateFormWithGenres();
    this.populateFormWithMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <>
        <h1>Movie - {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Movie Title")}
          {this.renderSelect("genreId", "Genre")}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}
