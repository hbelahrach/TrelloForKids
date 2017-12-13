/*
* @author  Hamid belahrach
*/

import { combineReducers } from "redux";

function boards(state = [], action) {
    switch (action.type) {
        case "BOARDS_SUCCESS":
            return action.items;
        default:
            return state;
    }
}
function boardsError(state = false, action) {
    switch (action.type) {
        case "BOARDS_ERROR":
            return action.error;
        default:
            return state;
    }
}
function boardsIsLoading(state = false, action) {
    switch (action.type) {
        case "BOARDS_IS_LOADING":
            return action.isLoading;
        default:
            return state;
    }
}

function activeBoard(state = null, action) {
    switch (action.type) {
        case "ACTIVE_BOARD_SUCCESS":
            return action.item;
        default:
            return state;
    }
}
function activeBoardError(state = false, action) {
    switch (action.type) {
        case "ACTIVE_BOARD_ERROR":
            return action.error;
        default:
            return state;
    }
}
function activeBoardIsLoading(state = false, action) {
    switch (action.type) {
        case "ACTIVE_BOARD_IS_LOADING":
            return action.isLoading;
        default:
            return state;
    }
}

export default combineReducers({
    boards,
    boardsError,
    boardsIsLoading,
    activeBoard,
    activeBoardError,
    activeBoardIsLoading
});
