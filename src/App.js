import React, { Component } from 'react';
import convert from 'xml-to-json-promise';
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
      selected: ''
    }
    this.handleChoice = this.handleChoice.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  async handleChoice(e) {
    console.log(e.target.value);
    await this.setState({
      selected: e.target.value
    })
    await this.fetchList(this.state.selected);
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

  getInfo = async () => {
    try {
      const { list } = this.state;
      console.log('got', this.state.list)
      list.map(async book => {
        let goodreadsApiKey = process.env.REACT_APP_GOODREADS_API_KEY;
        let isbn = book.book_details[0].primary_isbn13;
        if (book.isbns[0]) {
          isbn = book.isbns[0].isbn;
          const fetchInfo = await axios.get(`https://www.goodreads.com/search/index.xml?key=${goodreadsApiKey}&q=${isbn}`, {Accept: 'application/json'})
          convert.xmlDataToJSON(fetchInfo.data)
            .then((data) => {
              let result = data.GoodreadsResponse.search[0].results[0].work[0];
              console.log(result)
              book.cover = result.best_book[0].image_url[0];
              book.rating = result.average_rating[0];
              book.count = result.ratings_count[0];
            })
        } else {
          console.log(`how about no`);
        }
      })
    }
    catch (err) {
      console.log('error', err.message);
    }
  }

  renderBooks() {
    this.getInfo();
    return this.state.list.map((item, index) => {
      return (
        <List book={item} key={index}/>
      )
    })
  }

  render() {
    return (
      <div>
        <Header select={this.handleChoice}/>
        {this.renderBooks()}
      </div>
    );
  }
}

export default App;
