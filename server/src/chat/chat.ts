import * as socketIO from 'socket.io';
import * as log from 'log';
import { createChatMessage, getChat, getChatMembers } from './chatMethods';
import { pushChatMessage } from '../utils/send-push-notification';
const User = require('../models/user');

/*
 * A simple chat service implemented using socket.io for StudentLink
 *
 * TODO: verify if this requires async
 */
export const initializeChat = service => {
    const io = socketIO(service);

    io.on('connection', socket => {
        log.debug('A new user has connected to the chat');

        socket.on('join', async (userId: string, callback) => {
            // a user is allocated their own listening room
            socket.join(userId);

            log.notice(`A new user made socket connection: ${userId}`);

            // generate mobile-used chat object
            const initChat = await getChat(userId);
            callback(initChat);
        });

        socket.on('sendMessage', async (sentUserId: string, sentGroupId: string, message: string, callback) => {
            const newMessage = await createChatMessage(sentUserId, sentGroupId, message);

            // retrieve a group members list
            const chatMembers = await getChatMembers(sentUserId, sentGroupId);

            // iterate through the list and send socket messages to each member
            for (const member of chatMembers) {
                io.to(member).emit('message', sentGroupId, newMessage);

                const user = await User.findOne({ _id: member });
                pushChatMessage([user.pushNotificationToken], newMessage.senderName, newMessage.message);
            }

            callback(sentGroupId, newMessage);
        });
    });

    log.notice('Chat has been initialized');
};
