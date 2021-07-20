import {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import Service from "../service";
import { actLogin } from "../store/actions";
import { AppContext } from "../store/context";

export function useNotAuthenticated() {
    const { dispatch } = useContext(AppContext);
    const history = useHistory();
    const token:string = localStorage.getItem('token') || '';
    useEffect(()=>{
        (async function fetchUser() {
            try {
                const response = await Service.getAuth();
                if (response.status === 200) {
                    dispatch(actLogin(response.data));
                    history.push('/todo')
                }
            } catch (error) {
                history.push('/');
            }
        })();
    },[token, history, dispatch])
}