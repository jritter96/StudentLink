import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TextInput,
    StatusBar,
} from 'react-native';
import { userProfileStyles } from '../../styles/userProfile';

interface UserProfileProps {
    OnPressBackButton: Function;
}

export default class UserProfile extends Component<UserProfileProps> {

    render() {
        return (
            <SafeAreaView>
                <StatusBar barStyle="dark-content" />
                <View style={userProfileStyles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={this.props.OnPressBackButton.bind(this)}
                    >
                        <Text style={userProfileStyles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <Text>User Profile</Text>
            </SafeAreaView>
        );
    }
}
