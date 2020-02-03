import axios from 'axios'
// import history from '../pages/history'

/**
 * ACTION TYPES
 */
const GET_ARTISTS = 'GET_ARTISTS'
const PUT_PERSONAL_INFO = 'PUT_PERSONAL_INFO'
const PUT_ARTIST_NAME = 'PUT_ARTIST_NAME'
const PUT_ZIP_CODE = 'PUT_ZIP_CODE'
const PUT_GENRE = 'PUT_GENRE'
const UPDATE_ARTIST = 'UPDATE_ARTIST'
const PUT_TYPE = 'PUT_TYPE'

/**
 * INITIAL STATE
 */
const defaultArtist = {
  firstName: '',
  lastName: '',
  artistName: '',
  genres: [],
  imageUrl: '',
  zipCode: '',
  instagramUrl: '',
  spotifyUrl: '',
  facebookUrl: '',
  type: '',
  phone: '',
  email: '',
  password: '',
}

/**
 * ACTION CREATORS
 */
const getArtists = artists => ({type: GET_ARTISTS, artists})
export const putPersonalInfo = (info) =>({type: PUT_PERSONAL_INFO, info})
export const putArtistName = (name) =>({type: PUT_ARTIST_NAME, name})
export const putZipCode = (zipcode) =>({type: PUT_ZIP_CODE, zipcode})
export const putGenre = (genre) =>({type: PUT_GENRE, genre})
export const updateArtist = artist => ({type: UPDATE_ARTIST, artist})
export const putType = (artistType) => ({type: PUT_TYPE, artistType})

/**
 * THUNK CREATORS
 */
export const fetchArtists = () => async dispatch => {
  try {
    const res = await axios.get('/api/artists')
    dispatch(getArtists(res.data || defaultArtist))
  } catch (err) {
    console.error(err)
  }
}
export const updatedArtist = (artistInfo) => async dispatch => {
  try {
    let artist=window.localStorage.getItem('artist')
    artist=JSON.parse(artist||'');
    let newArtist=artist||{};
    newArtist['artistInfo']={...newArtist['artistInfo'],...artistInfo};
    window.localStorage.setItem('artist',JSON.stringify(newArtist))
    let sendArtist={
      firstName:newArtist["firstName"],
      lastName:newArtist["lastName"],
      artistName:newArtist["artistName"],
      genres:newArtist['genres'],
      imageUrl: newArtist["imageUrl"],
      zipCode:newArtist["zipCode"],
      instagramUrl:newArtist["instagramUrl"],
      spotifyUrl:newArtist["spotifyUrl"],
      facebookUrl:newArtist["facebookUrl"],
      type:newArtist["type"],
      phone:newArtist['phone'],
      email: newArtist["email"],
      password:newArtist["password"],
    }
      console.log(artist)
      const res=await axios({
        method:"post",
        baseURL:"http://localhost:8080/api/",
        url:"/artists/",
        data:sendArtist
      })
    dispatch(updateArtist(newArtist))
  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function(state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artist

    case PUT_PERSONAL_INFO:
        // history.push('/artistnameform')
        return {...state,
          firstName: action.info.firstName,
          lastName: action.info.lastName,
          phone: action.info.phone,
          email: action.info.email,

        }

      case PUT_ARTIST_NAME:
        // history.push('/artistnameform')
        return {...state, artistName: action.name}
      case PUT_ZIP_CODE:
        return {...state, zipCode: action.zipcode}
      case PUT_GENRE:
        return {...state, genres: action.genre}
      case UPDATE_ARTIST:
        return action.artist
      case PUT_TYPE:
        return {...state, type: action.artistType}
    default:
      return state
  }
}
