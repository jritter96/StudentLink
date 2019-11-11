import React, { Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { genericStyles } from '../../styles/generic';
import { settingStyles } from '../../styles/settings';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

export default class Settings extends Component {
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
}
