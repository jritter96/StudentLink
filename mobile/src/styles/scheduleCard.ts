import { StyleSheet } from 'react-native';

export const courseIcon = 'ios-paper-plane';

export const groupIcon = 'md-people';

export const scheduleCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#5E4AE3',
        marginHorizontal: 20,
        marginVertical: 10,
        height: '20%',
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cardIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        flex: 1,
    },
    cardContentContainer: {
        flex: 5,
        flexDirection: 'column',
        padding: 10,
    },
    contentHeader: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
    },
    contentText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    courseBackground: {
        backgroundColor: '#5E4AE3',
    },
    groupBackground: {
        backgroundColor: '#F73666',
    },
});
