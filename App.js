import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

// import {makeServer} from './server';

// if (typeof global.self === "undefined") global.self = global;

// makeServer();

const App = () => {
  let [users, setUsers] = useState([]);
  let [serverError, setServerError] = useState();

  useEffect(() => {
    let fetchUsers = async () => {
      try {
        let res = await fetch('http://localhost:3000/v1/api/users');
        let data = await res.json();

        if (!res.ok) {
          throw data;
        }

        setUsers(data.users);
      } catch (error) {
        setServerError(error.error);
      }
    };

    fetchUsers();
  }, []);

  if (serverError) {
    return (
      <SafeAreaView style={{flex: 1}} testID="server-error">
        <Text testID="server-error-message">{serverError}</Text>
      </SafeAreaView>
    );
  }

  return users.length === 0 ? (
    <SafeAreaView style={{flex: 1}} testID="empty-users">
      <Text>No users have been found!</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{flex: 1}} testID="user-list">
      {users.map(user => {
        return (
          <View key={user.id}>
            <Text>{user.name}</Text>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default App;
