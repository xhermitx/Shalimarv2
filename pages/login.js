import {useRef} from 'react'
import axios from 'axios';

function login() {
    const passwordRef = useRef();
    const emailRef = useRef();

    const loginHandler = event =>{
        event.preventDefault();
        const eMail = emailRef.current.value;
        const passWord = passwordRef.current.value;

        axios.post("http://localhost:8080/login", JSON.stringify({
            email: eMail,
            password: passWord,
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log(res.data);
            localStorage.setItem('userID',res.data);
            // router.push('/');
          })
          .catch(err => {
            console.log(err);
          })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" ref={emailRef}/>
                <br/>
                <label>Password: </label>
                <input type="password" label="password" ref={passwordRef}></input>
                <br/>
                <button>
                    SUBMIT
                </button>
            </form>
        </div>
    )
}

export default login
