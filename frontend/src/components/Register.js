import { useState } from "react";
import Header from "./Header";

function Register(props) {
  
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
    props.onRegisterUser({
      email, 
      password
    })
  }
  
  return (
    <main className="content">
      <Header
        buttonName='Войти'
        headerLink='/sign-in'
      />
      <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" name="Register" onSubmit={handleSubmit}>
        <div className="auth__label">
          <input 
            className="auth__input" 
            id="input-email-auth" 
            type="text" 
            placeholder="Email" 
            name="email" 
            minLength="2" 
            maxLength="30" 
            required 
            onChange={handleChangeEmail} 
            value={email}/>
          <span className="input-email-auth__error"></span>
        </div>
        <div className="auth__label">
          <input 
            className="auth__input" 
            type="password" 
            placeholder="Пароль" 
            name="password"
            required
            id="input-password-auth" 
            onChange={handleChangePassword} 
            value={password}/>
          <span className="input-password-auth__error"></span>
        </div>
          <button className="auth__button" type="submit">Зарегистрировать</button>
        </form>
      </section>
    </main>
  )
}

export default Register;