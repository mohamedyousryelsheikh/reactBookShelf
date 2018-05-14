import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'

class ShelfMenu extends React.Component {
    constructor(props){
        super(props);
    }
   changeShelf = (event) => {
        this.props.handleShelfChange(this.props.thisBook, event.target.value);
        this.setState({
            currentShelf: event.target.value,
        });
    };

    render() {
        return (
            <div className="book-shelf-changer">
            <select onChange={this.changeShelf}>
            
                    <option value="none" disabled>Move to...</option>
                    <option  value="currentlyReading" selected={this.props.menuOptions === 'currentlyReading' && 'selected'}>Currently Reading</option>
                    <option value="wantToRead" selected={this.props.menuOptions === 'wantToRead' && 'selected'}>Want to Read</option>
                    <option value="read" selected={this.props.menuOptions === 'read' && 'selected'}>Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}
ShelfMenu.defaultProps = {
   menuOptions:'',
   currentShelf:undefined
}


export default ShelfMenu;