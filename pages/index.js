import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState} from 'react';

export default function Home() {
  // const [dong, setDong] = useState('dong');

  const clickHandler = event => {
    console.log('test1');
    axios.get('http://localhost:8080/', {
      params: {
        message: 'hello'
      }
    },
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
    })
    .then(err => {
      console.log(err);
    })
    console.log('test2');
  }

  return (
    <div className={styles.container}>
      This is Home Page
      <button onClick={clickHandler}>Click Me</button>
    </div>
  )
}
