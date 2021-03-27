import React from "react";
import { register } from "../services/userService";
import authService from "../services/authService";
import Form from "./common/form";
import Joi from "joi-browser";

export default class LoginForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      const token = response.headers["x-auth-token"];
      authService.loginWithJwt(token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="col-6">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
