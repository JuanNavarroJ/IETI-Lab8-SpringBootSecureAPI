import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
    add: {
      position: 'relative',
      bottom: '5%',
      left: '47%',
    },
}));

export default function NewTask(props) {
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);
    const [state, setState] = React.useState('');
    const handleClickOpen = () => {
        setOpenForm(true);
    };
    const handleClose = () => {
        setOpenForm(false);
    };
    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const addTask = () => {
        fetch('http://localhost:8080/api/tasks' , { 
            method:'POST',
            headers:{
              'Content-Type': 'application/json ',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
            body:JSON.stringify({description:document.getElementById("desc").value,status:state,dueDate:document.getElementById("date").value})
          }).then(function(response) {
                if(response.ok){
                    response.json().then(function(res) {
                        console.log(res);
                    })
                    props.fun(1);
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
                setOpenForm(false);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

  return (
    <div>
        <Button 
            className={classes.add}
            color="primary"
            onClick={handleClickOpen}
            startIcon={<AddCircleIcon style={{ fontSize: 70 }}/>}>
        </Button>
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Complete the data of the new task.
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="desc"
                    label="Description"
                    variant="outlined"
                    type="text"
                    fullWidth
                />
                <InputLabel id="demo-mutiple-name-label">State</InputLabel>
                <Select
                    required
                    id="stateForm"
                    onChange={handleChangeState}
                    labelId="demo-mutiple-name-label"
                    margin="dense"
                    displayEmpty
                    variant="outlined"
                    fullWidth
                >
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Ready">Ready</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2020-09-04"
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={addTask} color="primary">
                Add
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}