
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
        alignItems: 'center',
        height: '100%'
    },
    containerRepositories: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        paddingHorizontal: 15, 
        paddingVertical: 5, 
        alignItems: 'center', 
        alignContent: 'center' 
    },
    imageRepositories: {
        width: 55,
        height: 55
    },
    userInfo: { 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        width: '100%', 
        padding: 20 
    },
    userImage: { 
        width: 120, 
        height: 120 
    },
    listRepositories: { 
        height: '100%', 
        width: '100%', 
        marginTop: 20 
    }
});