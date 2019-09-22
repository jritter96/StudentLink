import * as mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        trim: true,
        required: true,
    },
    faculty: {
        type: String,
        trim: true,
        required: true,
    },
    professor: {
        type: String,
        trim: true,
    },
    courseSections: [
        {
            type: String,
            trim: true,
            required: true,
        },
    ],
    labSections: [
        {
            type: String,
            trim: true,
        },
    ],
    tutorialSections: [
        {
            type: String,
            trim: true,
        },
    ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
