// creating a context for authentication
// uses useReducer hook
// save token to local storage, also initially check if token is present in local storage
// if token is present, then check with backend if token is valid

import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const TOKEN_KEY = "token";

const initialState = {
  isLogged: false,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogged: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        isLogged: false,
        token: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check if token is present in local storage
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      // Validate the token with the backend
      validateToken(storedToken)
        .then((isValid) => {
          if (isValid) {
            // Token is valid, login user
            dispatch({
              type: "LOGIN",
              payload: {
                isLogged: true,
                token: storedToken,
              },
            });
          } else {
            // Token is invalid, logout user
            dispatch({
              type: "LOGOUT",
            });
          }
        })
        .catch((error) => {
          console.error("Failed to validate token:", error);
          // Handle error if token validation fails
        });
    }
  }, []);

  const login = (token) => {
    // Save token to local storage
    localStorage.setItem(TOKEN_KEY, token);

    dispatch({
      type: "LOGIN",
      payload: {
        isLogged: true,
        token: token,
      },
    });
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem(TOKEN_KEY);

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const validateToken = async (token) => {
  // Make an API call to validate the token with the backend
  return axios.post("http://localhost:3000/verifyLogin",{},{
    headers: {
        Authorization: token,
    }
  })
};

export { AuthContext, AuthContextProvider };


