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
    TextInputChangeEventData
} from "react-native";


type OnScrollEventHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

interface Props {
    numItems: number,
    itemHeight: number,
    windowHeight: number,
    renderItem: Function,
    next: Function,
    size: number,
    items: Array<Object>
}


export const VirtualizedList = (props: Props) => {
    const { numItems, itemHeight, windowHeight, renderItem, next, size, items } = props;
    const [scrollTop, setScrollTop] = useState(0);
    const [fetching, setFetching] = useState(true);
    const innerHeight = numItems * itemHeight;
    const offset = 0;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - offset);
    const endIndex = Math.min(
        numItems - 1,
        Math.floor((scrollTop + windowHeight) / itemHeight) + offset
    );

    const onScroll: OnScrollEventHandler = (event) => {
        setScrollTop(event.nativeEvent.contentOffset.y);
    };

    const views = [];
    for (let i = startIndex; i <= endIndex; i++) {
        views.push(
            renderItem({
                index: i,
                style: {
                    position: "absolute",
                    top: i * itemHeight,
                    width: "100%",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 15
                }
            })
        );
    }

    let fn = async () => {
        setFetching(false);
        await next(Math.ceil((startIndex + size) /  size));
        setFetching(true);
    };

    useEffect(() => {
        if (items?.length <= startIndex + size && fetching && scrollTop !== 0) {
            fn();
        }
    }, [scrollTop, items]);

    return (
        <ScrollView
            style={{ height: windowHeight, width: '100%', marginTop: 25 }}
            onScroll={onScroll}
            scrollEventThrottle={50}
        >
            <View style={{ position: "relative", height: innerHeight }}>{views}</View>
        </ScrollView>
    );
};