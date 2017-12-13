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

export function getBoards() {
    return dispatch => {
        dispatch(boardsIsLoading(true));
        fetch(`${process.env.apiUrl}/boards`, {
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

export function getBoard(boardId) {
    return dispatch => {
        dispatch(activeBoardIsLoading(true));
        fetch(`${process.env.apiUrl}/boards/${boardId}`, {
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

export function addBoard(data) {
    return dispatch => {
        dispatch(activeBoardIsLoading(true));
        return fetch(`${process.env.apiUrl}/boards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(() => dispatch(boardsError(true)));
    };
}

export function addList(boardId, data) {
    return dispatch => {
        dispatch(activeBoardIsLoading(true));
        return fetch(`${process.env.apiUrl}/boards/${boardId}/lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(item => {
                return dispatch(activeBoardSuccess(item));
            })
            .catch(() => dispatch(boardsError(true)));
    };
}

export function addTask(listId, data) {
    return dispatch => {
        return fetch(`${process.env.apiUrl}/lists/${listId}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(e => console.log(e));
    };
}

export function updateTask(taskId, item) {
    return dispatch => {
        return fetch(`${process.env.apiUrl}/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify({ item })
        })
            .then(response => response.json())
            .catch(e => e);
    };
}

export function orderBoard(boardId, lists) {
    return dispatch => {
        return fetch(`${process.env.apiUrl}/lists/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify({ lists })
        })
            .then(response => response.json())
            .catch(e => console.log(e));
    };
}

export function orderList(listId, tasks) {
    return dispatch => {
        return fetch(`${process.env.apiUrl}/lists/${listId}/tasks/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*",
            body: JSON.stringify({ tasks })
        })
            .then(response => response.json())
            .catch(e => console.log(e));
    };
}
