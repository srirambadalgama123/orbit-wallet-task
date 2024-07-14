import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Labels from '../../constants/labels.json'
import { fetchImages } from '../../app/services/imageAPI';

const SearchScreen = () => {

	//States For HashTag Data
	const [hashTagImages, setHasTagImages] = useState<any>([]);
	const [hashTagImagesRefreshing, setHashTagImagesRefreshing] = useState<boolean>(true)

	//States For Community Data
	const [communityImages, setCommunityImages] = useState<any>([]);
	const [communityImagesRefreshing, setCommunityImagesRefreshing] = useState<boolean>(true)

	//States For Nomad Data
	const [nomadImages, setNomadImages] = useState<any>([]);
	const [nomadImagesRefreshing, setNomadImagesRefreshing] = useState<boolean>(true)


	//Initial Fetch of HashTag, Community, Nomad pictures
	useEffect(() => {
		const fetchInitialImages = async () => {
			const initialImages = await fetchImages(5);
			setHasTagImages(initialImages);
			setHashTagImagesRefreshing(false)

			const communityImages = await fetchImages(5);
			setCommunityImages(communityImages);
			setCommunityImagesRefreshing(false)

			const nomadImages = await fetchImages(5);
			setNomadImages(nomadImages);
			setNomadImagesRefreshing(false)
		};

		fetchInitialImages();
	}, []);

	const fetchMoreHashTagImages = async () => {
		const newHashtagImages = await fetchImages(5);
		setHasTagImages((prev: any) => [...prev, ...newHashtagImages]);
	}

	const fetchMoreCommunityImages = async () => {
		const newCommunityImages = await fetchImages(5);
		setCommunityImages((prev: any) => [...prev, ...newCommunityImages]);
	}

	const fetchMoreNomadImages = async () => {
		const newNomadImages = await fetchImages(5);
		setNomadImages((prev: any) => [...prev, ...newNomadImages]);
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				<Text style={styles.title}>{Labels.SearchScreen.TITLE}</Text>
				<TextInput style={styles.searchBar} placeholder="Search" />
				{hashTagImages[0] &&
					<Image source={{ uri: hashTagImages[0].url }} style={styles.topSearchImage}
					/>}
				<Text style={styles.caption}> {Labels.SearchScreen.CAPTION} </Text>
				<Text style={styles.sectionTitle}> {Labels.SearchScreen.HASHTAGS_SECTION_TITLE} </Text>
				{hashTagImagesRefreshing ? <ActivityIndicator size="large" color="#0000ff" /> : <FlatList
					horizontal
					data={hashTagImages}
					renderItem={({ item }) => <Image source={{ uri: item.url }} style={styles.trendingImage} />}
					keyExtractor={(item) => item.key.toString()}
					onEndReached={fetchMoreHashTagImages}
					refreshing={hashTagImagesRefreshing}
				/>
				}
				<Text style={styles.sectionTitle}> {Labels.SearchScreen.COMMUNITY_SECTION_TITLE} </Text>

				{communityImagesRefreshing ? <ActivityIndicator size="large" color="#0000ff" /> : <FlatList
					horizontal
					data={communityImages}
					renderItem={({ item }) => <Image source={{ uri: item.url }} style={styles.communityImage} />}
					keyExtractor={(item) => item.key.toString()}
					onEndReached={fetchMoreCommunityImages}
					refreshing={communityImagesRefreshing}
				/>
				}

				<Text style={styles.sectionTitle}> {Labels.SearchScreen.NOMAD_SECTION_TITLE} </Text>

				{nomadImagesRefreshing ? <ActivityIndicator size="large" color="#0000ff" /> :
					<FlatList
						horizontal
						data={nomadImages}
						renderItem={({ item }) => (
							<View style={styles.nomadContainer}>
								<Image source={{ uri: item.url }} style={styles.nomadImage} />
								<Text style={styles.nomadName}>User</Text>
							</View>
						)}
						keyExtractor={(item) => item?.key?.toString()}
						onEndReached={fetchMoreNomadImages}
						refreshing={nomadImagesRefreshing}
					/>}

			</ScrollView>
			<View style={styles.bottomNavigation}>
				<TouchableOpacity style={styles.navButton}>
					<Ionicons name="home-outline" size={30} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.navButton}>
					<Ionicons name="search-outline" size={30} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.navButton}>
					<Ionicons name="add-circle-outline" size={30} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.navButton}>
					<Ionicons name="people-outline" size={30} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.navButton}>
					<Ionicons name="person-outline" size={30} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	scrollContainer: {
		margin: 15
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		paddingTop: 20
	},
	searchBar: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 10,
		paddingLeft: 10,
	},
	topSearchImage: {
		width: '100%',
		height: 200,
		borderRadius: 10,
	},
	caption: {
		position: 'absolute',
		left: 10,
		top: 280,
		color: 'white',
		fontSize: 16
	},
	sectionTitle: {
		marginVertical: 10,
		fontSize: 18,
		fontWeight: 'bold',
	},
	trendingImage: {
		width: 120,
		height: 120,
		borderRadius: 10,
		marginRight: 10,
	},
	communityImage: {
		width: 180,
		height: 120,
		borderRadius: 10,
		marginRight: 10,
	},
	nomadContainer: {
		alignItems: 'center',
		marginRight: 15,
	},
	nomadImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	nomadName: {
		marginTop: 5,
		fontSize: 14,
	},
	bottomNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: 'gray',
		backgroundColor: 'white',
	},
	navButton: {
		alignItems: 'center',
	},
});

export default SearchScreen;
