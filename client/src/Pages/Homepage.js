import {useEffect, useState} from 'react'
import axios from 'axios';
 

function Homepage(){

    const [data,setData] = useState("");

    const fetchData = async() => {
        const res = await axios.get("/hello");
        console.log(res)
        setData(res.data);
    }

    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div>
       {data.length>0 && <h2>{data}</h2>}
       </div>
    )
}

export default Homepage;