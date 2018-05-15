import React from 'react';
import './App.css';
import ShelfMenu from './ShelfMenu';

const Book = (props) => {
     return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageSrc})` }}>{(props.imageSrc)?'':<span style={{display:'block',margin:'75px auto',textAlign:'center'}}>no cover image</span>}</div>
                    <ShelfMenu
                        menuOptions={props.shelf}
                        allCategories={props.allCategories}
                        handleShelfChange={props.handleShelfChange}
                        thisBook={props.thisBook}
                    />
                </div>
                <div className="book-title">{props.title}</div>
                <div className="book-authors">{
                    props.authors.map((authorName) => (
                        <div>{authorName}</div>
                    ))
                }</div>
            </div>
        );

}

Book.defaultProps = {
    title: undefined,
    imageSrc: undefined,
    authors: [],
    shelf: undefined,
    allCategories: []
}


export default Book;