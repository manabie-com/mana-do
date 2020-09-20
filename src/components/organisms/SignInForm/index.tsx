import { Button } from 'components/atoms';
import { LabelInput } from 'components/molecules';
import React from 'react';

import "./styles.css"

type Props = {
  signIn : (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>)=> void;
  form : { userId : string , password : string}
}

const SignInForm = ({ signIn, onChangeField , form}:Props) => {
    return (
        <form onSubmit={signIn} className="SignInPageForm py-3 py-sm-4 py-md-5">
            <div className="row">
                <div className="col-10 col-sm-9 m-auto">
                    <div className="my-4">
                        <LabelInput 
                            labelText="Username" 
                            inputValue={form.userId}
                            onChangeInput={onChangeField}
                            inputId="user_id"
                            inputName="userId"
                            inputType="text" />
                    </div>

                    <div className="my-4">
                        <LabelInput 
                            labelText="Password" 
                            inputValue={form.password}
                            onChangeInput={onChangeField}
                            inputId="password"
                            inputName="password"
                            inputType="password" />
                    </div>
                    <div className="mt-3">
                        <Button type="submit" className="SignInPageForm__button px-5">
                                Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;