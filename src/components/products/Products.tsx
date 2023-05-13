import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';
import { useSelector } from 'react-redux';
import * as Sentry from '@sentry/react-native';

import { getProducts } from '../../actions/products/products';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';

import { Card, Input, Spinner } from '../shared';
import { productsFailure, productsLoading } from '../../reducers/products/products';

import Categories from './Category';
import { addToCart } from '../../reducers/products/Cart';


const Products = (props: any): JSX.Element => {

  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.products.loading);

  const [productList, setProductList] = useState([]);
  const [searchQuery, setProductSearchQuery] = useState('');

  useEffect(() => {
    handleGetProducts(searchQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleGetProducts = async (query: string) => {
    dispatch(productsLoading(true));
    try {
      let responseData: any;
      if (!searchQuery) {
        responseData = await dispatch(getProducts());
      }
      responseData = await dispatch(getProducts(`search?q=${query}`));

      if (getProducts.fulfilled.match(responseData)) {
        setProductList(responseData.payload.products);
      }
    } catch (err) {
      dispatch(productsFailure(err));
      Sentry.captureException(err);
    } finally {
      dispatch(productsLoading(false));
    }
  };

  const handleAddToCart = (item: any) => {
    // Dispatch an action to add the item to the cart
    dispatch(addToCart(item));
  };


  const renderItem = ({ item }: { item: any }) => (
    <Card
      key={item.id}
      title={item.title}
      price={item.price}
      imgSrc={{uri: item.thumbnail}}
      description={item.description}
      onPress={() => props.navigation.navigate('Product', {
        productId: item.id,
        productName: item.title,
        productPrice: item.price,
        productDescription: item.description,
        productImage: item.thumbnail,
      })}
      onPressAddToCart={() => handleAddToCart(item)}
    />
  );

  const { container, profileStyle, generalTextStyle, searchView, cardContainer, avatarContainer, avatarText, viewContainer, mapContainer, filterContainer, searchInput, notFoundText, notFoundContainer } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        backgroundColor="#016aec"
        hidden={false} translucent={false}
        barStyle="light-content"
      />

      <View style={viewContainer}>
        <View style={profileStyle}>
          <View style={avatarContainer}>
            <Text style={avatarText}>👩🏽‍🦱</Text>
          </View>

          <View style={mapContainer}>
            <Icon name="map-pin-2-fill" color="#373C5B" />
            <Text style={generalTextStyle}> 1b Birrel, yaba</Text>
          </View>

          <View style={avatarContainer}>
            <Icon name="notification-2-fill" color="#373C5B" />
          </View>
        </View>

        <Input
          placeholder="Search products"
          startIconName="search-line"
          viewStyle={searchView}
          style={searchInput}
          onChangeText={text => {
            setProductSearchQuery(text);
          }}
        >
          <TouchableOpacity style={filterContainer} onPress={() => handleGetProducts(searchQuery)}>
            <Icon name="equalizer-line" />
          </TouchableOpacity>
        </Input>

        <Text style={generalTextStyle}>Categories</Text>

        <Categories />

        <View>

          {loading ? (
            <Spinner
              color="#016aec"
              size="large"
            />
          ) : (
            <FlatList
              data={productList}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id.toString()}
              contentContainerStyle={cardContainer}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              windowSize={3} // Set the windowSize to retain 3 offscreen items
            />
          )}

          {!loading && productList.length === 0 ? (
            <View style={notFoundContainer}>
              <Text style={notFoundText}>No products found</Text>
            </View>
          ) : <></>}

        </View>
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
    height: '100%',
  },
  generalTextStyle: {
    color: '#172B4E',
    fontSize: hp(2.4),
  },
  profileStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchView: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    height: 50,
    borderRadius: 50,
    paddingBottom: 0,
  },
  cardContainer: {
    marginTop: 20,
    paddingBottom: hp('20%'),
    // height: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#E5ECF3',
    height: hp('6%'),
    width: wp('12%'),
  },
  avatarText: {
    fontSize: hp(4.0),
  },
  mapContainer: {
    flexDirection: 'row',
  },
  filterContainer: {
    backgroundColor: '#E5ECF3',
    padding: 8,
    borderRadius: 50,
  },
  searchInput: {
    width: '84%',
  },
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
  notFoundText: {
    fontSize: hp(2.4),
  },
});

export default Products;
