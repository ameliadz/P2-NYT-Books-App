# P2 - NYT Books App: NYT BOOKS N STUFF

### Summary
DEPLOYED AT: https://adz-bestselling-books.herokuapp.com/<br />
Gets up-to-date Best Seller list data from the New York Times Books API and uses it to get Goodreads data. These books are currently bestsellers, but do people actually enjoy reading them?

### Tech
This app uses React and Axios and be styled with CSS. Data gotten via axios GET requests to the NYT Books API and, based on that, sourced additional information and resources from the Goodreads API.

### Wireframes
![wireframe](https://user-images.githubusercontent.com/47397924/56769005-f6298580-677d-11e9-8c6e-d8f5beb56786.jpeg)
<br />
Result:
![Screen Shot 2019-04-25 at 5 29 02 PM](https://user-images.githubusercontent.com/47397924/56769613-ba8fbb00-677f-11e9-9eb1-a07fc0022775.png)

### Component Hierarchy
![hierarchy](https://user-images.githubusercontent.com/47397924/56769016-fde92a00-677d-11e9-8067-37fea2290f07.jpeg)

### Minimum Viable Product
- This app fetches current NYT best seller lists, then uses that information to get additional information (cover art and ratings) from Goodreads, and renders the books on the list to the page.
- Also hopefully it looks nice.

### External Resources
A post on the Goodreads developers forum helped me figure out how to manage the consistent CORS error by providing a header and routing through a cors-anywhere heroku app.

### Code Snippets
![Screen Shot 2019-04-25 at 5 31 19 PM](https://user-images.githubusercontent.com/47397924/56769703-ff1b5680-677f-11e9-819d-d9deb3bcb3ad.png)<br />
^ the super annoying process of trying to parse the Goodreads data and have it update the objects in the book list array, and handle all the weird inconsistencies in ISBNs and response structures.

<hr />

### Post-MVP
- May add ability to save a book to a favorites list or wishlist using local storage and React Router. This idea came to me about 2 hours before the project was due, so... it's on the to-do list.
