import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    StatusBar,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { chatroomStyles } from '../../styles/chatroom';
import config from '../../../config/config';

const endpoint = config.endpoint;

interface ChatroomProps {
    OnPressBackButton: Function;
    messages: any[];
    userID: String;
    groupID: String;
    socket: any;
    handleNewMessage: Function;
}

interface ChatroomState {
    messages: any[];
    newMessage: String;
}

export default class Chatroom extends Component<ChatroomProps, ChatroomState> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: this.props.messages
            newMesssage: ""
        };
    }

    sendMessage() {
        this.props.socket.emit("chat message" , this.state.newMessage);
        this.props.handleNewMessage(this.state.newMessage)
        this.setState({ newMesssage: "" })
        return;
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={chatroomStyles.container}
            >
                <StatusBar barStyle="dark-content" />
                <View style={chatroomStyles.topContainer}>
                    <View style={chatroomStyles.titleContainer}>
                        <Text style={chatroomStyles.title}>{this.props.groupID}</Text>
                    </View>
                </View>
                <View style={chatroomStyles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={this.props.OnPressBackButton.bind(this)}
                    >
                        <Text style={chatroomStyles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={chatroomStyles.whitespace}></View>
                <View style={chatroomStyles.scrollContainer}>
                    <FlatList
                        inverted
                        data={this.state.messages.reverse()}
                        renderItem={({item}) => {
                            if (item.senderId === this.props.userID) {
                                return (
                                    <View style={chatroomStyles.outgoingMessageContainer}>
                                        <View style={chatroomStyles.outgoingMessageBox}>
                                            <Text style={chatroomStyles.messageText}>
                                                {item.message}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <View style={chatroomStyles.incomingMessageContainer}>
                                        <View style={chatroomStyles.incomingMessageBox}>
                                            <Text style={chatroomStyles.messageSender}>
                                                {item.senderName}
                                            </Text>
                                            <Text style={chatroomStyles.messageText}>
                                                {item.message}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={chatroomStyles.bottomContainer}>
                    <ScrollView scrollEnabled={false}>
                        <TextInput
                            style={chatroomStyles.input}
                            multiline={true}
                            value={this.state.newMessage}
                            onChangeText={newMessage => {this.setState({ newMessage })}}
                        />
                        <View style={chatroomStyles.sendButtonContainer}>
                            <TouchableOpacity onPress={this.sendMessage}>
                                <Text style={chatroomStyles.sendButtonText}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
