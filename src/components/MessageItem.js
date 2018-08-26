import React, {Component} from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import {updateMessage} from '../store/actions/messages';
import {connect} from 'react-redux';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editIsClicked: false,
      text: this.props.text
    }
  }

  handleEdit = e => {
    e.preventDefault();
    this.setState({editIsClicked: true});
  }

  handleChange = e => {
    this.setState({text: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateMessage(this.props.currentUserId, this.props.messageId, this.state.text);
    this.setState({editIsClicked: false});
  }

  render() {
    let { date, profileImageUrl, text, username, removeMessage, updateMessage, isCorrectUser, currentUserId, messageId } = this.props;
    return (
      <div>
        <li className="list-group-item">
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <div >
            <Link to="/">@{username} &nbsp;</Link>
            <span className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </span>
            {!this.state.editIsClicked ?
              <p>{text}</p>
              :
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-success pull-left">
                  Save
                </button>
              </form>
            }
            {isCorrectUser && !this.state.editIsClicked ?
              <div>
                <a
                  className="btn btn-danger"
                  onClick={removeMessage}
                  >
                    Delete
                </a>
                <a
                  className="btn btn-warning"
                  onClick={this.handleEdit}
                  style={{margin: "0px 5px"}}
                  >
                    Edit
                </a>
              </div>
            : null
            }
          </div>
        </li>
      </div>
    );
  }
}

export default connect(null, {updateMessage})(MessageItem);
