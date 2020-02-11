import axios from 'axios';
import queryString from 'query-string';

// Action types
const DELETE_FILTER = 'DELETE_FILTER';
const CHOOSE_GENRES = 'CHOOSE_GENRES';
const SEARCH_BAR_VALUE = 'SEARCH_BAR_VALUE';
const CHOOSE_ALL_SINGLE = 'CHOOSE_ALL_SINGLE';
const GET_FILTER_SELECTED = 'GET_FILTER_SELECTED';
const GET_STATE = 'GET_STATE';
const LIST_OF_GENRES = [
  'rock',
  'jazz',
  'electronic',
  'pop',
  'hipHop',
  'indie',
  'country',
  'metal',
  'house',
  'techno',
];
// Initial state
const defaultFilter = {
  allSingle: [
    { value: 'Venues', isChecked: false },
    { value: 'Events', isChecked: false },
    { value: 'Artists', isChecked: false },
  ],
  allSingleChosen: [],
  chosen: [],
  genres: [
    { value: 'rock', isChecked: false },
    { value: 'jazz', isChecked: false },
    { value: 'electronic', isChecked: false },
    { value: 'pop', isChecked: false },
    { value: 'hipHop', isChecked: false },
    { value: 'indie', isChecked: false },
    { value: 'country', isChecked: false },
    { value: 'metal', isChecked: false },
    { value: 'house', isChecked: false },
    { value: 'techno', isChecked: false },
  ],
  genresChosen: [],
  isSearchBarOpen: false,
  filterSelected: [],
  inputFilters: [],
  word: '',
};

// Action creator
export const deleteFilter = filter => ({
  type: DELETE_FILTER,
  filter,
});

export const getState = filter => ({
  type: GET_STATE,
  filter,
});

export const chooseGenres = genres => ({
  type: CHOOSE_GENRES,
  genres,
});

export const chooseAllSingle = allSingle => ({
  type: CHOOSE_ALL_SINGLE,
  allSingle,
});

export const searchBarValue = value => ({
  type: SEARCH_BAR_VALUE,
  value,
});

const getFilterSelected = (filters, word) => ({
  type: GET_FILTER_SELECTED,
  filters,
  word,
});

//thunk creator
export const customedFilter = (
  mainFilters,
  genreFilters,
  input
) => async dispatch => {
  try {
    //stringifies all filter options
    let myQueryString = queryString.stringify({
      main: mainFilters,
      genre: genreFilters,
      word: input,
    });

    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: `/filters/${myQueryString}`,
    });
    dispatch(getFilterSelected(res.data, input));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
export default function(state = defaultFilter, action) {
  let genresCopy, chosenCopy, allSingleCopy;
  let allSingle: Array<string> = [],
    genres: Array<string> = [];
  switch (action.type) {
    case SEARCH_BAR_VALUE:
      window.localStorage.setItem('searchbar', JSON.stringify(action.value));
      return { ...state, isSearchBarOpen: action.value };

    case DELETE_FILTER:
      genresCopy = state.genres;
      allSingleCopy = state.allSingle;
      if (LIST_OF_GENRES.includes(action.filter))
        genresCopy.map(genre => {
          if (genre.value === action.filter) {
            genre.isChecked = false;
          }
          if (genre.isChecked) genres.push(genre.value);
        });
      for (const category in state.allSingle) {
        if (state.allSingle[category].value === action.filter) {
          allSingleCopy[category].isChecked = false;
        }
        if (state.allSingle[category].isChecked) {
          allSingle.push(state.allSingle[category].value);
        }
      }
      chosenCopy = state.chosen.filter(item => item !== action.filter);
      window.localStorage.setItem(
        'filter',
        JSON.stringify({
          ...state,
          chosen: chosenCopy,
          genres: genresCopy,
          allSingle: allSingleCopy,
          allSingleChosen: allSingle,
          genresChosen: genres,
        })
      );
      return {
        ...state,
        chosen: chosenCopy,
        genres: genresCopy,
        allSingle: allSingleCopy,
        allSingleChosen: allSingle,
        genresChosen: genres,
      };

    case CHOOSE_GENRES:
      genresCopy = state.genres;
      chosenCopy = [];
      chosenCopy = chosenCopy.filter(
        chosen => !LIST_OF_GENRES.includes(chosen)
      );
      state.chosen.map(chosen => {
        if (LIST_OF_GENRES.includes(chosen)) {
          genresCopy.map(genre => {
            if (genre.value === chosen) {
              genre.isChecked = false;
            }
          });
        } else chosenCopy.push(chosen);
      });
      genresCopy.map(genre => {
        if (action.genres.includes(genre.value)) genre.isChecked = true;
      });
      window.localStorage.setItem(
        'filter',
        JSON.stringify({
          ...state,
          chosen: [...chosenCopy, ...action.genres],
          genres: genresCopy,
        })
      );
      return {
        ...state,
        chosen: [...chosenCopy, ...action.genres],
        genres: genresCopy,
      };

    case CHOOSE_ALL_SINGLE:
      chosenCopy = state.chosen;
      allSingleCopy = state.allSingle.map(filter => {
        if (filter.value === action.allSingle) {
          if (filter.isChecked) {
            filter.isChecked = false;
            chosenCopy.splice(chosenCopy.indexOf(action.allSingle), 1);
          } else {
            filter.isChecked = true;
            if (!chosenCopy.includes(action.allSingle))
              chosenCopy.push(action.allSingle);
          }
        }
        return filter;
      });
      window.localStorage.setItem(
        'filter',
        JSON.stringify({
          ...state,
          chosen: chosenCopy,
          allSingle: allSingleCopy,
        })
      );
      return { ...state, chosen: chosenCopy, allSingle: allSingleCopy };

    case GET_STATE:
      action.filter.allSingle.map(filter => {
        if (filter.isChecked) {
          allSingle.push(filter.value);
        }
      });
      action.filter.genres.map(filter => {
        if (filter.isChecked) genres.push(filter.value);
      });
      action.filter['allSingleChosen'] = allSingle;
      action.filter['genresChosen'] = genres;
      window.localStorage.setItem('filter', JSON.stringify(action.filter));
      return {
        ...action.filter,
        allSingleChosen: allSingle,
        genresChosen: genres,
      };

    case GET_FILTER_SELECTED:
      return { ...state, filterSelected: action.filters, word: action.word };

    default:
      return state;
  }
}
