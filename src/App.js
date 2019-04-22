import React, { Component } from 'react';
import './App.css';
//import { Route, Link } from 'react-router-dom';
import axios from 'axios'

import Header from './components/Header';
import List from './components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selected: '',
      cover: ''
    }
    this.handleChoice = this.handleChoice.bind(this);
    this.fetchList = this.fetchList.bind(this);
  }

  async handleChoice(e) {
    console.log(e.target.value);
    await this.setState({
      selected: e.target.value
    })
    this.fetchList(this.state.selected);
  }

  async fetchList(select) {
    let apiKey = process.env.REACT_APP_NYT_BOOKS_API_KEY;
    await axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${select}&api-key=${apiKey}`, {Accept: 'application/json'})
      .then(response => response.data)
      .then(data => data.results)
      .then(results => {
        this.setState({ list: results })
      })
      .catch(error => console.log('There was a problem fetching your data. Please try again.', error));
  }

  render() {
    return (
      <div>
        <Header select={this.handleChoice}/>
        <List books={this.state.list} cover={this.state.cover} />
      </div>
    );
  }
}

export default App;
