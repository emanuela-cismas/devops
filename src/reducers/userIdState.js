
const userIdState = (state = false, action) =>
{
    switch (action.type)
    {
        case "CHANGE_ID":
            return action.payload;
        default:
            return state;
    }
}

export default userIdState;