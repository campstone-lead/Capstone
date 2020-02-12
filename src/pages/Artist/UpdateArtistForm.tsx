import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonDatetime, IonCardHeader, IonAvatar,
} from '@ionic/react';
import React from 'react';
import axios from 'axios'
import '../Tab1.css';
import { connect } from 'react-redux'
import { me } from '../../store/user';
import { editArtist } from '../../store/artist';
import { image, time, locate, headset, create, mailOpen, call, code } from 'ionicons/icons';
axios.defaults.withCredentials = true;
interface IMyComponentState {
  event: object;
  artist: object;
  // formVals: Array<object>;
  selectedFile: any;
  photo: string
  // defaultedVenue: number

}
interface IMyComponentProps {
  // booker: any,
  // createEvent: (event: object) => void,
  editArtist: any,
  user: object;
  me: any;

}

class UpdateArtistForm extends React.Component<IMyComponentProps, IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        imageUrl: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
        description: '',
        date: '',
        name: '',
      },
      artist: {
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        genres: "",
        phone: "",
        zipCode: "",
        type: "",
        bio: "",
        imageURL: "",
        instagramUrl: "",
        spotifyUrl: "",
        facebookUrl: ""
      },
      selectedFile: null,
      photo: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
      // formVals: [{ displayName: 'First Name', icon: headset, name: 'firstName' },
      // { displayName: 'Last Name', icon: headset, name: 'lastName' },
      // { displayName: 'Artist Name', icon: headset, name: 'name' },
      // // { displayName: 'Email', icon: headset, name: 'email' },
      // // { displayName: 'Genres', icon: headset, name: 'genres' },
      // { displayName: 'Phone', icon: call, name: 'phone' },
      // // { displayName: 'Zip Code', icon: headset, name: 'zipCode' },
      // // { displayName: 'Type', icon: headset, name: 'type' },
      // // { displayName: 'Bio', icon: headset, name: 'bio' },
      // // { displayName: 'ImageURL', icon: headset, name: 'imageURL' },
      // {
      //   displayName: 'Instagram Url',
      //   icon: code,
      //   name: 'instagramUrl'
      // },
      // {
      //   displayName: 'Spotify Url',
      //   icon: code,
      //   name: 'spotifyUrl'
      // },
      // {
      //   displayName: 'Facebook Url',
      //   icon: code,
      //   name: 'facebookUrl'
      // }]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.me();


    if (this.props.user && this.props.user['status'] === 'artist') {
      this.setState({ artist: this.props.user })
    }

    // let event = window.localStorage.getItem('event')
    // if (event !== null) {
    //   event = JSON.parse(event || '')
    //   let newEvent = event || {};
    //   await this.setState({ photo: newEvent['imageUrl'] })
    // }

  }


  async handleSubmit(e) {
    e.preventDefault();
    // const event = {
    //   name: this.state.event['name'],
    //   description: this.state.event['description'],
    //   date: this.state.event['date'],
    //   imageURL: this.state.photo,
    //   venueId: this.state.currentVenue
    // }
    // await this.props.createEvent(event)
    await this.props.editArtist(this.state.artist)
    window.localStorage.clear();
  }
  onChangeHandler = async  e => {
    e.persist()
    await this.setState({
      selectedFile: e.target.files[0]

    })

    await this.setState({ photo: this.state.selectedFile.name })
    let event = {
      imageUrl: this.state.photo
    }
    window.localStorage.setItem('event', JSON.stringify(event))
  }
  onClickHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();

    formData.append("file", this.state.selectedFile);
    await axios({
      method: "post",
      baseURL: "http://localhost:8080/",
      url: `/upload`,
      data: formData
    })

  }
  handleFormChange = (e) => {
    this.setState({
      artist: { ...this.state.artist, [e.target.name]: (e.target as HTMLInputElement).value }
    })
  }
  render() {
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle >Update profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>



          <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", margin: "30px" }}>


            <div style={{
              display: "flex", justifyContent: "space-around",
              flexDirection: "column"
            }} >
              {/* START PICTURE */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center", flexDirection: 'row' }}>
                  <IonAvatar style={{ width: '170px', height: '170px', borderRadius: "50px" }}>
                    <img src={this.state.photo} alt='img' />
                  </IonAvatar>

                </div>
                < div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>

                  <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" />
                  <IonButton type="button" onClick={this.onClickHandler} color='secondary' size="small" >Upload a picture</IonButton>
                </div>
              </div>
              {/* END PICTURE */}

              <div>


                <form onSubmit={this.handleSubmit} className='updatevenue' >

                  {/* {this.state.formVals.map((item) =>
                    <div key={item["name"]}>
                      <IonLabel className='venuelabel'>{item["displayName"]}</IonLabel>
                      <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                        <IonIcon mode="ios" slot="start" color="medium" icon={item["icon"]} />
                        <IonInput clearInput type="text"
                          name={item["name"]}
                          value={this.state.artist[item["name"]]}
                          style={{ width: "250px" }}
                          onIonChange={(e) => this.handleFormChange(e)}
                        />
                      </IonItem>
                    </div>
                  )} */}


                  {/* <IonLabel className='venuelabel'>First name</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name=""
                      value={this.state.event["name"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.setState({
                        event: { ...this.state.event, name: (e.target as HTMLInputElement).value }
                      })}
                    />
                  </IonItem> */}
                  <IonLabel className='venuelabel'>First Name</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="firstName"
                      value={this.state.artist["firstName"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  <IonLabel className='venuelabel'>Last Name</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="lastName"
                      value={this.state.artist["lastName"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>
                  <IonLabel className='venuelabel'>Artist Name</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="name"
                      value={this.state.artist["name"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  {/* <IonLabel className='venuelabel'>Email</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="email"
                      value={this.state.artist["email"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  {/* <IonLabel className='venuelabel'>Genres</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name={genres}
                      value={this.state.artist[genres]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  {/* <IonLabel className='venuelabel'>Phone</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="number"
                      name="phone"
                      value={this.state.artist["phone"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  {/* <IonLabel className='venuelabel'>Zip Code</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="zipCode"
                      value={this.state.artist["zipCode"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  {/* <IonLabel className='venuelabel'>Type</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name={type}
                      value={this.state.artist[type]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  <IonLabel className='venuelabel'>Bio</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="bio"
                      value={this.state.artist["bio"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  {/* <IonLabel className='venuelabel'>ImageURL</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="imageURL"
                      value={this.state.artist["imageURL"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

                  <IonLabel className='venuelabel'>Instagram Url</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="instagramUrl"
                      value={this.state.artist["instagramUrl"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  <IonLabel className='venuelabel'>Spotify Url</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="spotifyUrl"
                      value={this.state.artist["spotifyUrl"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  <IonLabel className='venuelabel'>Facebook Url</IonLabel>
                  <IonItem lines="inset" style={{ marginBottom: "15px" }}>
                    <IonIcon mode="ios" slot="start" color="medium" icon={headset} />
                    <IonInput clearInput type="text"
                      name="facebookUrl"
                      value={this.state.artist["facebookUrl"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem>

                  <IonItem routerLink="/profile" lines="none">
                    <IonButton type="submit" size="default">create</IonButton>
                  </IonItem>
                </form>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage >)
  }
}
const mapStateToProps = (state) => ({
  // booker: state.booker,
  user: state.user,
  // venues: state.booker.venues
})
const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me()),
    editArtist: (artist) => dispatch(editArtist(artist)),
    // fetchVenues: id => dispatch(getOneBooker(id)),
    // createEvent: (event) => dispatch(createdEvent(event))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateArtistForm);
