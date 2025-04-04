import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

// FoodSearch on hakusivu, jossa käyttäjä voi etsiä ruokia Fineli API:sta.
export default function FoodSearch({ navigation })  {
    
    const [query, setQuery] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hakee ruoat API:sta käyttäjän syötteen perusteella
    const handleSearch = async () => {
        setLoading(true); // Näytetään latausanimaatio

        try {
            // Lähetetään GET-pyyntö Fineli API:lle käyttäjän syötteen perusteella
            const response = await axios.get(`https://fineli.fi/fineli/api/v1/foods?q=${query}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            setFoods(response.data); // Tallennetaan tulokset
        } catch (error) {
            console.error("Error fetching data", error); 
        } finally {
            setLoading(false); // Poistetaan latausanimaatio
        }
    };

    return (
        <View style={styles.container}>
            {/* Hakukenttä, johon käyttäjä voi kirjoittaa haettavan ruoan nimen */}
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={setQuery}
                placeholder="Hae ruokaa..."
            />

            {/* Hae-nappi painettuna käynnistää haun */}
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={styles.buttonText}>Hae</Text>
            </TouchableOpacity>

            {/* Näytetään latausanimaatio, kun haku on käynnissä */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {/* Skrollattava lista hakutuloksista */}
            <ScrollView>
                {foods.map((food) => (
                    <TouchableOpacity
                        key={food.id}
                        style={styles.card}
                        onPress={() => navigation.navigate('Ravintotiedot', { foodId: food.id })}
                    >
                        <Text style={styles.foodName}>{food.name.fi}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    card: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});


