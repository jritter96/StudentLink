export const getDayOfWeek = (day: number) => {
    const date = new Array(7);
    date[1] = 'Monday';
    date[2] = 'Tuesday';
    date[3] = 'Wednesday';
    date[4] = 'Thursday';
    date[5] = 'Friday';
    date[6] = 'Saturday';
    date[0] = 'Sunday';

    return date[day];
};

export const formatTime = (
    hourStart: number,
    minuteStart: number,
    hourEnd: number,
    minuteEnd: number
) => {
    const amStart = hourStart < 12 ? 'AM' : 'PM';
    const amEnd = hourEnd < 12 ? 'AM' : 'PM';

    const minuteStartString =
        minuteStart < 10 ? `0${minuteStart}` : minuteStart;
    const minuteEndString = minuteEnd < 10 ? `0${minuteEnd}` : minuteEnd;

    const hourStartString = hourStart > 12 ? hourStart - 12 : hourStart;
    const hourEndString = hourEnd > 12 ? hourEnd - 12 : hourEnd;

    return `${hourStartString}:${minuteStartString} ${amStart} - ${hourEndString}:${minuteEndString} ${amEnd}`;
};
