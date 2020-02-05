import axios from 'axios'
import { iceCream } from 'ionicons/icons'
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
const PUT_BIO = 'PUT_BIO'

/**
 * INITIAL STATE
 */
const defaultArtist = {
  // firstName: '',
  // lastName: '',
  // artistName: '',
  // genres: [],
  // imageUrl: '',
  // zipCode: '',
  // instagramUrl: '',
  // spotifyUrl: '',
  // facebookUrl: '',
  // type: '',
  // phone: '',
  // email: '',
  // password: '',
}

/**
 * ACTION CREATORS
 */
const getArtists = artists => ({ type: GET_ARTISTS, artists })
export const putPersonalInfo = (info) => ({ type: PUT_PERSONAL_INFO, info })
export const putArtistName = (name) => ({ type: PUT_ARTIST_NAME, name })
export const putZipCode = (zipcode) => ({ type: PUT_ZIP_CODE, zipcode })
export const putGenre = (genre) => ({ type: PUT_GENRE, genre })
export const updateArtist = newArtistData => ({ type: UPDATE_ARTIST, newArtistData })
export const putType = (artistType) => ({ type: PUT_TYPE, artistType })
export const putBio = (artistBio) => ({ type: PUT_BIO, artistBio })

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

    let artist = window.localStorage.getItem('artistInfo')
    let password = artistInfo.password
    let newArtist;

    if (password === undefined) {
      if (artist === null) {
        window.localStorage.setItem('artistInfo', JSON.stringify(artistInfo))
      } else {
        artist = JSON.parse(artist || '')
        newArtist = artist || {};


        newArtist = { ...newArtist, ...artistInfo };

        window.localStorage.setItem('artistInfo', JSON.stringify(newArtist))

      }
    }

    if (password !== undefined) {

      artist = JSON.parse(artist || '')
      newArtist = artist || {};
      let sendArtist = {
        firstName: newArtist["firstName"],
        lastName: newArtist["lastName"],
        artistName: newArtist["artistName"],
        genres: newArtist['genres'],
        bio: newArtist['bio'],
        imageUrl: newArtist['imageUrl'],
        zipCode: newArtist["zipCode"],
        instagramUrl: newArtist["instagramUrl"],
        spotifyUrl: newArtist["spotifyUrl"],
        facebookUrl: newArtist["facebookUrl"],
        type: newArtist["type"],
        phone: newArtist['phone'],
        email: newArtist["email"],
        password: password
      }
      console.log(sendArtist, 'SENDARTIST')

      await axios({
        method: "post",
        baseURL: "http://localhost:8080/api/",
        url: "/artists/",
        data: sendArtist
      })
      window.localStorage.clear()
      dispatch(updateArtist(sendArtist))
    }

  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artist

    case PUT_PERSONAL_INFO:
      return {
        ...state,
        firstName: action.info.firstName,
        lastName: action.info.lastName,
        phone: action.info.phone,
        email: action.info.email,

      }

    case PUT_ARTIST_NAME:
      return { ...state, artistName: action.name }
    case PUT_ZIP_CODE:
      return { ...state, zipCode: action.zipcode }
    case PUT_GENRE:
      return { ...state, genres: action.genre }
    case UPDATE_ARTIST:
      window.localStorage.setItem('artist', JSON.stringify(action.newArtistData))
      return { ...state, ...action.newArtistData }
    case PUT_TYPE:
      return { ...state, type: action.artistType }
    case PUT_BIO:
      return { ...state, bio: action.artistBio }
    default:
      return state
  }
}





// import axios from 'axios'
// // import history from '../pages/history'

// /**
//  * ACTION TYPES
//  */
// const GET_ARTISTS = 'GET_ARTISTS'
// const PUT_PERSONAL_INFO = 'PUT_PERSONAL_INFO'
// const PUT_ARTIST_NAME = 'PUT_ARTIST_NAME'
// const PUT_ZIP_CODE = 'PUT_ZIP_CODE'
// const UPDATE_ARTIST = 'UPDATE_ARTIST'
// const PUT_TYPE = 'PUT_TYPE'
// const PUT_BIO = 'PUT_BIO'

// /**
//  * INITIAL STATE
//  */
// const defaultArtist = {
// }

// /**
//  * ACTION CREATORS
//  */

