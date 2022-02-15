import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        if (e.code === 'auth/wrong-password') {
                            alert("Wrong password try again!");
                        }
                        if (e.code === 'auth/user-not-found') {
                            alert("No user registered with that email");
                        }
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        // .then(()=>{
                        //     console.log(auth().currentUser);
                        // })
                    } catch (e) {
                        if (e.code === 'auth/email-already-in-use') {
                            alert("Email id already used")
                        }

                        if (e.code === 'auth/invalid-email') {
                            alert("Invalid-email !")
                        }

                        console.error(error);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                },
                updatePassword: async (Password) => {
                    try {
                        await auth().currentUser.updatePassword(Password)
                            .then(() => {
                                alert("Password Change Sucessfully.")
                            })
                    } catch (e) {
                        console.log(e);
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};