import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Icon from 'react-native-remix-icon';

import { useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store';
import { removeFromCart } from '../../reducers/products/Cart';
import { Button } from '../shared';


const Cart = ():JSX.Element => {

  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[rowContainer, productView]}>
      <View style={imgView}>
        <Image
          source={{uri: item.thumbnail}}
          style={displayImg}
        />

        <View style={textView}>
          <Text style={title}>{item.title}</Text>
          <Text style={text}>Price: <Text style={priceText}>₦{item.price}</Text></Text>
        </View>
      </View>

      <View>
        <View style={quantityContainer}>
          <TouchableOpacity style={quantityIconView}>
            <Icon name="add-box-fill" color="#016aec" size={35} />
          </TouchableOpacity>
          <Text style={quantityText}>1</Text>
          <TouchableOpacity style={quantityIconView}>
            <Icon name="ri-checkbox-indeterminate-fill" color="#016aec" size={35} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleRemoveFromCart(index)}>
          <Text style={errorText}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  const { container, viewContainer, headerContainer, headerText, displayImg, rowContainer, quantityContainer, text, quantityText, quantityIconView, title, imgView, priceText, errorText, textView, productView, totalView, totalText } = styles;
  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      <View style={viewContainer}>
        <View style={headerContainer}>
          <Text style={headerText}>Cart</Text>
        </View>

        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={[rowContainer, totalView]}>
          <Text style={totalText}>Total</Text>
          <Text style={totalText}>₦{calculateTotalPrice()}.00</Text>
        </View>

        <Button>Checkout</Button>
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
    paddingBottom: 150,
    height: hp('100%'),
  },
  productView: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#A3ADBA',
    paddingBottom: 30,
    paddingTop: 30,
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
  title: {
    fontSize: hp(2.3),
    color: '#172B4E',
    fontWeight: '600',
    marginBottom: 10,
  },
  imgView: {
    flexDirection: 'row',
  },
  displayImg: {
    height: hp('9.5%'),
    width: wp('30%'),
    resizeMode: 'contain',
    marginRight: 15,
  },
  textView: {
    marginTop: 13,
  },
  text: {
    fontSize: hp(1.6),
    color: '#172B4E',
  },
  quantityText: {
    fontSize: hp(1.7),
    color: '#172B4E',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  quantityIconView: {
    marginLeft: 10,
    marginRight: 10,
  },
  priceText: {
    color: '#016aec',
    marginTop: 10,
    fontWeight: '600',
    fontSize: hp(2.0),
  },
  errorText: {
    textAlign: 'center',
    color: '#FF276A',
    fontSize: hp(2.0),
    fontWeight: '800',
  },
  totalView: {
    marginBottom: 30,
  },
  totalText: {
    fontSize: hp(2.0),
    color: '#172B4E',
    fontWeight: '700',
  },
});

export default Cart;
