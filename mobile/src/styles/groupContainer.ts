import { StyleSheet } from 'react-native';

export const groupContainerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#C884A6',
        justifyContent: 'flex-start',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 15,
    },
    groupName: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    groupMember: {
        color: 'white',
        fontSize: 15,
        textAlign: 'left',
        marginBottom: 3,
    },
});
