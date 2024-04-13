import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <footer className="fixed-bottom bg-light text-muted shadow" style={{ padding: '10px', marginTop: '-20px' }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <a href="https://github.com/harshsharma24h" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="small" style={{ color: '#bfbfbf' }} />
            </a>
            <a href="https://www.instagram.com/__.harsh__sharma.__?igsh=MW81MWM1Z3B3cW11Nw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="mx-2">
              <InstagramIcon fontSize="small" style={{ color: '#bfbfbf' }} />
            </a>
            <a href="https://www.linkedin.com/in/harsh-sharma24h?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="small" style={{ color: '#bfbfbf' }} />
            </a>
          </div>
          <div className="col-auto text-center text-md-start">
            <p className="m-0 d-block d-md-inline">©2024 </p>
            <p className="m-0 d-block d-md-inline">Designed and Developed by Harsh Sharma</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
