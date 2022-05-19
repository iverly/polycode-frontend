import React, { useState } from 'react';
import MAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const pages = ['Practice', 'Certification', 'Challenges'];

export default function AppBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { text: 'Profile', handleClick: () => null },
    { text: 'Settings', handleClick: () => null },
    { text: 'Logout', handleClick: () => { auth.logout(); } },
  ];

  return (
    <MAppBar position="static" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <CodeIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              component="div"
            >
              PolyCode
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ mr: 2 }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' }, flexDirection: 'row', alignItems: 'center', cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <CodeIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              PolyCode
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2, color: 'white', display: 'block', mr: 2,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box>
            {auth.isAuthenticated && (
              <Tooltip title="Click to open">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
            )}
            {!auth.isAuthenticated && (
              <Button
                onClick={() => navigate('/auth/login')}
                sx={{
                  my: 2, color: 'white', display: 'block', mr: 2,
                }}
              >
                Login
              </Button>
            )}
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.text}
                  onClick={() => { setting.handleClick(); handleCloseUserMenu(); }}
                >
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MAppBar>
  );
}
