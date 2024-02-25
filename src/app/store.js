import { configureStore } from '@reduxjs/toolkit';

const initial_state = {
  object: {
    signedIn: false,
    isBusiness: false,
    businessDetails: {
      id: "",
      offers: [],
      services: [],
      stats: {}
    },
    userDetails: {
      userName: "",
      userId: "",
      collections: [],
      history: [],
      orders: []
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
            history: action.payload.history,
            orders: action.payload.orders || [],
          }
        }
      };
    case "MODIFY_COLLECTIONS":
      console.log("state: ", state)
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
            ...state.object.userDetails,
            collections: action.payload.collections
          }
        }
      }
    case "MODIFY_ORDERS":
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
            ...state.object.userDetails,
            orders: action.payload.orders
          }
        }
      }
    case "BUSINESS_LOGIN":
      return {
        object: {
          signedIn: true,
          isBusiness: true,
          businessDetails: {
            id: action.payload.id,
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
    case "MODIFY_SERVICES":
      return {
        object: {
          signedIn: true,
          isBusiness: true,
          businessDetails: {
            ...state.object.businessDetails,
            services: action.payload.services,
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

export const addCollection = (newObj)=>{
  return {
    type: "MODIFY_COLLECTIONS",
    payload: newObj
  }
}

export const modifyServices = (newObj)=>{
  return {
    type: "MODIFY_SERVICES",
    payload: newObj 
  }
}

export const store = configureStore({
  reducer: {
    stateReducer: result_reducer
  },
});
