import { StyleSheet } from 'react-native';

export const loginGradientA = '#05299E';

export const loginGradientB = '#5E4AE3';

export const loginGradientC = '#947BD3';

export const loginGradient = ['#05299E', '#5E4AE3', '#947BD3'];

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flexGrow: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLine: {
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleTwo: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    iconTitle: {
        color: 'white',
        marginHorizontal: 5,
    },
    buttonContainer2: {
        marginHorizontal: 25,
        height: 50,
        backgroundColor: '#70CAD1',
        paddingVertical: 15,
        marginBottom: 25,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
});
