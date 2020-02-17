import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem
} from '@ionic/react';
import {
  send
} from 'ionicons/icons';
import '../Tab1.css';
import { me } from '../../store/user'
import { createMessage } from '../../store/message'

interface IMyComponentState {
  message: string
}
interface IMyComponentProps {
  me: any,
  user: object,
  createMessage: any
}
class NewMessageEntry extends Component<IMyComponentProps, IMyComponentState>{

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.props.me()
  }

  async handleSubmit(evt) {
    evt.preventDefault();

    let m = window.localStorage.getItem('messages')
    if (m === null) {
      let s = [{ content: this.state.message, author: this.props.user }]
      window.localStorage.setItem('messages', JSON.stringify(s))
    }
    else {
      let s;
      s = [...JSON.parse(m || ''), { content: this.state.message, author: this.props.user }]
      window.localStorage.setItem('messages', JSON.stringify(s))
    }

    await this.props.createMessage({
      message: this.state.message,
      ownerId: this.props.user['id'],
      status: this.props.user['status'],
    })
    var myDiv = document.getElementsByClassName("items");
    // await myDiv[myDiv.length - 1].scrollIntoView()
    await this.setState({ message: '' })
  }

  render() {
    return (
      <div className="entry">
        <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
          <IonInput
            type="text"
            name="message"
            value={this.state.message}
            onIonChange={e =>
              this.setState({ message: (e.target as HTMLInputElement).value })
            }

            placeholder="Say something nice..."
            style={{ '--background': 'white' }}

          />

          <IonButton size="default" type="submit">
            <IonIcon slot="start" color="black" icon={send} mode="ios" />
            <IonLabel style={{ padding: '10px', width: '100%' }}
              mode="ios"
            >
              Send
          </IonLabel>
          </IonButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    me: () => dispatch(me()),
    createMessage: (message) => dispatch(createMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
