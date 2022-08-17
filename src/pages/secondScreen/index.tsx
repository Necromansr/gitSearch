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
import {requestData} from '../../util/api'
import { Users, Repos } from '../../util/interface'

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






interface Repositories {
    item: Repos,
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
    const user: Users = route?.params!;
    
    let [items, setItems] = useState<Repos[]>([]);
    let [search, setSearch] = useState('');

    let request = async () => {
        let result = await requestData(`/users/${user.login}/repos`)
        setItems(result);
    }

    useEffect(() => {
        request();
    }, [user])

    const onInput = async (text: string) => {
        setSearch(text);
    };

    const renderItem = ({ item }: Repositories) => (
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
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}


