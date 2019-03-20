import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      created: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author, created } = this.state;

    this.ref.add({
      title,
      description,
      author,
      created
    }).then((docRef) => {

      var createdDate = new Date().toGMTString();
      console.log("created date:", created);

      this.setState({
        title: '',
        description: '',
        author: '',
        created: createdDate
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <
                div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" defaultValue={title} onChange={this.onChange} placeholder="Title" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80" rows="3"
                  value={description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" defaultValue={author} onChange={this.onChange} placeholder="Author" />
              </div>



              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
