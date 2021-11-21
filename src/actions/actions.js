
export const changeLogin = (value) =>
{
    return {
        type: 'CHANGE_LOGIN',
        payload: value
    };
};

export const changeRole = (value) =>
{
    return {
        type: 'CHANGE_ROLE',
        payload: value
    };
};

export const changeUserId = (value) =>
{
    return {
        type: 'CHANGE_ID',
        payload: value
    };
};