import React, {useState, useEffect} from 'react';
import FormGroup from '../../components/molecules/FormGroup'
import Button from '../../components/atoms/Button'
import Header from '../../components/atoms/Header'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {authSelector} from '../../redux/slices/authSlice'
import authActions from '../../redux/actions/auth';
import styles from './signin.module.scss';
enum ButtonTypes {
    button = "button",
    submit= "submit"
} 

const SignInPage = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const authState = useSelector(authSelector);
    useEffect(() => {
        if(authState.token) {
            history.push('/todo');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   
    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let result = await authActions.onLogin(dispatch, form.userId, form.password);
        if(result.status === 200) {
            if(history) {
                history.push('/todo');
            }
        }else{
            setError('User and password incorrect');
            // setTimeout(() =>{
            //     setError('');
            // },3000);
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div >
            <Header>Login</Header>
            <form onSubmit={signIn}>
            <div className="container">
                <FormGroup 
                    onChange={onChangeField} 
                    label="User ID"
                    htmlFor="usernameinput"
                    type="text"
                    value={form.userId}
                    name="userId"
                    placeholder="Enter User ID"
                />
                <FormGroup 
                    onChange={onChangeField} 
                    label="Password"
                    htmlFor="passwordinput"
                    type="password"
                    value={form.password}
                    name="password"
                    placeholder="Enter Password"
                />
                <div  data-testid="alert" className={styles.label}>{error}</div>
                <br />
                <Button className={styles.button} id="login" type={ButtonTypes.submit}>Sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;