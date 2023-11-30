import React, { useState } from 'react';
import {ImageBackground, StyleSheet, View, Text, Button, Linking } from 'react-native';
import * as Location from 'expo-location';



const App = () => {
  const [location, setLocation] = useState(null);
  
  const image = { uri: "https://docs.expo.dev/static/images/tutorial/splash.png" };

  const getLocation = async () => {
    // Request permission to access location in foreground
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }


    // Get the current position of the device
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };


  const sendLocation = () => {
    if (location) {
      const tweet = `Latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
      Linking.openURL(url).catch(err => console.error("An error occurred", err));
    } else {
      console.log('No location available to send');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : 'No location'}</Text>
      <Text>Longitude: {location ? location.coords.longitude : 'No location'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});


export default App;