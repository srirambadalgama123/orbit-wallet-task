import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { fetchImages } from '../../app/services/imageAPI';
import Labels from '../../constants/labels.json'


const FeedScreen = () => {
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  //Fetch 10 imageUrls
  const fetchMoreImages = async () => {
    setRefreshing(true)
    const newImages: any = await fetchImages(5);
    console.log("new images: ", newImages)
    setImages((prevImages: any) => [...prevImages, ...newImages]);
    setPage(page + 1);
    setRefreshing(false)
  };

  const refreshImages = async () => {
    setRefreshing(true);
    const newImages = await fetchImages(5);
    // console.log("newImages: ", newImages)
    setImages(newImages);
    setPage(2);
    setRefreshing(false);

  };

  useEffect(() => {
    refreshImages();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.imageContainer}>
        <Text style={styles.topText}>{Labels.FeedScreen.TOP_CAPTION}</Text>
        <Image source={{ uri: item.url }} style={styles.image} />
        <View style={styles.buttonsContainer}>
          <Ionicons name="person-circle-outline" size={40} color="white" style={styles.button} />
          <Ionicons name="chatbubble-outline" size={40} color="white" style={styles.button} />
          <Ionicons name="heart-outline" size={40} color="white" style={styles.button} />
          <Ionicons name="share-social-outline" size={40} color="white" style={styles.button} />
          <Feather name="send" size={40} color="white" style={styles.button} />
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.caption}>{Labels.FeedScreen.IMAGE_CAPTION_TITLE}</Text>
          <Text style={styles.description}>
            {Labels.FeedScreen.IMAGE_CAPTION}
          </Text>
        </View>
      </View>
    )
  };


  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text style={{ margin: 20 }}> Please wait...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <View style={styles.container}>
      {refreshing ? renderLoading() :
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchMoreImages}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={refreshImages}
          pagingEnabled
        />
      }
      <View style={styles.bottomNavigation}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Ionicons name="search-outline" size={24} color="black" />
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Ionicons name="people-outline" size={24} color="black" />
        <Ionicons name="person-outline" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    width: 400,
    height: 797,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topText: {
    position: 'absolute',
    top: 40,
    left: "35%",
    color: 'white',
    fontSize: 24,
    zIndex: 1,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 5,
    left: 8,
    right: 10,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  caption: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    marginTop: 8,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: '50%',
  },
  button: {
    marginBottom: 20,
  },
});

export default FeedScreen;
