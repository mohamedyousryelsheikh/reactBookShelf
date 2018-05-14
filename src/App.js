import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import _ from 'lodash'
import Book from './Book'
import ShelfMenu from './ShelfMenu';
import loadingGif from './icons/Loading_icon.gif'
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }
 
  state = { 
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    shelfCategories: [
      {
        key: 'currentlyReading',
        value: 'Currently Reading'
      },
      {
        key: 'wantToRead',
        value: 'want To Read'
      },
      {
        key: 'read',
        value: 'read'
      }
    ],
    status: false,
    searchQueryValue: '',
    queryBooks: []
  }
  componentWillMount() {
    console.log("component will mount");
  }
  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState(
        {
          allBooks: books
        }
      )
      let getElement = this.state.allBooks.find(book => book.id == 'nggnmAEACAAJ');

    });
  }

  handleShelfChange(book, shelfUpdate) {
    book.shelf = shelfUpdate;
    BooksAPI.update(book, shelfUpdate).then(() => {


    })
    this.setState(() => ({

      allBooks: this.state.allBooks.filter(x => (x.id !== book.id)).concat([book])
    }));

  }
  getShelfBooks(shelfName) {
    return this.state.books.filter((book) => book.shelf === shelfName)
  }

  searchQuery(event) {
    this.setState({ value: event.target.value });
    BooksAPI.search(this.state.value).then((books) => {
      if (books) {
        this.setState({
          queryBooks: books
        })
      }
      console.log(this.state.queryBooks)

    });
  }
  render() {
    return (
      <div className="app">
        {this.state.status && <div>true value</div>}
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.value} onChange={this.searchQuery} placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {

                  this.state.queryBooks.map((book) => (
                    <li key={book.id}>
                      <Book
                        title={book.title}
                        imageSrc={book.imageLinks.thumbnail}
                        authors={book.authors}
                        shelf={book.shelf}
                        
                        handleShelfChange={this.handleShelfChange}
                        thisBook={book}
                      />
                    </li>

                  )
                  )
                }
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {
                    (this.state.allBooks.length)?
                    this.state.shelfCategories.map((cat) =>
                     
                      <Shelf
                        booksAtShelf={this.state.allBooks.filter(book => book.shelf === cat.key)}
                        shelfTitle={cat.value}
                        allCategories={this.state.shelfCategories}
                        handleShelfChange={this.handleShelfChange}
                      />
                    ):<div style={{ color: '#333'}}>Loading
                        <img src={loadingGif} />
                      </div>
                      
                  }


                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}
Shelf.defaultProps = {
  showSearchPage: false,
  allBooks: [],
  shelfCategories: [],
  status: false,
  searchQueryValue: '',
  queryBooks: []
}





export default BooksApp
