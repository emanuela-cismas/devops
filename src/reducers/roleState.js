const roleReducer = (state = false, action) =>
{
    switch (action.type)
    {
        case "CHANGE_ROLE":
            return action.payload;
        default:
            return state;
    }
}

export default roleReducer;