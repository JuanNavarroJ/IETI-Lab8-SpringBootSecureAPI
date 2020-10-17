import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ListUsers(props) {
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);
    
    const handleClickOpen = () => {
    setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    return (
        <div>
            <Button 
                variant="contained"
                fullWidth
                color="inherit"
                onClick={handleClickOpen}
                startIcon={<PeopleAltIcon />}
            >
                <Typography variant="body2">
                    User List
                </Typography>
            </Button>
            <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">User List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All users returned by the Backend(API).
                    </DialogContentText>
                    {props.userList.map(user => 
                        <div>
                            {console.log(user)}
                            <List className={classes.root}>
                                <Divider variant="inset" component="li" />
                                <ListItem alignItems="flex-start" key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText id={user.id} primary={user.name} secondary={user.email} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </List>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}