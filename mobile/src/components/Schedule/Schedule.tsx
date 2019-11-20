import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { genericStyles } from '../../styles/generic';
import { scheduleStyles } from '../../styles/schedule';
import config from '../../../config/config';
import ScheduleCard from './ScheduleCard';

const endpoint = config.endpoint;

interface IScheduleProps {
    userID: string;
    schedule: any[];
    handleScheduleChange: (id: any[]) => void;
}

export default class Schedule extends Component<IScheduleProps, {}> {
    constructor(props: IScheduleProps) {
        super(props);
        this.getSchedule = this.getSchedule.bind(this);
        this.renderSchedule = this.renderSchedule.bind(this);
    }

    public componentDidMount() {
        if (this.props.schedule.length === 0) {
            this.getSchedule();
        }
    }

    public render() {
        return (
            <SafeAreaView style={genericStyles.container}>
                <View style={genericStyles.titleContainer}>
                    <Text style={scheduleStyles.scheduleTitle}>Schedule</Text>
                    <TouchableOpacity
                        onPress={this.getSchedule}
                        style={genericStyles.buttonCircular}
                    >
                        <Ionicons name="ios-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={scheduleStyles.scrollContainer}>
                    <ScrollView>
                        {this.renderSchedule()}
                        <ScheduleCard
                            isCourse={true}
                            eventName="CPEN 321"
                            eventDate="Monday"
                            eventTime="3:00 - 4:30 PM"
                        />
                        <ScheduleCard
                            isCourse={false}
                            eventName="Fun Study Group"
                            eventDate="Tuesday"
                            eventTime="5:00 - 6:00 PM"
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    private getSchedule() {
        fetch(`${endpoint}/user/${this.props.userID}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(response => {
                this.props.handleScheduleChange(response['courses']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    private renderSchedule() {
        if (this.props.schedule.length === 0) {
            return (
                <View>
                    <Text style={scheduleStyles.errorText}>
                        No courses were found.
                    </Text>
                </View>
            );
        } else {
            return this.props.schedule.map(event => (
                <View style={scheduleStyles.courseContainer} key={event}>
                    <Text style={scheduleStyles.courseText}>{event}</Text>
                </View>
            ));
        }
    }
}
