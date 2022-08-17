import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TextInputChangeEventData,
    TouchableOpacity
} from "react-native";

interface ItemProps {
    user: {
        id: number,
        avatar_url: string,
        login: string,
        public_repos: number,
        forks: number,
        stars: number
    },
    onClick?: Function
}

export const Item = (props: ItemProps) => (
    <TouchableOpacity key={props.user?.id} style={styles.container} onPress={(event) => props.onClick?.(event)}>
        <Image
            style={styles.img}
            source={{ uri: props.user?.avatar_url }}
        />
        <Text>{props.user?.login}</Text>
        <Text>{props.user?.public_repos}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    img: {
        width: 55,
        height: 55
    },
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 15
    }
});