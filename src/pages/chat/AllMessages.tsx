import React, { Component, RefObject } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket'
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  IonVirtualScroll,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonCardHeader,
  IonCard,
  IonTitle,
  IonItem
} from '@ionic/react';
import {
  send
} from 'ionicons/icons';
import '../Tab1.css';
import { me } from '../../store/user'
import message, { fetchMessages, createMessage, postMessage } from '../../store/message'
import { threadId } from 'worker_threads';
interface IMyComponentState {
  message: string,

}
interface IMyComponentProps {
  me: any,
  user: object,
  fetchMessages: any,
  createMessage: any,
  messages: any,
  postMessage: any

}

class AllMessages extends Component<IMyComponentProps, IMyComponentState>{
  cardRef: any | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.cardRef = React.createRef()
  }

  async componentDidMount() {
    await this.props.me();
    await this.props.fetchMessages()

    if (this.cardRef.current) {
      let last = this.cardRef.current.getElementsByClassName('items')[this.cardRef.current.getElementsByClassName('items').length - 1]
      last.scrollTop = last.offsetHeight;
    }
    socket.on('send-message', (message) => {


      this.props.postMessage(message)
    })
  }
  async componentDidUpdate() {
    if (this.cardRef.current) {
      await this.cardRef.current.getElementsByClassName('items')[this.cardRef.current.getElementsByClassName('items').length - 1].scrollIntoView();
    }

  }
  render() {

    if (this.props.messages.length === 0) return <IonTitle>Loading</IonTitle>

    return (

      <div className="allMessages" ref={this.cardRef}>

        {
          this.props.messages.map((message, index) => {

            return (

              <IonCard
                key={index}
                className="messageEntry"
                style={{
                  width: '90%', '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)', height: '3%',

                }}
                mode="ios"

              >
                <IonCardHeader className="items">

                  <IonItem lines='none' style={{ '--background': 'none' }} >
                    <img src={message['ownerImageURL']} alt={message['name']} />
                  </IonItem>
                  <IonItemGroup>
                    <IonCardTitle>{message['ownerName']}</IonCardTitle>
                    <IonCardSubtitle>{message['message']}</IonCardSubtitle>
                  </IonItemGroup>
                </IonCardHeader>
              </IonCard>

            )
          })
        }

      </div>



    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    me: () => dispatch(me()),
    fetchMessages: () => dispatch(fetchMessages()),
    createMessage: (message) => dispatch(createMessage(message)),
    postMessage: (message) => dispatch(postMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMessages);
