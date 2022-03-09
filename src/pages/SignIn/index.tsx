import { useAuth } from 'auth';
import Loading from 'components/Loading';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import './styles.css';

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { token, logIn, error, isLoading } = useAuth();

  if (token && !error) navigate('/todo');
  if (isLoading) return <Loading />;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailRef.current?.value && passwordRef.current?.value) {
      logIn(emailRef.current.value, passwordRef.current.value);
      navigate('/todo');
    }
  }

  return (
    <section>
      <div className="form-contact">
        <div className="contactinfo">
          <div>
            <h2>Nguyen Van Kiet</h2>
            <img
              src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              style={{ width: '100%', height: '100%' }}
              alt=""
            />
          </div>
          <ul className="sci">
            <li>
              <img
                src="https://banner2.cleanpng.com/20180324/qiq/kisspng-social-media-facebook-computer-icons-logo-facebook-5ab6ebf06fdf95.2801350415219373924582.jpg"
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
            <li>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAflBMVEX/////AAD/+fn/ra3/kZH/3Nz/7Oz/sbH/nJz/p6f/1NT/EBD/zMz/vr7/4eH/3d3/xMT/pKT/lZX/8fH/cnL/0ND/jIz/trb/eHj/ISH/QkL/WFj/h4f/amr/fHz/R0f/ZGT/Kyv/OTn/UlL/MjL/RET/Xl7/goL/VFT/e3vLg+1WAAADB0lEQVR4nO3ca1ObUBSFYS4JEAKEgDEaL9Haavv//2CNU6fVOuPeJxz3bH2fzzrjWhLOjZAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgq8jGolvVTd+32zLPF+t1VQ3D7NEwVNV6kefltu37pp6vijGz/mMnVNTtenZ2v79dpmrnu4uTy6psOusQR+gfvumDv2l5lbu8MPKJ8j+7dtdCtpu4gkeNdSidYvoGHpXWsVSiVODrSriP1EHq556wiVVBemYdTewuWgduLoQxXgVpbh1OqI3YwY11OKHLiB2k1uGE9jE7KKzTycSswMkUIeYt0ctNsY7awaV1PJGYw4KXgWERtYOddTyRU1GW76ElWMcTOZNFKT9zBxeiKFnoXMrFiuGHOEohq+slF5Okc8W/s5H98L/mxvFEZFGeL2n1KFKbhhPSdZBk17oOestsUsoOkqRTLbJau2RimbqDJOkVp1AeNpeFS6ZXQ1wl7mBhE0tFeLTwepjPToQdrE1S6XRhHSTJXHY6WRlk0gruQLjiHD48kd48vIMkmb3/i7MPzhPiqA6S8d3bwunHxglyXAfdu+czn70DyeDg4bNwxD1RNEnwcE8MnB+IJ4sexsbADsSLBg9zpKC5smLx6GGuHLJm0mwieFgz6dfOus0kD2tnbQfaTcVPuIei3lx2sZem2VMNOGRYGccTkQ1yhw7qkMMmF3vrsgfzsmS8CWjAyRmL7KwtG4IacHLWJtgDOMLSOp5I3LP3vXU8kT5qB1fW8USEGwiBPGyhiBcMgXw8kxX32byNdTqZiI9sp+lonU5G9kBSIOtwQjEHBh/DQtyboosdlIOwhYCIdTSxeDMEH7ODJ7JlUwDrYBq3cSpw8Uzas0z/zJ2Aj+8u/DX9fXHp7/vvzVRfev/Dwxnb/7rqJuCtB2+5O/X2MXihqNt8eDi5UL8F4nz38+rXbL1tOhc7iHJPrwOZ15um7/u23ZZlflCW28NbQPpmU89XXTE6WRcBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBp/AbhqSeqCnPYIQAAAABJRU5ErkJggg=="
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
            <li>
              <img
                src="https://w7.pngwing.com/pngs/872/50/png-transparent-computer-icons-social-media-logo-twitter-social-media-blue-logo-social-media-thumbnail.png"
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
            <li>
              <img
                src="data:image/png;base64,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"
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
            <li>
              <img
                src="https://banner2.cleanpng.com/20180324/qiq/kisspng-social-media-facebook-computer-icons-logo-facebook-5ab6ebf06fdf95.2801350415219373924582.jpg"
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
            <li>
              <img
                src="https://banner2.cleanpng.com/20180324/qiq/kisspng-social-media-facebook-computer-icons-logo-facebook-5ab6ebf06fdf95.2801350415219373924582.jpg"
                style={{ width: '30px', height: '30px' }}
                alt=""
              />
            </li>
          </ul>
        </div>
        <div className="contactform">
          <h2>Login</h2>
          <form className="formBox" onSubmit={handleSubmit}>
            <div className="inputBox w100">
              <input
                required
                type="text"
                name="txtEmail"
                ref={emailRef}
              ></input>
              <span>Email Address</span>
            </div>
            <div className="inputBox w100">
              <input
                required
                type="password"
                name="txtPassword"
                ref={passwordRef}
              ></input>
              <span>Password</span>
              <p>{error}</p>
            </div>
            <div className="inputBox w100">
              <input type="submit" value="Login" name=""></input>
            </div>
          </form>
          <p>
            <a
              style={{ color: 'tomato' }}
              href="https://nhatcapdang.netlify.app"
            >
              Go to my website
            </a>{' '}
            <a href="https://nhatcapdang.netlify.app">
              nhatcapdang.netlify.app/login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default SignInPage;