// const getArtists = artists => ({type: GET_ARTISTS, artists})
// export const putPersonalInfo = (info) =>({type: PUT_PERSONAL_INFO, info})
// export const putArtistName = (name) =>({type: PUT_ARTIST_NAME, name})
// export const putZipCode = (zipcode) =>({type: PUT_ZIP_CODE, zipcode})
// export const updateArtist = newArtistData => ({type: UPDATE_ARTIST, newArtistData})
// export const putType = (artistType) => ({type: PUT_TYPE, artistType})
// export const putBio = (artistBio) => ({type: PUT_BIO, artistBio})

// /**
//  * THUNK CREATORS
//  */
// export const fetchArtists = () => async dispatch => {
//   try {
//     const res = await axios({
//       method:"get",
//       baseURL:"http://localhost:8080/api/",
//       url:"/artists"
//   })
//   console.log('got data->>>>',res.data)
//     dispatch(getArtists(res.data || defaultArtist))
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const updatedArtist = (artistInfo) => async dispatch => {
//   try {
//     console.log("ARTISTINFO", artistInfo)
//     let artist=window.localStorage.getItem('artistInfo')
//     let password = artistInfo.password
//     let newArtist;

//       if(password === undefined){
//             if(artist === null){
//               window.localStorage.setItem('artistInfo', JSON.stringify(artistInfo))
//             } else{
//               artist=JSON.parse(artist||'')
//               newArtist=artist||{};
//               console.log(artistInfo,newArtist)

//               newArtist={...newArtist,...artistInfo};
//               console.log(newArtist)
//               window.localStorage.setItem('artistInfo',JSON.stringify(newArtist))
//             }
//           }
//       else{
//         artist=JSON.parse(artist||'')
//         let newArtist=artist||{};
//         newArtist={...newArtist,...artistInfo};
//         window.localStorage.setItem('artistInfo',JSON.stringify(newArtist))
//         if(password !==undefined){
//             let sendArtist={
//             firstName:newArtist["firstName"],
//             lastName:newArtist["lastName"],
//             artistName:newArtist["artistName"],
//             genres:newArtist['genres'],
//             bio: newArtist['bio'],
//             imageUrl: newArtist['photo'],
//             zipCode:newArtist["zipCode"],
//             instagramUrl:newArtist["instagramUrl"],
//             spotifyUrl:newArtist["spotifyUrl"],
//             facebookUrl:newArtist["facebookUrl"],
//             type:newArtist["type"][0],
//             phone:newArtist['phone'],
//             email: newArtist["email"],
//             password:password,
//           }
//           console.log(sendArtist, 'SENDARTIST')
//           const res = await axios({
//             method:"post",
//             baseURL:"http://localhost:8080/api/",
//             url:"/artists",
//             data:sendArtist
//         })
//         window.localStorage.clear()
//         dispatch(updateArtist(res.data))
//       }

//     }

//   } catch (err) {
//     console.error(err)
//   }
// }

// export const getVenuesByDistance = () => {
//   return (
//     async (dispatch) => {

//       const res = await axios({
//         method: "get",
//         baseURL: "http://localhost:8080/api/",
//         url: "/venues/distance/2", //later, the "1" should be the id of the current artist on state (or in local storage?) could also potentially grab this from req.session on the backend instead, not sure what's more restful -- Emma
//       })
//     }
//   )
// }

// /**
//  * REDUCER
//  */
// export default function (state = defaultArtist, action) {
//   switch (action.type) {
//     case GET_ARTISTS:
//       return action.artists

//     case PUT_PERSONAL_INFO:
//       // history.push('/artistnameform')
//       return {
//         ...state,
//         firstName: action.info.firstName,
//         lastName: action.info.lastName,
//         phone: action.info.phone,
//         email: action.info.email,

//       }
//       case PUT_ARTIST_NAME:
//         // history.push('/artistnameform')
//         return {...state, artistName: action.name}
//       case PUT_ZIP_CODE:
//         return {...state, zipCode: action.zipcode}
//       case UPDATE_ARTIST:
//         window.localStorage.setItem('artist',JSON.stringify(action.newArtistData))
//         return {...state, ...action.newArtistData}
//       case PUT_TYPE:
//         return {...state, type: action.artistType}
//       case PUT_BIO:
//         return {...state, bio: action.artistBio}
//     default:
//       return state
//   }
// }
