import React, { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class Home extends Component {
  state = {
    jobsList: [],
    jwtToken: Cookies.get("jwt_token"),
  };

  componentDidMount() {
    this.getJobsList();
  }

  getJobsList = async () => {
    const { jwtToken } = this.state;
    if (!jwtToken) {
      return;
    }

    const apiUrl = "https://mini-project-nine-rho.vercel.app/jobs";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData);
        this.setState({ jobsList: fetchedData });
      } else {
        console.error("Failed to fetch jobs list");
      }
    } catch (error) {
      console.error("Error fetching jobs list:", error);
    }
  };

  render() {
    const { jobsList, jwtToken } = this.state;

    if (!jwtToken) {
      return <Navigate to="/some-path" />;
    }

    return <div>Home Page</div>;
  }
}

export default Home;
