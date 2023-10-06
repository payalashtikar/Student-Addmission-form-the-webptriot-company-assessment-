import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }} style={{margin:0,padding:0}}>
            <AppBar position="static" >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Typography variant="h6" component="div" >
                        Student Addmission Form
                    </Typography>
                    <Link to='/studentform'>
                        <Button color="inherit" style={{color:'white',border:'1px solid white'}}>+ Add</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}