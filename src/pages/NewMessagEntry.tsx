import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Chat.css';
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
import { me } from '../store/user'
interface IMyComponentState {
  message: string
}
interface IMyComponentProps {
  me: any,
  user: object,
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

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state)
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
    this.setState({ message: '' })
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="chat">
          <IonItem lines="none">
            <div className="input">
              <IonInput
                className="form-control"
                type="text"
                name="message"
                value={this.state.message}
                onIonChange={e =>
                  this.setState({ message: (e.target as HTMLInputElement).value })
                }
                placeholder="Say something nice..."
                style={{ "marginLeft": "10px", "width": "80%" }}

              />
            </div>

          </IonItem>

          <IonButton className="btnSend" size="small" type="submit">
            <IonIcon slot="start" color="medium" icon={send} mode="ios" />
            <IonLabel style={{ padding: '5px' }}
              mode="ios"
            >
              Send
                      </IonLabel>
          </IonButton>
        </div>
      </form>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
