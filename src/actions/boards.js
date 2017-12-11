export function boardsError(bool) {
    return {
        type: "BOARDS_ERROR",
        error: bool
    };
}

export function boardsIsLoading(bool) {
    return {
        type: "BOARDS_IS_LOADING",
        isLoading: bool
    };
}

export function boardsSuccess(items) {
    return {
        type: "BOARDS_SUCCESS",
        items
    };
}

export function getBoards(url) {
    return dispatch => {
        dispatch(boardsIsLoading(true));
        fetch(url, {
            "Access-Control-Allow-Origin": "*"
        })
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                dispatch(boardsIsLoading(false));
                return response;
            })
            .then(response => response.json())
            .then(items => dispatch(boardsSuccess(items)))
            .catch(err => dispatch(boardsError(true)));
    };
}

export function activeBoardError(bool) {
    return {
        type: "ACTIVE_BOARD_ERROR",
        error: bool
    };
}

export function activeBoardIsLoading(bool) {
    return {
        type: "ACTIVE_BOARD_IS_LOADING",
        isLoading: bool
    };
}

export function activeBoardSuccess(item) {
    return {
        type: "ACTIVE_BOARD_SUCCESS",
        item
    };
}

export function getBoard(url) {
    return dispatch => {
        dispatch(activeBoardIsLoading(true));
        fetch(url, {
            "Access-Control-Allow-Origin": "*"
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(activeBoardIsLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(item => {
                return dispatch(activeBoardSuccess(item));
            })
            .catch(() => dispatch(activeBoardError(true)));
    };
}

export function addBoard(url, data) {
    return dispatch => {
        dispatch(activeBoardIsLoading(true));
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify(data)
        })
            .then(response => {
                return response;
            })
            .then(response => response.json())
            .catch(() => dispatch(boardsError(true)));
    };
}
