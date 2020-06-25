import { useState, useEffect } from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function useForm(initialValues, formSchema) {
    
    const [user, setUser] = useState([]);

    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    useEffect(() => {
        axiosWithAuth()
          .get(`https://secret-family-recipes1.herokuapp.com/api/auth/register`)
          .then(res => {
            setUser(res.data)
          })
      }, [])
    
      const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    };

    return [newUser, handleChange];
}