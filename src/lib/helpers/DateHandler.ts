const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September', 
    'October', 'November', 'December'
];

export const createTimeStr = ():string => {
    /* 
    *    Returns the following Example: 
    *       2023, February 25 | 12:34 AM 
    */
    const now = new Date();
    const currentYear = now.getFullYear();
    const month = monthNames[now.getMonth()];
    const date = now.getDate();
    const hour = (now.getHours() > 12? now.getHours() - 12 : now.getHours());
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const meridiem = (now.getHours() === 24 || now.getHours() < 12)? 'AM' : 'PM';
    return `${currentYear}, ${month} ${date} | ${hour}:${minutes} ${meridiem}`;
};