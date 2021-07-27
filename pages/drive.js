import { useState, useEffect } from 'react'
import axios from 'axios';

function drive() {
    const [images, setImages] = useState([]);

    useEffect(async () => {
        const resultArray = await axios.get('http://localhost:8080/drive', {
            params: {
                id: localStorage.getItem('userID')
            }
        })
        console.log(resultArray.data[0]);
        const results = resultArray.data.map(item => ({
            name: item.name,
            content: new Buffer(item.data.data).toString('base64')
        }));
        // const image = new Buffer(resultArray.data[0].data.data).toString('base64');
        // console.log(image);
        setImages(results);
    },[images])

    // console.log(images);
    return (
        <div>
            DRIVE
            {images.map(img =>(
                <div>
                    <h1>{img.name}</h1>
                    {/* <img src={`data:image/jpg;base64,${img.content}`} alt="nahi aaya bhai"/> */}
                    <a href={`data:image/jpg;base64,${img.content}`} download={img.name}>Download</a>
                </div>
            ))}
            <br/>
        </div>
    )
}

export default drive
