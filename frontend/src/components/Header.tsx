import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ExportToExcel } from './ExportExcel';

type HeaderProps = {
  toggleDrawer: (open: boolean) => () => void;
	isInstall: boolean;
};

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const Header = ({ toggleDrawer, isInstall }: HeaderProps) => {
  // const navigate = useNavigate();
  return (
    <AppBar sx={{ backgroundColor: '#bc87ed', boxShadow: 'none', position: 'static', p: 0 }}>
      <Toolbar className="header__flex" disableGutters>
        <Typography sx={{ fontWeight: 600 }} variant="h5" noWrap component="div">
          Разработка
        </Typography>
        <Box className="header__box" sx={{ display: 'flex', alignItems: 'center' }}>
					{isInstall && <ExportToExcel />}
          
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
          {/* <Button
            onClick={() => navigate('/login')}
            variant="outlined"
            color="inherit"
            sx={{ ml: 1 }}>
            Войти
          </Button> */}

          <button
            style={{ backgroundColor: '#bc87ed', marginLeft: '20px' }}
            onClick={toggleDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
