import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage, updateMessage } from '../store/actions/messages';
import MessageItem from './MessageItem';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { currentUser, messages, removeMessage } = this.props;
    let messageList = messages.map(message => (
      <MessageItem
        key={message._id}
        messageId={message._id}
        text={message.text}
        username={message.user.username}
        profileImageUrl={message.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, message.user._id, message._id)}
        isCorrectUser={currentUser === message.user._id}
        currentUserId={currentUser}
        // updateMessage={updateMessage.bind(this,message.user._id, message._id)}
      />
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {fetchMessages, removeMessage, updateMessage})(MessageList);
