import React, { useEffect, useState } from 'react'
import { addAddress, getAddress } from '../functionality';
import './Homepage.css';

function Homepage() {

    const [loadedAddress, setLoadedAddress] = useState([]);

    const [value, setValue] = useState({
        name: "",
        address: "",
        phoneNumber: ""
    });

    const [loading, setLoading] = useState(false);
    

    const handleChange = (event) => {
        setValue((value) => ({
            ...value, [event.target.name]: event.target.value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!value.name || !value.address || !value.phoneNumber) {
            alert("Please fill out all fields");
            return;
        }

        setLoading(true);
        try{

            await addAddress(value.name, value.address, value.phoneNumber);
            

            await loadAddress();

            setValue({
                name: "",
                address: "",
                phoneNumber: ""
            });
        }catch(error) {
            console.error(error);
        }
        setLoading(false);
        
    }

    const loadAddress = async () => {
        try {
            const addressFromContract = await getAddress();
            setLoadedAddress(addressFromContract);
        }catch(error) {
            console.error(error);
        }
    }


    useEffect(() => {
        loadAddress();
    },[]);



    return(
        <div className="container">
            <div className="heading">
                <h1>Address Book</h1>
                <p>You can store your contact addresses securely here in Blockchain</p>
            </div>
            
            <div className="inputform">
                <form>
                    <input type="text" name="name" placeholder='Name' onChange={handleChange} value={value.name}/>
                    <input type="text" name="address" placeholder='Address' onChange={handleChange} value={value.address} />
                    <input type="text" name="phoneNumber" placeholder='Phone Number' onChange={handleChange} value={value.phoneNumber}/>
                    <button onClick={handleSubmit} disabled={loading}>{loading ? "Wait..." : "Add"}</button>
                </form>
            </div>
            <hr/>
            <div className="addresssection">
                <ul>
                    <li>
                        <span className="slno">Sl No.</span>
                        <span className="regular">Name</span>
                        <span className="regular">Address</span>
                        <span className="regular">Phone Number</span>
                    </li>
                    {loadedAddress.length > 0 ? (loadedAddress.map((adrs, index) => (
                        <li key={Number(adrs.addressId)}>
                            <span className="slno">{Number(adrs.addressId)}</span>
                            <span className="regular">{adrs.addresName}</span>
                            <span className="regular">{adrs.contactAddress}</span>
                            <span className="regular">{adrs.phoneNumber}</span>
                        </li>
                    ))
                ):(<li>No Address Found</li>)}
                </ul>
            </div>

            <div className="footer">
                <p>Created by <strong>Rezwan Ahammed Tuhin</strong></p>
                <p><a href="https://facebook.com/rezwan.tuhin" target='_blank'>Facebook</a><a href="https://www.linkedin.com/in/rezwantuhin/" target="_blank">LinkedIn</a></p>
            </div>
        </div>
    )
}

export default Homepage;