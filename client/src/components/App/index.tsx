import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const USERS_LIST = gql`
    {
        users {
            id
            lastName
            firstName
        }
    }
`;

const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!) {
        createUser(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
        id
        firstName
        lastName
    }
  }
`;

const App = () => {
    const [userList, setUserList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { loading, data } = useQuery(USERS_LIST);
    const [createUser] = useMutation(CREATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    useEffect(() => {
        if (!loading) {
            setUserList(data.users);    
        }
    }, [loading]);

    const handleOnClickSubmit = async () => {
        if (!!firstName && !!lastName) {
            const newUsersList = await createUser({ variables: { firstName, lastName }});
            setUserList(newUsersList.data.createUser);
        } 
        return ;
    }

    const handleDeleteUser = async (id: any) => {
        const newUsersList = await deleteUser({ variables: { id }});
        setUserList(newUsersList.data.deleteUser);
    }

    if (loading) return <CircularProgress />;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <form>
                    <TextField label="Enter First Name" onChange={(e) => setFirstName(e.target.value)}/>
                    <TextField label="Enter Last Name"  onChange={(e) => setLastName(e.target.value)}/>
                    <Button variant="contained" color="primary" onClick={() => handleOnClickSubmit()}>Ajouter</Button>
                </form>
                <List component="nav">
                    {userList && userList.map((user: any) => {
                        return (
                            <ListItem key={user.id} button>
                                <ListItemText primary={user.lastName + ' ' + user.firstName} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => { handleDeleteUser(user.id); }} edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </React.Fragment>
    );
}

export default App;