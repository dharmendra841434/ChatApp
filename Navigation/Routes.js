import React, { useContext, useState, useEffect } from 'react';
import StackNav from './StackNav';
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

const Routes = () => {
    const [user, setUser] = useState(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <>
            {user ? <AppStack /> : <StackNav />}
        </>
    );
}

export default Routes;