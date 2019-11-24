import { StyleSheet } from 'react-native';

export const chatroomStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2.9,
        zIndex: 1,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        width: 240,
        position: 'absolute',
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButtonContainer: {
        height: 45,
        width: 60,
        top: 12,
        left: 12,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    backButtonTitle: {
        fontSize: 17,
        color: '#5fc9f8',
    },
    listContainer: {
        flex: 14,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        margin: 40,
        right: 32,
        bottom: 30,
        color: 'black',
        backgroundColor: 'white',
    },
    outgoingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 10,
        alignItems: 'flex-start',
        backgroundColor: '#5fc9f8',
        borderRadius: 8,
    },
    incomingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 10,
        alignItems: 'flex-start',
        backgroundColor: '#a6a6a6',
        borderRadius: 8,
    },
    incomingMessageContainer: {
        flexDirection: 'row',
    },
    outgoingMessageContainer: {
        flexDirection: 'row-reverse',
    },
    messageSender: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    messageText: {
        fontSize: 15,
        color: 'white',
        marginBottom: 5,
    },
    messageTimeStamp: {
        fontSize: 9,
        color: 'white',
    },
    sendButtonContainer: {
        left: 311,
        width: 50,
        height: 50,
        bottom: 65,
        position: 'absolute',
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    sendButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    bottomContainer: {
        margin: 0,
        height: 60,
        backgroundColor: '#d3d3d3',
    },
    whitespace: {
        flex: 0,
    },
});
