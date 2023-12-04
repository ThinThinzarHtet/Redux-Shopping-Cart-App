import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request",
          type: "warning",
        })
      );
      const sendRequest = async () => {
        // send state as sending request
  
        const res = await fetch(
          "https://redux-http-b9d97-default-rtdb.firebaseio.com/cartItems.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        const data = await res.json();
  
        // send state as request is successful
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Send Request to Database Successfully.",
            type: "success",
          })
        );
      };
      try {
        await sendRequest();
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Sending Request Failed.",
            type: "error",
          })
        );
      }
    };
  };