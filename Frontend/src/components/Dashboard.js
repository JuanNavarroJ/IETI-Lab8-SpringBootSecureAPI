import React, { useEffect }  from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {red} from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import UserProfile from './UserProfile';
import NewTask from './NewTask';
import TaskFilters from './TaskFilters';
import ListUsers from './ListUsers';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  depositContext: {
    flex: 1,
  },
  root1: {
    minWidth: 275,
  },
  red: {
    color: '#fff',
    backgroundColor: red[500],
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({name:"Juan David",email:"Juan.navarro@mail.escuelaing.edu.co"});
  const [filters] = React.useState([]);
  const [state, setState] = React.useState(0);
  const [taskList ,setTaskList] = React.useState([]); 
  
  useEffect (() => {
    setTaskList([]);
    fetch('http://localhost:8080/api/tasks', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
          data.map(task => {
            setTaskList(taskList => [...taskList, task]);
          })
      }).catch(error => {
        console.log(error)
    });
  }, [state]);  

  const handleUpdateTasks = (e) =>{
    setState(state + e);
  }
  const handleChangeUser = (algo) => {
    setUser(algo);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Task Planner
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <br/>
        <div>
            <Card className={classes.root1} variant="outlined">
            <br/>
            <Avatar />
                <Typography variant="overline" display="block" color="primary" gutterBottom>
                    {user.name}          
                </Typography>
                <Typography variant="caption" display="block" color="primary" gutterBottom>
                    {user.email}           
                </Typography>
                <UserProfile fun={handleChangeUser}/>                
            </Card>
        </div>
        <br/><br/><br/><br/><br/><br/>
        <TaskFilters/>
        <ListUsers userList={props.userList}/>
        <br/><br/><br/><br/><br/><br/>
        <Link to="/Login">
            <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
            >
                <Typography variant="body2">
                    Logout
                </Typography>
            </Button>
        </Link>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
            <Container maxWidth="lg" className={classes.containerPaper}>
            <Grid container spacing={2} className={classes.actionSpacer}>
              {taskList.map(task => {
                return (filters.length === 0 || filters.includes(task.dueDate) || filters.includes(task.responsible) || filters.includes(task.status)) ?
                  <Grid key={task.id} xs={12} sm={6} md={4} lg={5} xl={2} item>
                    <Card className={classes.root1} variant="outlined">
                        <CardContent>
                            <React.Fragment>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    {task.description}
                                </Typography>
                                <div>
                                <Typography component="p" variant="h5">
                                    {task.status} <AssignmentIcon className={classes.red}/>
                                </Typography>
                                
                                </div>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    {task.dueDate}
                                </Typography>
                                <Typography component="p" variant="body2" color="primary">
                                    {task.responsible.firstname + " " + task.responsible.lastname}
                                </Typography>
                            </React.Fragment>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Leer más</Button>
                        </CardActions>
                    </Card>
                  </Grid>
                  :
                  null
              })}
            </Grid>
            <NewTask fun={handleUpdateTasks}/>
            </Container>            
      </main>
    </div>
  );
}