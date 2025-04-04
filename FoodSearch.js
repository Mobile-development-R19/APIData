import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; 

const FoodSearch = ({ route, navigation }) => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedFoods, setAddedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0); 
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFoods = await AsyncStorage.getItem('addedFoods');
        if (storedFoods) {
          const parsedFoods = JSON.parse(storedFoods);
          setAddedFoods(parsedFoods);
          calculateTotalCalories(parsedFoods);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('addedFoods', JSON.stringify(addedFoods));
    calculateTotalCalories(addedFoods); 
  }, [addedFoods]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setShowResults(true);

    try {
      const response = await axios.get(`https://fineli.fi/fineli/api/v1/foods?q=${query}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const addFood = (food) => {
    const energyNutrient = food.nutrients?.find(nutrient => nutrient.name === 'Energy');
    const energyKcal = energyNutrient ? energyNutrient.value : 0;

    const foodWithCalories = {
      ...food,
      energyKcal
    };

    setAddedFoods((prevFoods) => [...prevFoods, foodWithCalories]);
    setShowResults(false); 
  };

  const removeFood = (index) => {
    const updatedFoods = [...addedFoods];
    updatedFoods.splice(index, 1);
    setAddedFoods(updatedFoods);
  };

  const calculateTotalCalories = (foods) => {
    const total = foods.reduce((sum, food) => sum + (food.energyKcal || 0), 0);
    setTotalCalories(total);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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

      {showResults && (
        <ScrollView style={{ maxHeight: 200 }}>
          {foods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.card}
              onPress={() => navigation.navigate('FoodDetails', { foodId: food.id, onAddFood: addFood })}
            >
              <Text style={styles.foodName}>{food.name.fi}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.addedFoodsContainer}>
        <Text style={styles.addedFoodsTitle}>Lisätyt ruoat ({addedFoods.length})</Text>
        <ScrollView style={{ maxHeight: 250 }}>
          {addedFoods.map((food, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => removeFood(index)}
              style={styles.addedFoodCard}
            >
              <Text style={styles.foodName}>{food.name.fi}</Text>
              <Text style={styles.foodName}>Kalorit: {food.energyKcal}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.calorieContainer, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
        <Text style={styles.calorieText}>Kalorit: {totalCalories} kcal</Text>
        <Text style={styles.calorieText}>Suositus: 2500 kcal</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FoodSearch;
