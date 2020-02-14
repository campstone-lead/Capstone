import React from 'react';
import { IonContent, IonHeader, IonPage, IonAvatar, IonTitle, IonLabel, IonToolbar, IonBackButton, IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import './Tab1.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { connect } from 'react-redux'
import { editBooker } from '../store/booker'
import axios from 'axios'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { me } from '../store/user'
import {
    call,
    mailOpen,
    person,
    lock,
    add,
    camera
} from 'ionicons/icons';

axios.defaults.withCredentials = true;
const { Camera } = Plugins;

interface IMyComponentState {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    imageURL: string;
    selectedFile: any

}

interface IMyComponentProps {
    booker: object;
    editBooker: any;
    me: any;
    user: object;
}

class UpdateBookerForm extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: '',
            selectedFile: null,
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: ''

        }
        defineCustomElements(window);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeHandler = async  event => {
        event.persist()
        await this.setState({
            selectedFile: event.target.files[0],
        })

        await this.setState({ imageURL: this.state.selectedFile.name })
        let obj = this.state
        window.localStorage.setItem('booker', JSON.stringify(obj))
    }

    onClickHandler = async (e) => {
        e.preventDefault() // <-- missing this
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        const res = await axios({
            method: "post",
            baseURL: "http://localhost:8080/",
            url: `/upload`,
            data: formData
        })
        console.log(res.data)
    }

    async componentDidMount() {
        await this.props.me()
        let booker = window.localStorage.getItem('booker')

        this.setState({
            email: this.props.user['email'],
            imageURL: this.props.user['imageURL'],
            firstName: this.props.user['firstName'],
            lastName: this.props.user['lastName'],
            phone: this.props.user['phone'],

        })

        if (booker !== null) {
            booker = JSON.parse(booker || '');
            let newBooker = booker || {};
            this.setState({
                email: newBooker['email'],
                imageURL: newBooker['imageURL'],
                firstName: newBooker['firstName'],
                lastName: newBooker['lastName'],
                phone: newBooker['phone'],

            })
        } else {
            window.localStorage.setItem('booker', JSON.stringify(this.state))
        }
    }
    async takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos,
        });

        var imageURL = image.webPath;
        // Can be set to the src of an image now
        await this.setState({
            imageURL: imageURL || '',
        });
        let obj = this.state
        window.localStorage.setItem('booker', JSON.stringify(obj))
    }


    handleSubmit(event) {
        event.preventDefault()
        this.props.editBooker(this.state);

        // this.setState({
        //     email: this.state.email,
        //     imageURL: this.state.imageURL,
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     phone: this.state.phone,
        //     password: this.state.password
        // })
    }

    render() {
        return (
            <IonPage>
                <IonHeader >
                    <IonToolbar id="bar" style={{ '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)' }}>
                        <IonTitle>Update Your Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent style={{
                    '--background':
                        'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
                }}>
                    <IonBackButton mode="ios"
                        text=" Back "
                        color="dark"
                        className="backBtn"
                        defaultHref={'/profile'}
                    />

                    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", alignContent: "center" }}>
                        <IonAvatar style={{ width: '170px', height: '170px', marginTop: '20px', borderRadius: "50px" }}>
                            <img src={this.state.imageURL} alt='img' />
                        </IonAvatar>
                    </div>


                    < div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                        <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" style={{ backgroundColor: 'white', borderRadius: '25px' }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center" }}>
                        <IonButton onClick={this.onClickHandler} disabled={

                            (this.state.selectedFile === null) ? true : false
                        }>
                            <IonIcon icon={add}></IonIcon>
                            <IonLabel>Upload picture</IonLabel>
                        </IonButton>

                        <IonButton onClick={() => this.takePicture()}>
                            <IonIcon icon={camera}></IonIcon>
                            <IonLabel>Take picture</IonLabel>
                        </IonButton>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", alignContent: "center" }}>
                        <form onSubmit={this.handleSubmit}>
                            <IonItem lines="inset" style={{ '--background': 'none' }}>
                                <IonIcon slot="start" color="black" icon={person} />
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

                            </IonItem>

                            <IonItem lines="inset" style={{ '--background': 'none' }}>
                                <IonIcon slot="start" color="black" icon={call} />
                                <IonInput type="text" placeholder="Phone number" required
                                    value={this.state.phone}
                                    onIonChange={e =>
                                        this.setState({
                                            phone: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />

                            </IonItem>

                            <IonItem lines="inset" style={{ '--background': 'none' }}>
                                <IonIcon slot="start" color="black" icon={mailOpen} />
                                <IonInput type="email" placeholder="Email" required
                                    value={this.state.email}
                                    onIonChange={e =>
                                        this.setState({
                                            email: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />

                            </IonItem>
                            <IonItem lines="inset" style={{ '--background': 'none' }}>
                                <IonIcon slot="start" color="black" icon={lock} />
                                <IonInput type="password" placeholder="Password" required
                                    value={this.state.password}
                                    onIonChange={e =>
                                        this.setState({
                                            password: (e.target as HTMLInputElement).value,
                                        })
                                    }
                                />
                                <div style={{ margin: "10px" }}>
                                    <IonItem lines="none" style={{ '--background': 'none' }}>

                                        <IonButton
                                            type="submit"
                                            disabled={(this.state.password.length === 0) ? true : false}
                                            size="default"
                                            routerLink='/profile'
                                        >Done</IonButton>
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
    booker: state.booker,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    me: () => dispatch(me()),
    editBooker: (editedBooker) => dispatch(editBooker(editedBooker))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBookerForm)
