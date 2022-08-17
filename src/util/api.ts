
//@ts-ignore
import {API_URL, GITHUB_ACCESS_KEY} from '@env';

export const requestData = async (url: string) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "token " + GITHUB_ACCESS_KEY);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    let data = await fetch(API_URL + url, requestOptions);
    return await data.json();

}