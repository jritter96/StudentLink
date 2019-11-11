import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
    settingsContainer: {
        flex: 7,
        backgroundColor: 'white',
    },
    buttonContainer: {
        backgroundColor: '#019898',
        height: 80,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitleContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
