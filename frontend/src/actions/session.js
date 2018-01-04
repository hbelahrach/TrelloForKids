/*
* @author  Hamid belahrach
*/

export function authError(bool) {
    return {
        type: "AUTH_ERROR",
        error: bool
    };
}

export function authLoading(bool) {
    return {
        type: "AUTH_LOADING",
        isLoading: bool
    };
}

export function loggedIn(bool) {
    return {
        type: "LOGGED_IN",
        isLoggedIn: bool
    };
}

export function login(data) {
    console.log("login: ", data);
    return dispatch => {
        dispatch(authLoading(true));
        fetch(`${process.env.apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log("data: ", data);
                let token = data.token;
                localStorage.setItem("token", token);
                dispatch(authError(false));
                dispatch(authLoading(false));
                dispatch(loggedIn(true));
            })
            .catch(err => {
                console.log("error: ", err);
                return dispatch(authError(true));
            });
    };
}

export function logout() {
    return dispatch => {
        dispatch(authLoading(true));
        fetch(`${process.env.apiUrl}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "Access-Control-Allow-Origin": "*"
        })
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                localStorage.removeItem("token");
                dispatch(authError(false));
                dispatch(authLoading(false));
                dispatch(loggedIn(false));
            })
            .catch(e => {
                return dispatch(authError(true));
            });
    };
}

export function restoreSession() {
    return dispatch => {
        let token = localStorage.getItem("token");
        if (token) {
            dispatch(loggedIn(true));
        } else {
            dispatch(loggedIn(true));
        }
    };
}
