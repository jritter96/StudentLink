//jest.mock('../../utils/send-push-notification');
//import pushUserJoinedGroup, {Response} from '../../utils/send-push-notification';

import {matchUser} from '../../src/utils/matching';

const User = require('../../src/models/user');
const Group = require('../../src/models/group');


test('A user with no matches should have their own group created', async () => {
	
	//pushUserJoinedGroup.mockReturnValue(Promise.resolve(new Response('nothing')));

	const noMatchesUser = new User({
        firstName: 'NoMatchTest',
        lastName: 'Clown',
        courses: ["TEST999", "TEST998", "TEST997"],
        groups: [],
        schedule: [	"1000000000000000000000000000", 
        			"1000000000000000000000000000", 
        			"1000000000000000000000000000", 
        			"1000000000000000000000000000", 
        			"1000000000000000000000000000", 
        			"1000000000000000000000000000", 
        			"1000000000000000000000000000"
        		],
    });

    await noMatchesUser.save();

	matchUser(noMatchesUser._id, (err, group) => {
		
		console.log(group);
		
		expect(group.members).toBe([noMatchesUser._id]);
		expect(group.courses).toBe(noMatchesUser.courses);
		expect(group.meeting_times).toBe(noMatchesUser.schedule);
		expect(group.names).toBe(`${noMatchesUser.firstName} ${noMatchesUser.lastName}`);


		User.deleteOne({ _id: noMatchesUser._id });
	});



});