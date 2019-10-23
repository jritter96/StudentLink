import { StyleSheet } from 'react-native';

export const loginFormStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 15,
        color: '#FFF',
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#F26CA7',
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    errorContainer: {
        paddingVertical: 10,
    },
    errorText: {
        color: '#FFFFFF',
        textAlign: 'center',
        paddingVertical: 5,
    },
    forgotPasswordText: {
        color: '#70CAD1',
        textAlign: 'center',
        paddingVertical: 5,
    },
});
