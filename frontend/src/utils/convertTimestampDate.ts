export const convertTimestampDate = (time) => new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
