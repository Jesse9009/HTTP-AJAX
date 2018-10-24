import React from 'react';
import axios from 'axios';
import Friend from './Friend';
import { ListWrapper, StyledForm } from './Styled';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: '',
      age: '',
      email: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(data => {
        console.log(data.data);
        this.setState({ friends: data.data });
        console.log(this.state);
      })
      .catch(() => alert('Error'));
  }

  handleInput = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('Clicked');
    console.log(this.state.friends);
    if (this.state.name && this.state.age && this.state.email) {
      this.setState({
        friends: [
          ...this.state.friends,
          {
            id: this.state.friends.length + 1,
            name: this.state.name,
            age: this.state.age,
            email: this.state.email
          }
        ],
        name: '',
        age: '',
        email: ''
      });
    } else {
      alert('Please enter name, age and email');
    }
  };

  render() {
    return (
      <div>
        {/* <h1>Friends List:</h1> */}
        <StyledForm>
          <h3>Add a friend</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.handleInput}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            onChange={this.handleInput}
            value={this.state.age}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={this.handleInput}
            value={this.state.email}
          />
          <button onClick={this.handleSubmit}>Add Friend</button>
        </StyledForm>
        <br />
        <br />
        <br />
        <ListWrapper>
          <Friend name="Name" age="Age" email="Email" />
          {this.state.friends.map(friend => {
            return (
              <Friend
                key={friend.id}
                name={friend.name}
                age={friend.age}
                email={friend.email}
              />
            );
          })}
        </ListWrapper>
      </div>
    );
  }
}

export default FriendsList;