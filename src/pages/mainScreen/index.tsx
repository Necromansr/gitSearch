import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList
} from "react-native";
import { debounce } from "underscore";
import { styles } from './style';
import { Item } from '../../components/Item';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/RootStack';
import { RouteProp } from '@react-navigation/native';
//@ts-ignore
import {API_URL, GITHUB_ACCESS_KEY} from '@env';

interface Items {
  index: number,
  style: object
}

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


export const FirstScreen: React.FC<Props<'Home'>> = ({ navigation }) => {

  let [items, setItems] = useState<any[]>([]);
  let [search, setSearch] = useState<string>('');
  let [page, setPage] = useState<number>(1);
  let [fetching, setFetching] = useState<boolean>(true);

  const onInput = async (text: string) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "token " + GITHUB_ACCESS_KEY);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    let data = await fetch(`${API_URL}/search/users?q=${text}&per_page=15&page=1`, requestOptions);
    let result = await data.json();
    
    if (result?.items) {
      let arr = result.items.map(async (x: any) => {

        let data = await fetch(`${API_URL}/users/${x.login}`, requestOptions);
        return await data.json();
      });

      setItems(await Promise.all(arr));
      setSearch(text);
    }
  };


  let requestApi = async () => {
    var myHeaders = new Headers();
      myHeaders.append("Authorization", "token " + GITHUB_ACCESS_KEY);
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      let data = await fetch(`${API_URL}/search/users?q=${search}&per_page=15&page=${page}`, requestOptions);
      let result = await data.json();
  
      if (result?.items) {
        let arr = result.items.map(async (x: any) => {
          let data = await fetch( `${API_URL}/users/${x.login}`, requestOptions);
          return await data.json();
        });
        let temp = [...items, ...(await Promise.all(arr))];

        setItems(temp);
        setFetching(true)
      }
  }

  useEffect(() => {
      if(page !== 1) {
        requestApi();
      }
  }, [page])

  let loadMore = () => {
    if(fetching)
      setPage(page + 1)
  }

  const renderItem = ({ item }: any) => (
    <Item key={item.id} user={item} onClick={() => navigation.push('User', item)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Searcher</Text>
      <TextInput onChangeText={debounce(onInput, 500)} style={styles.input} placeholder={'Search for Users'} />
      <FlatList
        style={styles.listUsers}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
      />
    </View>
  );
}


