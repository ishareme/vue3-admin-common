import dayjs from 'dayjs';

export const dataFilter = (value, format = 'YYYY-MM-DD') => {
    if (!isNaN(value)) {
        value = parseInt(value);
    }
    return dayjs(value).format(format);
};

export default (app) => {
    app.config.globalProperties.$filter = {
        dataFilter
    };
};
