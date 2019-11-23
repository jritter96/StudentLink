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
import { getDayOfWeek, formatTime } from '../../utils/date';

const endpoint = config.endpoint;

interface IScheduleProps {
    userID: string;
    schedule: any[];
    handleScheduleChange: (a: any[], b: any[]) => void;
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
        let courseResponse = [];

        fetch(`${endpoint}/user/${this.props.userID}/courses`, {
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
                courseResponse = response['coursesObj'];
            })
            .then(() => {
                fetch(`${endpoint}/user/${this.props.userID}/groups`, {
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
                        console.log(response['groupsObj']);

                        this.props.handleScheduleChange(
                            courseResponse,
                            response['groupsObj']
                        );
                    });
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
                <ScheduleCard
                    key={`${event._id}${event.hourStart}${event.hourEnd}`}
                    isCourse={event.isCourse}
                    eventName={event.eventName}
                    eventDate={getDayOfWeek(event.day)}
                    eventTime={formatTime(
                        event.hourStart,
                        event.minuteStart,
                        event.hourEnd,
                        event.minuteEnd
                    )}
                />
            ));
        }
    }
}
