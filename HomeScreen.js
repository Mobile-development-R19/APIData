import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Fineli API -sovellus</Text>

      <TouchableOpacity
       style={styles.button}
      onPress={() => navigation.navigate('Haku')}>
        <Text style={styles.buttonText}>Hae ruokia APIsta</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>APIn tarjoaa Fineli</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 6,
        padding: 10,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
    },
    disclaimer: {
      color: 'black',
      fontSize: 10,
      opacity: 0.5,
      textAlign: 'center',
      marginTop: 10
    }
})