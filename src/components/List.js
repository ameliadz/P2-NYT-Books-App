import React, { Component } from 'react';
import axios from 'axios';

class List extends Component {
  renderBooks() {
    const { books } = this.props;
    let coverImg;
    return books.map((book, index) => {
      // is there a way to run through the ISBNs until totalItems > 0 ?
       axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbns[0].isbn10}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`)
         .then(response => console.log(response.data))
         .then(data => data.items[0])
         .then(item => item.volumeInfo)
         .then(info => info.imageLinks.thumbnail)
         .then(image => {
           coverImg = image;
           console.log(coverImg)
           return coverImg;
           // i'm really struggling to get this out of this fetch...
         })
         .catch(error => console.log(error))
      return (
        <div key={index}>
          <h3>{book.book_details[0].title}</h3>
          <p>{book.book_details[0].contributor}</p>
          <p>{book.book_details[0].description}</p>
          <img src={coverImg} alt={`${book.book_details[0].title} cover`} />
        </div>
      )
    })
  }

  render() {
    console.log(this.props)
    return(
      <div>
        {this.renderBooks()}
      </div>
    )
  }
}

export default List;
