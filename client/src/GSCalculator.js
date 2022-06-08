import React, { Component, Fragment } from "react";
import axios from "axios";
import { MemoryRouter as Router, Route, Link } from "react-router-dom";
import History from "./History";

class GSCalc extends Component {
  state = {
    k: "",
  };

  wyslijDane = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      k: this.state.k,
    });
    this.setState({ k: "" });
  };

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <form onSubmit={this.wyslijDane}>
              <label>Wprowadź współczynnik ciągu k:</label> <br />
              <input
                value={this.state.k}
                onChange={(event) => this.setState({ k: event.target.value })}
              />
              <button>Zatwierdź</button>
            </form>
          </div>
          <div>
            <Link to="/history">Pokaż historię obliczeń</Link>
            <div>
              <Route path="/history" component={History} />
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default GSCalc;
