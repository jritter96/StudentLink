import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
        height: '100%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        height: '5%',
        borderRadius: 30,
    },
    logoutButton: {
        backgroundColor: '#F73666',
    },
    submitButton: {
        backgroundColor: '#35E07A',
    },
    settingsButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
