import React, { Component } from 'react';

class List extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <p><span className="title">{book.book_details[0].title}</span><br /><span className="author"> {book.book_details[0].contributor}</span></p>
        <p>{book.book_details[0].description}</p>
        { book.cover ? <img src={`${book.cover}`} alt={`${book.book_details[0].title} cover`} className="cover" /> : <div className="no-image cover"></div>}
        <p><strong>#{book.rank}</strong>{ this.props.weekly ? `, on this list for ${book.weeks_on_list} ${book.weeks_on_list === 1 ? 'week' : 'weeks'}.` : null }</p>
        { book.rating ? <p><em>Goodreads Rating:</em> {book.rating} out of 5, based on {book.count._} {book.count._ === 1 ? 'review' : 'reviews'}.</p> : <p><em>Unable to get Goodreads data for this item.</em></p>}
      </div>
    )
  }
}

export default List;
