import { useRef } from 'react'
import axios from 'axios';

function signup() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const signupHandler = event => {
        const Name = nameRef.current.value;
        const passWord = passwordRef.current.value;
        const eMail = emailRef.current.value;

        event.preventDefault();
        axios.post("http://localhost:8080/signup", JSON.stringify({
            name: Name,
            email: eMail,
            password: passWord
        }),
        {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            console.log(res.data);
        })
        .then(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={signupHandler}>
                <label >Name: </label>
                <input id="name" type="text" ref={nameRef}/>
                <br/>
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

export default signup
