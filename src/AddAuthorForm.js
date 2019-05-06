import React from 'react';
import { connect } from 'react-redux';
import  { withRouter } from 'react-router-dom';
import "./AddAuthorForm.css"

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageUrl: "",
            books: [],  // filled on submit
            bookTemp: '', // current input 
        }
        // because onFieldChange uses constructor, we have to bind the callback;
        // the value of THIS in the method (onFieldChange) will be the same as... 
        // the value of THIS in the constructor!
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); 
        this.props.onAddAuthor(this.state) // prop onAddAuthor is in the component AddAuthorForm
    }

    // always reads from constructor
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: '' // clear bookTemp value
        })
    }

    render () {
        return <form onSubmit={this.handleSubmit}>
                <div className='AddAuthorForm__input'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name='name' value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className='AddAuthorForm__input'>
                    <label htmlFor='imageUrl'>Image URL</label>
                    <input type="text" name='imageUrl' value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
                <div className='AddAuthorForm__input'>
                    {this.state.books.map((book)=> <p key={book}>{book}</p>)}
                    <label htmlFor='bookTemp'>Books</label>
                    <input type="text" name='bookTemp' value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <input type="button" value="+" onClick={this.handleAddBook}/>
                </div>
                <input type="submit" value="Add"/>
            </form>
    }
}

function AddAuthorForm({match, onAddAuthor}) {
     return <div className='AddAuthorForm'>
            <h1>Add Author</h1>
            <AuthorForm onAddAuthor={onAddAuthor}/>
            </div>
}

function mapDispatchToProps (dispatch, props) {
    return {
       onAddAuthor: (author) => {
           dispatch({ type: 'ADD_AUTHOR', author });
            // navigate to root url
            props.history.push('/');

       }
    };
}

// no read from Redux store --- Empty function
export default withRouter(connect(()=>{}, mapDispatchToProps)(AddAuthorForm));
