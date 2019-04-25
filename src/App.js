import React, { Component } from 'react';
import convert from 'xml-to-json-promise';
import './App.css';
import axios from 'axios'

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selected: '',
      duplicate: [],
      error: null
    }
    this.handleChoice = this.handleChoice.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  async handleChoice(e) {
    await this.setState({
      selected: e.target.value,
      duplicate: []
    })
    await this.fetchList(this.state.selected);
    await this.getInfo();
  }

  async fetchList(select) {
    this.setState({
      list: [],
      error: null
    });
    let apiKey = process.env.REACT_APP_NYT_BOOKS_API_KEY;
    await axios.get(`https://api.nytimes.com/svc/books/v3/lists.json?list=${select}&api-key=${apiKey}`, {Accept: 'application/json'})
      .then(response => response.data)
      .then(data => data.results)
      .then(results => {
        this.setState({ list: results })
      })
      .catch(error => {
        this.setState({
          error: `${error} -- There was a problem fetching your data, please try again.`
        })
      });
  }

  async getInfo () {
    try {
      const { list } = this.state;
      let config = {headers: {"X-Requested-With" : "XMLHttpRequest"}};
      list.map(async (book, index) => {
        let goodreadsApiKey = process.env.REACT_APP_GOODREADS_API_KEY;
        let isbn = book.book_details[0].primary_isbn13;
        if (book.isbns[0] && book.isbns[0].isbn10 && book.isbns[0].isbn10 !== 'None') {
          isbn = book.isbns[0].isbn10;
        }
        const fetchInfo = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${goodreadsApiKey}&q=${isbn}`, config)
        convert.xmlDataToJSON(fetchInfo.data)
          .then(async (data) => {
            if (!data.GoodreadsResponse.search[0].results[0].work) {
              this.state.duplicate.push(book);
            } else {
              let result = data.GoodreadsResponse.search[0].results[0].work[0];
              const clone = {...book};
              clone.cover = result.best_book[0].image_url[0];
              clone.rating = result.average_rating[0];
              clone.count = result.ratings_count[0];
              this.state.duplicate.push(clone);
            }
            await this.setState({
              list: this.state.duplicate
            });
          })
          .catch(error => {
            this.setState({
              error: `${error} -- Could not connect to Goodreads.`
            })
          })
      })
    }
    catch (error) {
      this.setState({
        error: `${error} -- Could not connect to Goodreads.`
      })
    }
  }

  renderBooks() {
    const { selected } = this.state;
    let isWeekly = !((selected === "audio-fiction") || (selected === "audio-nonfiction") || (selected === "business-books") || (selected === "science") || (selected === "music") );
    return (
      this.state.list.sort((a,b) => a.rank - b.rank)
      .map((item, index) => {
        return (
          <List book={item} key={index} weekly={isWeekly} />
        )
      })
    )
  }

  render() {
    return (
      <div className="container">
        <Header select={this.handleChoice}/>
        {this.state.error ? this.state.error :
        this.state.list.length ?
        this.state.list.length === 10 ? <div className="list ten">{this.renderBooks()}</div> : <div className="list fifteen">{this.renderBooks()}</div>  : <h2>Loading...</h2>}
        <Footer />
      </div>
    );
  }
}

export default App;
