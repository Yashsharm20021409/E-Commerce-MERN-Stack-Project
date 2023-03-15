import { loginFailure, loginStart, loginSuccess,logout } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async(dispatch,user)=>{
    dispatch(loginStart())

    try{
        const res = await publicRequest.post("/auth/login",user);
        dispatch(loginSuccess(res.data));
    }
    catch(e){
        dispatch(loginFailure())
    }

}

export const logoutUser = async(dispatch)=>{
    dispatch(logout());
    
}