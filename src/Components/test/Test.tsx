import { useEffect, useState } from 'react';
import axios from 'axios';
const Test:React.FC=() => {

    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/hello')
            .then((res) => {
                setData(res.data.message);
            })
    }, []);

    return (
        <div>
            <p>{data}</p>
        </div>
    )
}

export default Test;
