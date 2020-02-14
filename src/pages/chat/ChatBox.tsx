import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent
} from '@ionic/react';
import {
  send
} from 'ionicons/icons';
import { me } from '../../store/user'
import '../Tab1.css';
import AllMessages from './AllMessages'
import NewMessageEntry from './NewMessageEntry'
interface IMyComponentState {
  message: string
}
interface IMyComponentProps {
  me: any,
  user: object,
}
class ChatBox extends Component<IMyComponentProps, IMyComponentState>{

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }

  }

  async componentDidMount() {
    await this.props.me();

  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>ChatBox</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }} >
          <div className="chatBox">
            <AllMessages />
            <NewMessageEntry />
          </div>


        </IonContent>
      </IonPage>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
