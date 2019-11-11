import React, { Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { genericStyles } from '../../styles/generic';
import { userProfileStyles } from '../../styles/userProfile';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    public render() {
        if (this.state.isLoading) {
            return (
                <View style={genericStyles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <SafeAreaView style={genericStyles.container}>
                    <Text>Settings</Text>
                </SafeAreaView>
            );
        }
    }