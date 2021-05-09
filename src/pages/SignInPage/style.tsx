import styled from 'styled-components';

const SingInPageWrapper = styled.section`
  .login-page {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: minmax(5rem, 1fr) 2fr minmax(5rem, 1fr);
    grid-template-rows: repeat(2, min-content) 1fr;
    grid-row-gap: 1.5rem;
  }

  /* login page nav */
  .login-page-nav {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    background-color: #fff;
    padding: 2.5rem 0;
    box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 30px;
    font-style: italic;
    font-weight: bold;
  }

  /* login */
  .login {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background-color: #fff;
    width: 100rem;
    display: grid;
    grid-template-columns: 10rem 8fr;
    grid-template-rows: 2fr 1fr;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  }

  .login-footer {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    background-color: #edf3f7;
    padding-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
  }

  .login-footer p {
    font-size: 1.6rem;
    font-weight: 300;
    margin: 0.5rem 0;
  }

  .login-footer a {
    text-decoration: none;
    color: #1aa1f5;
  }
`;

const FormWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: #fff;
  width: 100rem;
  display: grid;
  grid-template-columns: 10rem 8fr;
  grid-template-rows: 2fr 1fr;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);

  .login-content {
    grid-column: 2 / -1;
    grid-row: 1 /2;
    padding: 5rem 0 1rem 0;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
  }

  .login-form div {
    margin-top: 2rem;
  }

  .login-form label {
    font-size: 1.6rem;
    font-weight: 300;
    margin-right: 1rem;
  }

  .login-form a {
    text-decoration: none;
    font-size: 1.6rem;
    color: #1aa1f5;
  }
`;

export { SingInPageWrapper, FormWrapper };
