import * as request from 'request';
import * as log from 'log';
import { generateCourseData } from './generate-course-data';

const User = require('../models/user');
const Course = require('../models/course');

export const getRegisteredCourses = async userId => {
    const server = 'https://canvas.ubc.ca';
    const user = await User.findOne({ _id: userId });
    user.schedule = [
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
        '11111111111111111111111111111',
    ];

    const dbCourses = await Course.find({});
    let userCourseCode;
    let userCourseName;
    let courseInDB;

    // log.debug('token:', user.token);

    return new Promise((resolve, reject) => {
        request.get(
            server + '/api/v1/courses',
            {
                auth: {
                    bearer: user.token,
                },
            },
            async (err, response, body) => {
                if (err || !response) {
                    log.error('Error in request:', err);
                    reject({});
                } else {
                    body = JSON.parse(body);
                    user.courses = [];

                    for (const userCourse of body) {

                        courseInDB = 0;
                        // log.debug('cc:', currCourse);
                        if (
                            !userCourse.access_restricted_by_date === true &&
                            !userCourse.name.includes('Engineering Co-op') &&
                            !userCourse.name.includes('Safety') &&
                            !userCourse.name.includes('Capstone')
                        ) {
                            userCourseName = userCourse.name.split(' ');
                            userCourseCode = userCourseName[0] + userCourseName[1];
                            dbCourses.forEach(dbCourse => {
                                if (userCourseCode === dbCourse.courseCode) {
                                    courseInDB = 1;
                                    // log.debug('inDB:', courseCode);
                                }
                            });

                            const courseTimes = [];
                            const Response = await generateCourseData(userCourseName[0], userCourseName[1]);
                            const Sections = 'sections';
                            const Days = 'days';
                            const sections = Response[Sections];
                            const term1section = sections['101'] || sections['001'];
                            const courseDays = term1section[Days].trim().split(' ');

                            for (const currDay of courseDays) {
                                buildCourseTimes(currDay, term1section, courseTimes);
                            }

                            if (courseInDB === 0) {
                                const newCourse = new Course({
                                    courseCode: userCourseCode,
                                    courseSection: userCourseName[2],
                                    times: courseTimes,
                                });

                                await newCourse.save();
                            }

                            user.courses.push(userCourseCode);

                            courseTimes.forEach(courseObj => {
                                if (
                                    courseObj.hourStart <= 21 &&
                                    courseObj.hourEnd <= 22 &&
                                    !(courseObj.hourEnd === 22 && courseObj.minuteEnd === 30)
                                ) {
                                    buildUserSchedule(user, courseObj);
                                }
                            }); // for each lecture
                        } // if not eng coop
                    } // for each canvas course
                    await user.save();
                    resolve(body);
                }
            }
        );
    });
};

function setCharAt(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    }
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function buildCourseTimes(currDay, section, courseTimes) {
    const Start = 'start';
    const End = 'end';

    const courseTime = {
        day: -1,
        hourStart: parseInt(section[Start].substring(0, 2), 10),
        minuteStart: parseInt(section[Start].substring(3, 5), 10),
        hourEnd: parseInt(section[End].substring(0, 2), 10),
        minuteEnd: parseInt(section[End].substring(3, 5), 10),
    };

    switch (currDay) {
        case 'Sun':
            courseTime.day = 0;
            break;

        case 'Mon':
            courseTime.day = 1;
            break;

        case 'Tue':
            courseTime.day = 2;
            break;

        case 'Wed':
            courseTime.day = 3;
            break;

        case 'Thu':
            courseTime.day = 4;
            break;

        case 'Fri':
            courseTime.day = 5;
            break;

        case 'Sat':
            courseTime.day = 6;
            break;
    }

    courseTimes.push(courseTime);
}

function buildUserSchedule(user, course) {
    let startIndex;
    let endIndex;

    startIndex = course.hourStart * 2 - 15;
    if (course.minuteStart === 30) {
        startIndex += 1;
    }
    endIndex = course.hourEnd * 2 - 15;
    if (course.minuteEnd === 30) {
        endIndex += 1;
    }

    for (let i = startIndex; i < endIndex; i++) {
        user.schedule[course.day] = setCharAt(user.schedule[course.day], i, '0');
    }
}
