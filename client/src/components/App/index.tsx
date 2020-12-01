import React from 'react';
import { useQuery, gql } from '@apollo/client';

import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const USERS_LIST = gql`
    {
        users {
            id
            lastName
            firstName
        }
    }
`;

const App = () => {
    const { loading, error, data } = useQuery(USERS_LIST);

    if (loading) return <CircularProgress />;

    const { users } = data;
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <List component="nav">
                    {users && users.map((user: any) => {
                        return (
                            <ListItem key={user.id} button>
                                <ListItemText primary={user.lastName + ' ' + user.firstName} />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </React.Fragment>
    );
}

export default App;