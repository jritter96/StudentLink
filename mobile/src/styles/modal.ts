import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 100,
        marginHorizontal: 20,
        paddingHorizontal: 10,
    },
    titleHeader: {
        color: '#444444',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: '#444444',
        fontSize: 15,
    },
    image: {
        width: null,
        height: 175,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    buttonContainer: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#F26CA7',
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
