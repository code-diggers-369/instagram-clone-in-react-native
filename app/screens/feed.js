import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config';
import { functions } from 'firebase';
import PhotoList from '../components/photoList';

class feed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    render()
    {
        return(
            <View style={{flex: 1}}>
                <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center',alignItems: 'center'}}>
                    <Text>Feed</Text>
                </View>

                <PhotoList isUser={false} navigation={this.props.navigation}/>
                
            </View>
        )
    }
}

export default feed;