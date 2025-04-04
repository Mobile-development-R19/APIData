import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
       style={styles.button}
      onPress={() => navigation.navigate('FoodSearch')}>
        <Text style={styles.buttonText}>Hae ruokia APIsta</Text>
      </TouchableOpacity>
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
    }
})