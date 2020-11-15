import React, {useState} from 'react';

interface Props {
  onSubmit: (userId: string, password: string) => void
}

export default ({ onSubmit }: Props) => {
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
        <div style={{marginTop: '3rem', textAlign: 'left'}}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user_id">
                    User id
                    <input
                        id="user_id"
                        name="userId"
                        value={form.userId}
                        style={{marginTop: 12}}
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
                        style={{marginTop: 12}}
                        value={form.password}
                        onChange={onChangeField}
                    />
                </label>
                <br />
                <button type="submit" style={{marginTop: 12}}>
                    Sign in
                </button>
            </form>
        </div>
    );
};
