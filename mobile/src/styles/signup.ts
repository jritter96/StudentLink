import { StyleSheet } from 'react-native';

export const signupStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    titleContainer: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 15,
        color: '#FFF',
        paddingHorizontal: 25,
        marginHorizontal: 25,
        borderRadius: 25,
    },
    buttonContainerSignup: {
        height: 50,
        backgroundColor: '#F26CA7',
        paddingVertical: 15,
        marginHorizontal: 25,
        marginBottom: 15,
        borderRadius: 25,
    },
    buttonContainerBack: {
        height: 50,
        backgroundColor: '#70CAD1',
        paddingVertical: 15,
        marginHorizontal: 25,
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
