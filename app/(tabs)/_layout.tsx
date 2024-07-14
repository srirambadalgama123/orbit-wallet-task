import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchScreen from '../../components/Screens/SearchScreen';
import FeedScreen from '../../components/Screens/FeedScreen';
import { SCREENS } from '@/constants/Appconstants';


const Root = () => {
	const [selectedScreen, setSelectedScreen] = useState(SCREENS.SEARCH_SCREEN);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const handleSelection = (screen: string) => {
		setSelectedScreen(screen);
		setDropdownVisible(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setDropdownVisible(!dropdownVisible)}
			>
				<Text style={styles.buttonText}>•••</Text>
			</TouchableOpacity>

			{dropdownVisible && (
				<View style={styles.dropdown}>
					<TouchableOpacity onPress={() => handleSelection(SCREENS.FEED_SCREEN)}>
						<Text style={styles.optionText}>Feed Screen</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleSelection(SCREENS.SEARCH_SCREEN)}>
						<Text style={styles.optionText}>Search Screen</Text>
					</TouchableOpacity>
				</View>
			)}

			{selectedScreen === SCREENS.FEED_SCREEN ? <FeedScreen /> : <SearchScreen />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	button: {
		position: 'absolute',
		top: 45,
		right: 30,
		width: 40,
		height: 25,
		alignItems: 'center',
		backgroundColor: 'lightgray',
		borderRadius: 5,
		zIndex: 1
	},
	buttonText: {
		fontSize: 18,
	},
	dropdown: {
		position: 'absolute',
		top: 50,
		right: 20,
		backgroundColor: 'white',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'lightgray',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		zIndex: 1
	},
	optionText: {
		fontSize: 18,
		padding: 10,
	},
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Root;
