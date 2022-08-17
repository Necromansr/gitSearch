import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    FlatList
} from "react-native";
import { debounce } from "underscore";
import { styles } from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/RootStack';
import dayjs from 'dayjs';
import { RouteProp } from '@react-navigation/native';
//@ts-ignore
import {API_URL, GITHUB_API_KEY} from '@env';

interface Items {
    index: number,
    style: object
}


type ScreenNavigationProp<
    T extends keyof RootStackParamList
    > = NativeStackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    T
>;
type Props<T extends keyof RootStackParamList> = {
    route: ScreenRouteProp<T>;
    navigation: ScreenNavigationProp<T>;
};




interface User {
    avatar_url: string
    login: string,
    email: string,
    location: string,
    created_at: string,
    followers: number,
    following: number,
}

interface Repositories {
    item: {
        id: number,
        owner: {
            avatar_url: string
        },
        name: string,
        forks_count: number
        stargazers_count: number,
    },

}

const Item = (props: Repositories) => (
    <View key={props.item?.id} style={styles.containerRepositories}>
        <Image
            style={styles.imageRepositories}
            source={{ uri: props.item?.owner?.avatar_url }}
        />
        <Text>{props.item?.name}</Text>
        <View>
            <Text>{props.item?.forks_count} Forks</Text>
            <Text>{props.item?.stargazers_count} Stars</Text>
        </View>
    </View>
);


export const SecondScreen: React.FC<Props<'User'>> = ({ route }) => {
    const user: User = route?.params!;
    
    let [items, setItems] = useState<any[]>([]);
    let [search, setSearch] = useState('');

    let request = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "token " + GITHUB_API_KEY);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let data = await fetch(`${API_URL}/users/${user.login}/repos`, requestOptions);
        let result = await data.json();
        
        setItems(result);
    }

    useEffect(() => {
        request();
    }, [user])

    const onInput = async (text: string) => {
        setSearch(text);
    };

    const renderItem = ({ item }: any) => (
        <Item item={item} />
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>GitHub Searcher</Text>
            <View style={styles.userInfo}>
                <Image style={styles.userImage} source={{ uri: user?.avatar_url }} />
                <View>
                    <Text>{user.login}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.location}</Text>
                    <Text>{dayjs(user.created_at).format('DD/MM/YYYY')}</Text>
                    <Text>{user.followers}</Text>
                    <Text>{user.following}</Text>
                </View>
            </View>
            <TextInput onChangeText={debounce(onInput, 500)} style={styles.input} placeholder={"Search for User's Repositories"} />
            <FlatList
                style={styles.listRepositories}
                data={items.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}


