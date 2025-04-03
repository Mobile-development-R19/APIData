import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FoodSearch = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);

        try {
            const response = await axios.get(`https://fineli.fi/fineli/api/v1/foods?q=${query}`);
            setFoods(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={setQuery}
                placeholder="Hae ruokaa..."
            />
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={styles.buttonText}>Hae</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <ScrollView>
                {foods.map((food) => (
                    <TouchableOpacity
                        key={food.id}
                        style={styles.card}
                        onPress={() => navigation.navigate('FoodDetails', { foodId: food.id })}
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

export default FoodSearch;
