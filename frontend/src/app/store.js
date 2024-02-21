import { configureStore } from '@reduxjs/toolkit';

const initial_state = {
  object: {
    signedIn: false,
    isBusiness: false,
    businessDetails: {
      offers: [],
      services: [],
      stats: {}
    },
    userDetails: {
      userName: "",
      userId: "",
      collections: [],
      history: []
    }
  }
}

const result_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        object: {
          signedIn: true,
          isBusiness: false,
          businessDetails: { 
            offers: [],
            services: [],
            stats: {}
          },
          userDetails: {
            userName: action.payload.userName,
            userId: action.payload.userId,
            collections: action.payload.collections,
            history: action.payload.history
          }
        }
      };
    case "BUSINESS_LOGIN":
      return {
        object: {
          signedIn: true,
          isBusiness: true,
          businessDetails: {
            offers: action.payload.offers,
            services: action.payload.services,
            stats: action.payload.stats,
          },
          userDetails: {
            userName: "",
            userId: "",
            collections: [],
            history: []
          }
        }
      };
    case "USER_LOGOUT":
      return {
        object: {
          signedIn: false,
          isBusiness: false,
          businessDetails: { 
            offers: [],
            services: [],
            stats: {}
          },
          userDetails: {
            userName: "",
            userId: "",
            collections: [],
            history: []
          }
        }
      };
    default: return state;
  }
}

export const userLogin = (newObj) =>{
  return {
    type: "USER_LOGIN",
    payload: newObj
  }
}

export const businessLogin = (newObj) =>{
  return {
    type: "BUSINESS_LOGIN",
    payload: newObj
  }
}

export const userLogout = () =>{
  return {
    type: "USER_LOGOUT"
  }
}

export const store = configureStore({
  reducer: {
    stateReducer: result_reducer
  },
});
