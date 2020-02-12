import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonBackButton, IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import './Tab1.css';
import { connect } from 'react-redux'
import { editBooker } from '../store/booker'
import { me } from '../store/user'
import {
    call,
    mailOpen,
    person,
    lock
} from 'ionicons/icons';
import { UploadPicture } from '../AppImports';

interface IMyComponentState {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;

    password: string;
}

interface IMyComponentProps {
    booker: object;
    editBooker: any;
    me: any;
}

class UpdateBookerForm extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        await this.props.me()
        let booker = window.localStorage.getItem('booker')
        console.log('BOOKER:', booker)
        if (booker !== null) {
            booker = JSON.parse(booker || '');
            let newBooker = booker || {};
            this.setState({
                email: newBooker['email'],
                firstName: newBooker['firstName'],
                lastName: newBooker['lastName'],
                phone: newBooker['phone'],
                password: newBooker['password']
            })
        }
    }


    handleSubmit(event) {
        event.preventDefault()
        this.props.editBooker(this.props["match"]["params"]["id"], this.state);

        this.setState({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            password: this.state.password
        })
    }

    render() {
        return (
            <IonPage>
                <IonHeader >
                    <IonToolbar id="bar" >
                        <IonTitle>Update Your Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonBackButton mode="ios"
                        text=" Back "
                        color="dark"
                        className="backBtn"
                        defaultHref={'/profile'}
                    />
                    <UploadPicture />

                    <div className="welcome-card">
                        <form onSubmit={this.handleSubmit}>
                            <IonItem lines="inset">
                                <IonIcon slot="start" color="medium" icon={person} />
                                <IonInput type="text" placeholder="First Name" required
                                    value={this.state.firstName}
                                    onIonChange={e =>
                                        this.setState({
                                            firstName: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <IonInput type="text" placeholder="Last Name" required
                                    value={this.state.lastName}
                                    onIonChange={e =>
                                        this.setState({
                                            lastName: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <div style={{ margin: "10px" }}>
                                    <IonItem lines="none">

                                        <IonButton type="submit" disabled={(this.state.firstName.length && this.state.lastName.length === 0) ? true : false}
                                            size="default"
                                        >Update</IonButton>
                                    </IonItem>
                                </div>
                            </IonItem>

                            <IonItem lines="inset">
                                <IonIcon slot="start" color="medium" icon={call} />
                                <IonInput type="text" placeholder="Phone number" required
                                    value={this.state.phone}
                                    onIonChange={e =>
                                        this.setState({
                                            phone: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <div style={{ margin: "10px" }}>
                                    <IonItem lines="none">

                                        <IonButton type="submit" disabled={(this.state.phone.length === 0) ? true : false}
                                            size="default"
                                        >Update</IonButton>
                                    </IonItem>
                                </div>
                            </IonItem>

                            <IonItem lines="inset">
                                <IonIcon slot="start" color="medium" icon={mailOpen} />
                                <IonInput type="email" placeholder="Email" required
                                    value={this.state.email}
                                    onIonChange={e =>
                                        this.setState({
                                            email: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <div style={{ margin: "10px" }}>
                                    <IonItem lines="none">

                                        <IonButton type="submit" disabled={(this.state.email.length === 0) ? true : false}
                                            size="default"
                                        >Update</IonButton>
                                    </IonItem>
                                </div>
                            </IonItem>
                            <IonItem lines="inset">
                                <IonIcon slot="start" color="medium" icon={lock} />
                                <IonInput type="password" placeholder="Password" required
                                    value={this.state.password}
                                    onIonChange={e =>
                                        this.setState({
                                            password: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <div style={{ margin: "10px" }}>
                                    <IonItem lines="none">

                                        <IonButton
                                            type="submit"
                                            disabled={(this.state.password.length === 0) ? true : false}
                                            size="default"
                                        >Update</IonButton>
                                    </IonItem>
                                </div>
                            </IonItem>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

const mapStateToProps = (state) => ({
    booker: state.booker
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    editBooker: (id, editedBooker) => dispatch(editBooker(id, editedBooker))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBookerForm)
