import React, { Component } from 'react';
//import axios from 'axios';

class List extends Component {
  render() {
    const { book } = this.props;
    console.log(book);
    return (
      <div className="book">
        <p><span>{book.book_details[0].title}</span> {book.book_details[0].contributor}</p>
        <p>{book.book_details[0].description}</p>
        {book.cover ? <img src={`${book.cover}`} alt={`${book.book_details[0].title} cover`} className="cover" /> : <div className="no-image cover"></div>}
        <p>Rank: {book.rank}, on this list for {book.weeks_on_list} week(s)</p>
        <p><em>Goodreads Rating:</em> {book.rating} out of 5, based on {book.count._} reviews.</p>
      </div>
    )
  }
}

export default List;

//audios & hardcover are stupid, don't use them
