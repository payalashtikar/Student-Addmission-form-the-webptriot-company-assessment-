

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllDataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItem, setSearchItem] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/alldata');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Unable to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/deleteuser/${id}`);
            setData((prevData) => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
            alert("deleted")
        }
    };

    const handleSearchItem = (event) => {
        setSearchItem(event.target.value);
    }

    // Filter data based on the searchItem
    const filteredData = data.filter(item => {
        const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
        return fullName.includes(searchItem.toLowerCase());
    });

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
                Error: {error}
            </Typography>
        );
    }

    return (
        <div style={{width:'100%',height:'auto'}}>
            {/* <input style={{ padding: '10px', margin: '25px 20px', width: '200px' }} type='text' placeholder='search by name' value={searchItem} onChange={handleSearchItem} /> */}

            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'auto',alignItems:'center'}}>
                <div style={{padding:'5px',margin:'25px',borderRadius:'10px'}}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="search your name"
                        inputProps={{ 'aria-label': 'search your name' }}
                        value={searchItem} onChange={handleSearchItem}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>

                <Typography variant="h4" gutterBottom>
                    All Students Data
                </Typography>
              <List style={{display:'flex',flexDirection:'column-reverse'}}>
                    {filteredData.map((item) => (
                        <ListItem key={item._id} style={{ border: '1px solid gray',borderRadius:'15px', margin: '15px 15px', width: '600px'  }}>
                            <ListItemText
                                primary={`Roll No: ${item.rollNo}`}
                                secondary={
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px'  }}>
                                            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                                                <div
                                                    className="profile"
                                                    style={{ border: '1px solid #eee', width: '150px', height: '10rem', margin: '5px', marginTop: '5%', }}>
                                                    <img
                                                        src={item.profilePhoto} alt=""
                                                        style={{ width: '150px', height: '10rem', }} />
                                                </div>
                                            
                                            {/* </div> */}
                                            <div>
                                                <div className='icons'>
                                                    <Link to={'/updatestudent/' + item._id}>
                                                        <EditIcon style={{ padding: '5px', alignItems: 'right' ,cursor:'pointer'}} />
                                                    </Link>
                                                    <DeleteIcon style={{ padding: '5px', alignItems: 'right',cursor:'pointer' }} onClick={() => handleDelete(item._id)} />
                                                </div>

                                                {/* <Typography style={{padding:'5px',fontSize:'medium'}} variant="body2">Roll No.: {item.rollNo}</Typography> */}
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">First Name: {item.firstName}</Typography>
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">Last Name: {item.lastName}</Typography>
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">Email: {item.email}</Typography>
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">Address: {item.address}</Typography>
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">Subject: {item.subject}</Typography>
                                                <Typography style={{ padding: '5px', fontSize: 'medium' }} variant="body2">Gender: {item.gender}</Typography>
                                            </div>
                                        </div>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default AllDataComponent;
