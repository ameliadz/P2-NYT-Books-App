import React, { Component } from 'react';
//import axios from 'axios';

class List extends Component {
  render() {
    const { book } = this.props;
    console.log(book);
    console.log('cover', book.cover)
    return (
      <div className="book">
        <p><span>{book.book_details[0].title}</span> {book.book_details[0].contributor}</p>
        <p>{book.book_details[0].description}</p>
        {book.cover ? <img src={`${book.cover}`} alt={`${book.book_details[0].title} cover`} className="cover" /> : <div className="no-image cover"></div>}
      </div>
    )
  }
}

export default List;

//audios & hardcover are stupid, don't use them
