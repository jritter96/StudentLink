import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { genericStyles } from '../../styles/generic';
import { settingsStyles } from '../../styles/settings';

interface IGroupProps {
    userID: string;
}

interface IGroupState {
    isLoading: boolean;
}

export default class Group extends Component<IGroupProps, IGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
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
                <SafeAreaView>
                    <View>
                        <Text style={genericStyles.title}>Settings</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={settingsStyles.container}
                    >
                        <View
                            style={{
                                borderBottomColor: '#AAAAAA',
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                ...settingsStyles.button,
                                ...settingsStyles.submitButton,
                            }}
                        >
                            <Text style={settingsStyles.settingsButtonText}>
                                SUBMIT
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderBottomColor: '#AAAAAA',
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                ...settingsStyles.button,
                                ...settingsStyles.logoutButton,
                            }}
                        >
                            <Text style={settingsStyles.settingsButtonText}>
                                LOG OUT
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}
