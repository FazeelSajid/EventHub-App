import { useDispatch, useSelector } from "react-redux";
import { setAuthStates } from "../statesSlices/authSlice";





const useAuth = () => {

    const dispatch = useDispatch();
    
    const authState = useSelector(state => state.authSlice);

    const setAuthState = (newStatus) => {
        dispatch(setAuthStates(newStatus));
    };


  return {
    setAuthState,
    authState
  }
}

export default useAuth

