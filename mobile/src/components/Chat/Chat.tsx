import React, { Component } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StatusBar,
} from 'react-native';
import Chatroom from './Chatroom';
import { genericStyles } from '../../styles/generic';
import { chatStyles } from '../../styles/chat';
import { chatEnum } from '../../enum/chatEnum';
import config from '../../../config/config';

const endpoint = config.endpoint;
const MAX_CHARACTERS = 36;

interface ChatProps {
    toggleNavBar: Function;
    userID: String;
    chatBody: any[];
    socket: any;
    handleNewMessage: Function;
}

interface ChatState {
    chatNav: any;
    chatSel: any;
    chatBody: any[];
}

export default class Chat extends Component<ChatProps, ChatState> {
    constructor(props: any) {
        super(props);
        this.state = {
            chatNav: chatEnum.chat,
            chatSel: '',
        };
        this.OnPressButton = this.OnPressButton.bind(this);
        this.HandleChatroomReturn = this.HandleChatroomReturn.bind(this);
    }

    OnPressButton(chatID: any) {
        this.setState({ chatNav: chatEnum.chatroom });
        this.setState({ chatSel: chatID });
        this.props.toggleNavBar(false);
        return;
    }

    HandleChatroomReturn() {
        this.setState({ chatNav: chatEnum.chat });
        this.props.toggleNavBar(true);
        return;
    }

    ShowChatViews(view: any) {
        switch (view) {
            case chatEnum.chat:
                return this.ChatMainView();
            case chatEnum.chatroom:
                var i: number, chatIndex = 0;
                for (i = 0; i < this.props.chatBody.length; i++) {
                    if (this.props.chatBody[i].groupId === this.state.chatSel) {
                        chatIndex = i;
                        break;
                    }
                    if (i === this.props.chatBody.length - 1) {
                        chatIndex = -1;
                    }
                }
                if (chatIndex < 0) {
                    console.log("err: No chat object for groupID " + this.state.chatSel)
                    this.HandleChatroomReturn();
                }
                return (
                    <Chatroom
                        OnPressBackButton={this.HandleChatroomReturn.bind(this)}
                        messages={this.props.chatBody[chatIndex].messages}
                        userID={userID}
                        groupID={this.state.chatSel}
                        socket={this.props.socket}
                        handleNewMessage={this.props.handleNewMessage}
                    />
                );
            default:
                return this.ChatMainView();
        }
    }

    ChatMainView() {
        return (
            <SafeAreaView style={genericStyles.container}>
            <StatusBar barStyle="dark-content" />
                <View style={genericStyles.titleContainer}>
                    <Text style={genericStyles.title}>Messages</Text>
                </View>
                <View style={chatStyles.scrollContainer}>
                    <ScrollView
                        contentContainerStyle={chatStyles.contentContainer}
                    >
                        {this.renderChats()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    renderChats() {
        return this.props.chatBody.map(chatObject => {
            chatObject !== null ?
                <View>
                    <TouchableOpacity
                        onPress={this.OnPressButton.bind(this, chatObject.groupId)}
                        onLongPress={this.OnPressButton.bind(this, chatObject.groupId)}
                        style={chatStyles.buttonContainer}
                        key={chatObject.groupId}
                    >
                        <View style={chatStyles.buttonTitleContainer}>
                            <Text style={chatStyles.buttonTitle}>{chatObject.groupId}</Text>
                        </View>
                        <View style={chatStyles.buttonSubtitleContainer}>
                            <Text style={chatStyles.buttonSubtitle}>
                                {chatObject.messages[chatObject.messages.length - 1].message.length > MAX_CHARACTERS ? chatObject.messages[chatObject.messages.length - 1].message.substring(0, MAX_CHARACTERS) + "..." : chatObject.messages[chatObject.messages.length - 1].message}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={chatStyles.whiteSpace} />
                </View>
            : null
            }
        );
    }

    render() {
            console.log("Test: ");
            console.log(this.props.chatBody);
        return (
            <View style={genericStyles.container}>
                {this.ShowChatViews(this.state.chatNav)}
            </View>
        );
    }
}
