
const loginReducer = (state = false, action) =>
{
    switch (action.type)
    {
        case "CHANGE_LOGIN":
            return action.payload;
        default:
            return state;
    }
}

export default loginReducer;