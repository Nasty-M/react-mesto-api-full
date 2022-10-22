import { useState, useEffect } from "react";
import Header from "./Header";

function Login(props) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLoginUser({
      email, 
      password
    })
  }

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  
  return (
    <main className="content">
      <Header
        buttonName='Регистрация'
        headerLink='/sign-up'
      />
      <section className="auth">
      <h2 className="auth__title">Вход</h2>
        <form className="auth__form" name="Login" onSubmit={handleSubmit}>
        <div className="auth__label">
          <input 
            className="auth__input" 
            id="input-email-login" 
            type="text" 
            placeholder="Email" 
            name="email" 
            minLength="2" 
            maxLength="30" 
            required 
            onChange={handleChangeEmail} 
            value={email}/>
          <span className="input-email-login__error"></span>
        </div>
        <div className="auth__label">
          <input 
            className="auth__input" 
            type="password" 
            placeholder="Пароль" 
            name="password"
            required
            id="input-password-login" 
            onChange={handleChangePassword} 
            value={password}/>
          <span className="input-password-login__error"></span>
        </div>
          <button className="auth__button" type="submit">Войти</button>
        </form>
      </section>
    </main>
  )
}

export default Login;