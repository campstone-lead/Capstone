import axios from 'axios';
import queryString from 'query-string';
// import history from '../pages/history'
axios.defaults.withCredentials = true;

/**
 * ACTION TYPES
 */
const GET_VENUES = 'GET_VENUES';
const GOT_ALL_VENUES = 'GOT_ALL_VENUES';
const GET_SINGLE_VENUE = 'GET_SINGLE_VENUE';
const GET_FILTER_SELECTED = 'GET_FILTER_SELECTED';

/**
 * INITIAL STATE
 */
const defaultState = {
  all: [],
  filterSelected: [],
  single: {},
  selected: {},
};

/**
 * ACTION CREATORS
 */
const getVenues = venues => ({ type: GET_VENUES, venues });
const gotAllVenues = venues => ({ type: GOT_ALL_VENUES, venues });
const getSingleVenue = venue => ({ type: GET_SINGLE_VENUE, venue });
const getFilterSelected = venues => ({ type: GET_FILTER_SELECTED, venues });

/**
 * THUNK CREATORS
 */
export const getRecommendedVenues = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: `/venues/distance/${id}`,
    });
    console.log('got recommended data->>>>', res.data);
    dispatch(getVenues(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const fetchVenues = () => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: '/venues/distance/',
    });
    window.localStorage.setItem('venueList', JSON.stringify(res.data));
    dispatch(getVenues(res.data || defaultState));
  } catch (err) {
    console.error(err);
  }
};

export const filterVenues = (mainFilters, genreFilters) => async dispatch => {
  try {
    let myQueryString = queryString.stringify({
      main: mainFilters,
      genre: genreFilters,
    });

    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: `/venues/${myQueryString}`,
    });
    dispatch(getFilterSelected(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const getAllVenues = () => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: '/venues',
    });
    dispatch(gotAllVenues(res.data || defaultState));
  } catch (error) {
    console.error(error);
  }
};
export const fetchOneVenue = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: `/venues/${id}`,
    });

    dispatch(getSingleVenue(res.data || defaultState));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_FILTER_SELECTED:
      return { ...state, filterSelected: action.venues };
    case GET_VENUES:
      return { ...state, all: action.venues };
    case GOT_ALL_VENUES:
      return { ...state, all: action.venues };
    case GET_SINGLE_VENUE:
      return { ...state, single: action.venue };
    default:
      return state;
  }
}
