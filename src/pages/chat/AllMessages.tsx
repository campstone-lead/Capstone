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
  IonItem,
  IonIcon,
  IonAvatar
} from '@ionic/react';
import {
  send
} from 'ionicons/icons';
import '../Tab1.css';
import user, { me } from '../../store/user'
import { fetchMessages, createMessage, postMessage } from '../../store/message'


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

            var dateObj = new Date(message['createdAt'])
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            let day = dateObj.toLocaleTimeString('en-us', options).split(',')[0];
            var datetime = day + ', '
              + dateObj.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

            return (

              <IonCard
                key={index}
                className="messageEntry"
                style={((this.props.user['status'] === message['status']) && (this.props.user['id'] === message['ownerId'])) ?
                  {
                    float: 'left',
                    marginLeft: '12px',
                    width: '80%',
                    background: 'url(https://wallpaperaccess.com/full/851202.jpg)'
                  } :
                  {
                    float: 'right',
                    marginRight: '22px',
                    width: '75%',
                    height: '15%',
                    background: 'url(https://wallpaperaccess.com/full/851202.jpg)',

                  }
                } mode="ios">



                <IonCardHeader className="items" >


                  <img src={message['ownerImageURL']} alt={message['name']} />




                  <IonItemGroup>
                    <h6 className="title" style={{ fontSize: '18px' }}>{message['ownerName']}</h6>
                    <p style={{ fontSize: '15px', color: 'black' }}>{message['message']}</p>
                    <p> {datetime}</p>

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
