import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-remix-icon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useAppDispatch } from '../../store/hooks';

import { Button } from '../shared';
import { addToCart } from '../../reducers/products/Cart';

type ProductProps = {
  route: any;
  navigation: any;
};

const Product = ({ route, navigation }:ProductProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const { productId, productName, productPrice, productDescription, productImage } = route.params;

  const productItem = {
    id: productId,
    title: productName,
    price: productPrice,
    thumbnail: productImage,
  };

  const handleAddToCart = (item: any) => {
    // Dispatch an action to add the item to the cart
    dispatch(addToCart(item));
    navigation.navigate('Cart');
  };

  const { container, viewContainer, headerContainer, headerText, displayImg, rowContainer, title, categoryText, starContainer, priceText, descriptionText, quantityContainer, quantityIconView } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      <View style={viewContainer}>
        <ScrollView>
          <View style={headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left-line" size={30} color="#016aec" />
            </TouchableOpacity>
            <Text style={headerText}>{productName}</Text>
          </View>

          <Image
            source={{uri: productImage}}
            style={displayImg}
          />

          <View style={rowContainer}>
            <Text style={title}>{productName}</Text>
            <TouchableOpacity>
              <Icon name="heart-3-line" color="#A3ADBA" size={25} />
            </TouchableOpacity>
          </View>

          <View style={[rowContainer, starContainer]}>
            <Text style={categoryText}>Fruit</Text>
            <View style={rowContainer}>
              <TouchableOpacity>
                <Icon name="star-fill" color="#f8d568" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="star-fill" color="#f8d568" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="star-fill" color="#f8d568" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="star-fill" color="#A3ADBA" size={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="star-fill" color="#A3ADBA" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={priceText}>₦{productPrice}</Text>

          <Text style={descriptionText}>
            {productDescription}
          </Text>

          <View style={quantityContainer}>
            <Text style={categoryText}>Quantity</Text>
            <TouchableOpacity style={quantityIconView}>
              <Icon name="add-box-fill" color="#016aec" size={35} />
            </TouchableOpacity>
            <Text style={categoryText}>1</Text>
            <TouchableOpacity style={quantityIconView}>
              <Icon name="ri-checkbox-indeterminate-fill" color="#016aec" size={35} />
            </TouchableOpacity>
          </View>

          <Button onPress={() => handleAddToCart(productItem)}>Add to cart</Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F9F9FB',
  },
  viewContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 100,
    height: hp('100%'),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: hp(2.3),
    marginLeft: 20,
    color: '#172B4E',
    fontWeight: '600',
  },
  displayImg: {
    height: hp('28%'),
    width: wp('58%'),
    alignSelf: 'center',
    resizeMode: 'cover',
    marginLeft: -40,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: hp(3.3),
    color: '#172B4E',
    fontWeight: '600',
    width: wp('70%'),
  },
  categoryText: {
    fontSize: hp(1.7),
    color: '#172B4E',
  },
  starContainer: {
    marginTop: 10,
  },
  priceText: {
    color: '#016aec',
    marginTop: 10,
    fontWeight: '600',
    fontSize: hp(2.3),
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: '#172B4E',
    marginTop: 20,
    marginBottom: 30,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  quantityIconView: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Product;
