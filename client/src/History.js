import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class History extends Component {
  state = {
    wspolczynniki: [],
    wartosci: [],
    k: "",
  };

  componentDidMount() {
    this.pobierzWartosci();
    this.pobierzWspolczynniki();
  }

  async pobierzWspolczynniki() {
    const wspolczynniki = await axios.get("/api/values/lastFive");
    console.log(wspolczynniki);
    this.setState({
      wspolczynniki: wspolczynniki.data,
    });
  }

  wyswietlOstatnieWspolczynniki() {
    return this.state.wspolczynniki.map(({ k }) => k).join(", ");
  }
  async pobierzWartosci() {
    const wartosci = await axios.get("/api/calcValues/lastFive");
    this.setState({ wartosci: wartosci.data });
  }

  wyswietlOstatnieObliczenia() {
    const entries = [];

    this.state.wartosci.forEach((calcV) => {
      entries.push(
        <div key={calcV["k"]}>
          Dla k = {calcV["k"]} obliczona wartość to {calcV["calcValue"]}
        </div>
      );
    });
    return entries;
  }
  render() {
    return (
      <Fragment>
        <h3>5 ostatnich wprowadzonych współczynników k</h3>
        {this.wyswietlOstatnieWspolczynniki()}
        <h3>5 ostatnich obliczeń dla ciągu 3^k</h3>
        {this.wyswietlOstatnieObliczenia()}
        <Link to="/gscalc">Ukryj historię obliczeń</Link>
      </Fragment>
    );
  }
}

export default History;
