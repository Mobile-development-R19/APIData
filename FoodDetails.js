import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import styles from './styles';

const FoodDetails = ({ route, navigation }) => {
    const { foodId, onAddFood } = route.params;
    const [foodDetails, setFoodDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await fetch(`https://fineli.fi/fineli/api/v1/foods/${foodId}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                const textResponse = await response.text();

                if (response.ok) {
                    try {
                        const data = JSON.parse(textResponse);
                        setFoodDetails(data);
                    } catch (jsonError) {
                        console.error("JSON Parsing Error:", jsonError);
                    }
                } else {
                    console.error("API returned an error", textResponse);
                }
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

    const addFood = () => {
        if (onAddFood && foodDetails) {
            const foodToAdd = {
                ...foodDetails,
                energyKcal: foodDetails.nutrients?.find(n => n.name === 'Energy')?.value || 0
            };
            onAddFood(foodToAdd);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{foodDetails.name.fi || "Tuntematon ruoka"}</Text>
            <Text>Kalorit: {parseInt(foodDetails.energyKcal)} kcal</Text>
            <Text>Proteiinit: {parseInt(foodDetails.protein)} g</Text>
            <Text>Rasvat: {parseInt(foodDetails.fat)} g</Text>
            <Text>Hiilihydraatit: {parseInt(foodDetails.carbohydrate)} g</Text>
            <Button title="Lisää tämä ruoka" onPress={addFood} />
        </View>
    );
};

export default FoodDetails;
