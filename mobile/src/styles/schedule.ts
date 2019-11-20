import { StyleSheet } from 'react-native';

export const scheduleStyles = StyleSheet.create({
    scheduleTitle: {
        color: '#444444',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        height: '100%',
        margin: 20,
        flex: 5,
    },
    scrollContainer: {
        flex: 7,
        backgroundColor: '#F1F1F1',
    },
    courseContainer: {
        height: 50,
        margin: 7,
        backgroundColor: '#019898',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    courseText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    errorText: {
        fontSize: 20,
        color: '#444444',
        textAlign: 'center',
    },
});
