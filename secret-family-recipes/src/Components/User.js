import React, { useState, useEffect } from 'react'
import axios from 'axios'

function User(props){

    const [user, setUser] = useState({})

    useEffect(() =>{
        axios.get('dummy')
            .then(data =>{
                //do nothing because no data is coming from dummy
            })
    }, [])

    return (
        <div>

        </div>
    )
}

export default User