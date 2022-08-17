
import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 15,
        width: '80%'
    },
    title: {
        fontSize: 25,
        fontWieght: 900,
        padding: 15
    },
    container: { 
        flexDirection: 'column', 
        alignItems: 'center' ,
        height: '100%'
    }, 
    listUsers: { 
        height: '100%', 
        width: '100%', 
        marginTop: 20 
    }
});