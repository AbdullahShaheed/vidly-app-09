import { Component } from "react";
import authService from "../services/authService";

export default class Logout extends Component {
  componentDidMount() {
    authService.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}
