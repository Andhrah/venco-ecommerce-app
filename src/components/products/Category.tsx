/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CategoryBtn } from '../shared';


/**
 * List of categories.
 * Each category is represented by an emoji followed by a label.
 * @type {Array<string>}
 */
const categoryList = [
  '📱 smartphones',
  '💻 laptops',
  '🧴 fragrances',
  '🧴 skincare',
  '🥬 groceries',
  '🧽 home-decoration',
  '🪑 furniture',
  '👚 tops',
  '👗 womens-dresses',
  '👠 womens-shoes',
  '👔 mens-shirts',
  '👞 mens-shoes',
  '⌚️ mens-watches',
  '⌚️ womens-watches',
  '👜 womens-bags',
  '💍 womens-jewellery',
  '🕶 sunglasses',
  '🚘 automotive',
  '🛵 motorcycle',
];

type CategoriesProps = {
}

/**
 * Component to display categories and handle category selection.
 * @returns {JSX.Element} Categories component.
 */
const Categories = ({}:CategoriesProps):JSX.Element => {

  const [selectedIndex, setSelectedIndex] = useState(0);


  /**
   * Event handler for category press.
   * Sets the selected category index in the state.
   * @param {number} index - Index of the pressed category.
   * @returns {void}
   */
  const handlePress = (category: string, index: number) => {
    setSelectedIndex(index);
  };

  const { scrollViewStyle } = styles;

  return (
    <View style={scrollViewStyle}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((category, index) => (
          <CategoryBtn
            style={{
              backgroundColor: selectedIndex === index ? '#016aec' : '#FFFFFF',
            }}
            btnTextStyle={{ color: selectedIndex === index ? '#FEF0DC' : '#172B4E'}}
            key={category}
            onPress={() => handlePress(category, index)}
          >
            {category}
          </CategoryBtn>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Categories;
