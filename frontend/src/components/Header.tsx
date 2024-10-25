import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ backgroundColor: '#bc87ed', boxShadow: 'none', position: 'static' }}>
      <Toolbar>
        <Typography sx={{ fontWeight: 600 }} variant="h5" noWrap component="div">
          Разработка
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Поиск"
            sx={{ bgcolor: 'white', borderRadius: 1, mx: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            color="inherit"
            sx={{ ml: 1 }}>
            Войти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
