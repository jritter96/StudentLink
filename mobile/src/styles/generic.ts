import { StyleSheet } from 'react-native';

export const genericStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 50,
        backgroundColor: '#01a3a4',
        marginBottom: 15,
        borderRadius: 25,
    },
    buttonCircular: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#F26CA7',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    title: {
        color: '#444444',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 20,
    },
    titleContainer: {},
    fullWidthContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
