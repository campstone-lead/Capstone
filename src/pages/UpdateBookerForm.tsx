import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonItem, IonInput, IonButton } from '@ionic/react';
import './Tab1.css';
import { connect } from 'react-redux'
import { updatedBooker } from '../store/booker'

interface IMyComponentState {

}

interface IMyComponentProps {

}

class UpdateBookerForm extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            imageURL: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        return (
            <IonPage>
                <IonHeader >
                    <IonToolbar id="bar" >
                        <IonTitle>Update Your Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="welcome-card">
                    <form onSubmit={this.handleSubmit}>

                    </form>
                </div>
            </IonPage>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBookerForm)
