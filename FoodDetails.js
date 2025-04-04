import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const FoodDetails = ({ route }) => {
    const { foodId } = route.params;
    const [foodDetails, setFoodDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`https://fineli.fi/fineli/api/v1/foods/${foodId}`,{   
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setFoodDetails(data);
            } catch (error) {
                console.error("Error fetching food details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [foodId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!foodDetails) {
        return <Text>Unable to load food details.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{foodDetails.name.fi || "Tuntematon ruoka"} per 100g</Text>
            <Text>Kalorit: {parseInt(foodDetails.energyKcal)} kcal</Text>
            <Text>Proteiinit: {parseInt(foodDetails.protein)} g</Text>
            <Text>Rasvat: {parseInt(foodDetails.fat)} g</Text>
            <Text>Hiilihydraatit: {parseInt(foodDetails.carbohydrate)} g</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default FoodDetails;
