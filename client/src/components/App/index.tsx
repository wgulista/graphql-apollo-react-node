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

const USERS_LIST = gql`
    {
        users {
            id
            lastName
            firstName
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
    const { loading, error, data } = useQuery(USERS_LIST);
    const [deleteUser] = useMutation(DELETE_USER);

    useEffect(() => {
        if (!loading) {
            setUserList(data.users);    
        }
    }, [loading]);

    const handleDeleteUser = async (id: any) => {
        const newUsersList = await deleteUser({ variables: { id }});
        console.log(newUsersList.data)
        setUserList(newUsersList.data.deleteUser);
    }

    if (loading) return <CircularProgress />;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
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