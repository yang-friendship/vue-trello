import axios from "axios";
import * as api from "../api";

const mutations= {
  LOGIN(state, token) {
    if (!token) {
      return
    }
    state.token = token
    localStorage.setItem('token', token);
    // setAuthInHeader(token);  // Error
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}`
      : null;

  },
  LOGOUT(state) {
    state.token = null
    delete localStorage.token
    api.setAuthInHeader(null)
  },
  SET_IS_ADD_BOARD(state, toggle) {
    state.isAddBoard = toggle
  },
  SET_BOARDS(state, boards) {
    state.boards = boards
  },

  SET_BOARD(state, board) {
    state.board = board;
  }
}

export default mutations
