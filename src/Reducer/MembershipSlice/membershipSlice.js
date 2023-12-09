import { createSlice } from "@reduxjs/toolkit";

const initialState={
    membership:[]
}

export const membershipSlice = createSlice({
    name:'membershipSlice',
    initialState,
    reducers:{
        membershipInfo:(state, action) =>{
            state.membership = action.payload;
        },
        membershipDelete:(state,action) =>{
            const data = state.membership.filter((member) => {
                return member.id !== action.payload;
            });
            state.membership= data;
        }
    }
});

export const {membershipInfo, membershipDelete} = membershipSlice.actions;
export default membershipSlice.reducer;