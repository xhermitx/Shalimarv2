import axios from 'axios';
import { useState } from 'react'

function claim() {
    const [file, setFile] = useState();
    const [email, setEmail] = useState();
    const [resultImage, setResultImage] = useState('');

    const submitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('file', file);
        console.log(file)
        const result = await axios.post('http://localhost:8080/claim', formData);
        console.log(result);
        const img = new Buffer(result.data.data).toString('base64');
        setResultImage(img);
    }

    return (
        <div>
            <h2>Upload the death certificate</h2>
            <form onSubmit={submitHandler}>
                <label >Email of the concerned person: </label>
                <input type="email" onChange={e=> setEmail(e.target.value)}/>
                <br/>
                <input type="file" accept="image/*" id="image" name="image" onChange={e=> setFile(e.target.files[0])} required />
                <button>Submit</button>
            </form>
            {resultImage.length>0 && <img src={`data:image/jpg;base64,${resultImage}`} alt="nahi aaya bhai"/>}
        </div>
    )
}

export default claim
