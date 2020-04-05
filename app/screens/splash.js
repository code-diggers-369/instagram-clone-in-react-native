import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';

class splash extends React.Component{

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            3000
          )
        )
      }

      async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
    
        if (data !== null) {
          this.props.navigation.navigate('HomeStack');
        }
      }

      render() {
        return (
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundContainer}>
                <Image source={require('../../assets/logo.png')} style={styles.logoStyles} />
                <Text style={styles.textStyles}>Social Beta</Text>
                <Text style={styles.createdStyles}>Created By Haresh And Prashant</Text>
            </ImageBackground>
        );
      }
}

const styles = {
    textStyles: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    },
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
    logoStyles: {
        height: 200,
        width: 200
    },
    createdStyles: {
        color: 'white',
        paddingTop: 10,
        fontSize: 18
    }
  }

export default splash;