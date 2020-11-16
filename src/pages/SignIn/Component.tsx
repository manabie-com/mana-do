import React, {useState} from 'react';

import Notification from '../../components/Notification'

import './styles.css'

interface Props {
  onSubmit: (userId: string, password: string) => void
  error: string
}

export default ({ onSubmit, error }: Props) => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(form.userId, form.password)
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="SignIn__root">
            {error !== '' && <Notification type='error' className="SignIn__error">{error}</Notification>}
            <form onSubmit={handleSubmit} className="SignIn__form">
                <label htmlFor="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        onChange={onChangeField}
                    />
                </label>
                <br/>
                <label htmlFor="password" >
                    Password
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit">
                    SIGN IN
                </button>
            </form>
        </div>
    );
};
