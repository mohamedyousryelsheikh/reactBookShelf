import React from 'react';
import Book from './Book';
import './App.css';

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        (props.booksAtShelf.length)?
                        props.booksAtShelf.map((book) => (
                            <li key={book.id}>
                                <Book
                                    title={book.title}
                                    imageSrc={book.imageLinks.thumbnail}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    allCategories={props.allCategories}
                                    handleShelfChange={props.handleShelfChange}
                                    thisBook={book}
                                />
                            </li>

                        )
                        ):<div style={{ color: '#d7d7d7'}}>No Books Found</div>
                    }

                </ol>
            </div>
        </div>
    );
}



Shelf.defaultProps = {
    booksAtShelf: [],
    shelfTitle: 'no category name',
    allCategories: []
}


export default Shelf;