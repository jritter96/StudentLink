import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { genericStyles } from '../../styles/generic';
import { groupStyles } from '../../styles/group';
import GroupContainer from './GroupContainer';
import { Ionicons } from '@expo/vector-icons';
import { scheduleStyles } from '../../styles/schedule';

interface DefaultGroupProps {
    userID: string;
    groups: any[];
    searchPress: () => void;
}

export default class DefaultGroupView extends Component<DefaultGroupProps> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <View style={genericStyles.container}>
                <View style={genericStyles.titleContainer}>
                    <Text style={scheduleStyles.scheduleTitle}>Groups</Text>
                    <TouchableOpacity
                        onPress={this.props.searchPress}
                        style={{
                            ...genericStyles.buttonCircular,
                            ...{ backgroundColor: '#70CAD1' },
                        }}
                    >
                        <Ionicons name="ios-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={scheduleStyles.scrollContainer}>
                    <ScrollView
                        contentContainerStyle={groupStyles.contentContainer}
                    >
                        {this.renderGroups()}
                    </ScrollView>
                </View>
            </View>
        );
    }

    private renderGroups() {
        return this.props.groups.map((memberGroup, index) => (
            <GroupContainer group={memberGroup} key={index} />
        ));
    }
}
