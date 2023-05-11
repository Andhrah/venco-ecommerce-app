import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';
import { useSelector } from 'react-redux';
import * as Sentry from '@sentry/react-native';

import { getProducts } from '../../actions/products/products';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';

import { Card, CategoryBtn, Input } from '../shared';
import { productsFailure, productsLoading } from '../../reducers/products/products';

const Products = (): JSX.Element => {

  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loading = useSelector((state: RootState) => state.products.loading);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    handleGetProducts('phone');
  },);

  const handleGetProducts = async (query: string) => {
    dispatch(productsLoading(true));
    try {
      const responseData = await dispatch(getProducts('laptop' || query));

      if (getProducts.fulfilled.match(responseData)) {
        setProductList(responseData.payload.products);
        console.log(productList);
      }
    } catch (err) {
      dispatch(productsFailure(err));
      Sentry.captureException(err);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card
      key={item.id}
      title={item.title}
      price={item.price}
      imgSrc={{uri: item.thumbnail}}
      description={item.description}
    />
  );

  const { container, profileStyle, generalTextStyle, searchView, scrollViewStyle, cardContainer, focusedBtn, avatarContainer, avatarText, viewContainer, mapContainer, filterContainer, searchInput } = styles;

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
          placeholder="Search for food"
          startIconName="search-line"
          viewStyle={searchView}
          style={searchInput}
        >
          <TouchableOpacity style={filterContainer}>
            <Icon name="equalizer-line" />
          </TouchableOpacity>
        </Input>

        <Text style={generalTextStyle}>Categories</Text>

        <View style={scrollViewStyle}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <CategoryBtn style={focusedBtn}>
              💻 Electronics
            </CategoryBtn>
            <CategoryBtn>
            🥦 Grocery
            </CategoryBtn>
            <CategoryBtn>
              🎮 Gaming
            </CategoryBtn>
            <CategoryBtn>
              👗👔 Fashion
            </CategoryBtn>
            <CategoryBtn>
              🚘 Automobile
            </CategoryBtn>
          </ScrollView>
        </View>

        <View>

          <FlatList
            data={productList}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={cardContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            windowSize={3} // Set the windowSize to retain 3 offscreen items
          />
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
  scrollViewStyle: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 20,
    paddingBottom: hp('20%'),
    // height: '100%',
  },
  focusedBtn: {
    backgroundColor: '#016aec',
    color: '#FEF0DC',
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
    padding: 10,
    borderRadius: 50,
  },
  searchInput: {
    width: '84%',
  },
});

export default Products;
