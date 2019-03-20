import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import firebase from '../Firebase';



class Index extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author, created } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        created
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  //copied from show component
  delete(id) {
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              BOARD LIST -Index
            </h3>
          </div>
          <div className="panel-body">

            <h4>
              <Link to="/create" className="btn btn-primary">Add Board</Link>
              &nbsp;
              <Link to="/materialdemo" className="btn btn-primary">materialdemo</Link>
            </h4>


            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Created</th>

                  <th>actions</th>
                </tr>
              </thead>

              <tbody>
                {this.state.boards.map(board =>
                  <tr key={board.key}>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                    <td>{board.created}</td>

                    <td>
                      <button onClick={this.delete.bind(this, board.key)} className="btn btn-danger">Delete</button>

                      <Link to={`/edit/${board.key}`} className="btn btn-success">Edit</Link>&nbsp;
                    </td>

                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
