import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    scheduleCardStyles,
    courseIcon,
    groupIcon,
} from '../../styles/scheduleCard';

interface IScheduleCardProps {
    isCourse: boolean;
    eventName: string;
    eventDate: string;
    eventTime: string;
}

export default class ScheduleCard extends Component<IScheduleCardProps, {}> {
    constructor(props: IScheduleCardProps) {
        super(props);
    }

    public render() {
        return (
            <View style={this.renderCardStyle()}>
                <View style={scheduleCardStyles.cardIconContainer}>
                    <Ionicons
                        name={this.renderIcon()}
                        size={50}
                        color="white"
                    />
                </View>
                <View style={scheduleCardStyles.cardContentContainer}>
                    <Text style={scheduleCardStyles.contentHeader}>
                        {this.props.eventName}
                    </Text>
                    <Text style={scheduleCardStyles.contentText}>
                        {this.props.eventDate}
                    </Text>
                    <Text style={scheduleCardStyles.contentText}>
                        {this.props.eventTime}
                    </Text>
                </View>
            </View>
        );
    }

    private renderIcon() {
        return this.props.isCourse ? courseIcon : groupIcon;
    }

    private renderCardStyle() {
        return this.props.isCourse
            ? {
                  ...scheduleCardStyles.cardContainer,
                  ...scheduleCardStyles.courseBackground,
              }
            : {
                  ...scheduleCardStyles.cardContainer,
                  ...scheduleCardStyles.groupBackground,
              };
    }
}
