import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFooter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          transition: 'height 0.3s ease, opacity 0.3s ease',
          backgroundColor: '#003366',
          color: 'white',
          borderTop: '1px solid #00509e',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 999,
          height: isOpen ? '300px' : '0px',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            padding: '10px', 
            display: 'block',
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Connect with Us
          </Typography>
          <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }}
                startIcon={<HomeIcon />}
                onClick={() => window.scrollTo(0, 0)} 
              >
                Home
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }}
                startIcon={<InfoIcon />}
                onClick={() => console.log('Info clicked')} 
              >
                About
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }} 
                startIcon={<ContactMailIcon />}
                onClick={() => console.log('Contact clicked')} 
              >
                Contact
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }} 
                startIcon={<GitHubIcon />}
                onClick={() => window.open('https://github.com/', '_blank')} 
              >
                GitHub
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h6" align="center" gutterBottom>
            Follow Us
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }} 
                startIcon={<FacebookIcon />}
                onClick={() => window.open('https://facebook.com', '_blank')}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }} 
                startIcon={<TwitterIcon />}
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                Twitter
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ color: 'white', fontSize: '0.8rem' }} 
                startIcon={<InstagramIcon />}
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                Instagram
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={toggleFooter}
        sx={{
          position: 'fixed',
          bottom: isOpen ? '300px' : '0px', 
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopLeftRadius: '50px',  
          borderTopRightRadius: '50px', 
          border: 'none',
          bgcolor: '#007bff',
          color: 'white',
          width: '40px', 
          height: '40px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          transition: 'bottom 0.3s ease', 
        }}
      >
        {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Button>
    </Box>
  );
};

export default Footer;
