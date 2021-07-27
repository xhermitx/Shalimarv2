import axios from 'axios';
import { useState } from 'react';

function docs() {
    const [File, setFile] = useState();
    const [uploadedImg, setUploadedImg] = useState('');
    const [toUser, setToUser] = useState();

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', localStorage.getItem('userID'));
        formData.append('email', toUser);
        formData.append('name', File.name);
        formData.append('file', File);

        const result = await axios.post('http://localhost:8080/upload', formData);
        console.log(result.data);
        const img = new Buffer(result.data.data).toString('base64');
        setUploadedImg(img);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
            <div>
                <label>Upload Image</label>
                <input type="file" accept="image/*" id="image" name="image" onChange={e=> setFile(e.target.files[0])} required />
                <label>Beneficiary's Email</label>
                <input type="email" id="beneficiary" onChange={e=> setToUser(e.target.value)} required></input>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            <br/>
            { uploadedImg.length > 0 &&
            <img
                src={`data:image/jpg;base64,${uploadedImg}`}
                width="500px"
                height="500px"
                alt="bhai nhi hua"/> }
            <a href={`data:image/jpg;base64,${uploadedImg}`} download="sample.jpg" target="_blank">This is the link</a>
            </form>

        </div>
    )
}

export default docs;
