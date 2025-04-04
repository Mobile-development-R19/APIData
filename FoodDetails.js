import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput } from 'react-native';

export default function FoodDetails({ route }) {
    const { foodId } = route.params;
    const [foodDetails, setFoodDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [quantity, setQuantity] = useState(100); 

    useEffect(() => {
        const fetchFoodDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://fineli.fi/fineli/api/v1/foods/${foodId}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                if (!response.ok) {
                    throw new Error("Food details not found.");
                }

                const data = await response.json();
                setFoodDetails(data);
            } catch (error) {
                console.error("Error fetching food details:", error);
                setError("Unable to load food details.");
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [foodId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!foodDetails) {
        return <Text>Unable to load food details.</Text>;
    }

    const calculateNutrition = (value) => ((value / 100) * quantity).toFixed(1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{foodDetails.name.fi || "Tuntematon ruoka"}</Text>
            
            <View style={styles.card}>
              
                <Text style={styles.label}>Anna määrä (grammoina, max 5000g):</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(quantity)}
                    onChangeText={value => setQuantity(Math.min(Math.max(parseInt(value) || 0, 0), 5000))}
                />
            </View>

            <View style={styles.card}>
                <Text>Kalorit: {calculateNutrition(foodDetails.energyKcal)} kcal</Text>
                <Text>Proteiinit: {calculateNutrition(foodDetails.protein)} g</Text>
                <Text>Rasvat: {calculateNutrition(foodDetails.fat)} g</Text>
                <Text>Hiilihydraatit: {calculateNutrition(foodDetails.carbohydrate)} g</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold'
    }
});

