export const getBeginningOfDay = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.getTime();
  };
export const getEndingOfDay = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end.getTime();
};
export const getBeginningOfDayByMiliSeconds = (miliSecond) => {
    const start = new Date(miliSecond);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
  };
export const getEndingOfDayByMiliSeconds = (miliSecond) => {
    const end = new Date(miliSecond);
    end.setHours(23, 59, 59, 999);
    return end.getTime();
};
export const getFirstDayOfWeek = () => {
    const startOfToday = new Date(getBeginningOfDay());
    return (new Date(startOfToday.setDate(startOfToday.getDate() - startOfToday.getDay() - 1)));
}
export const getLastDayOfWeek = () => {
    const endOfToday = new Date(getBeginningOfDay());
    return (new Date(endOfToday.setDate(endOfToday.getDate() - endOfToday.getDay() + 5 )));
}