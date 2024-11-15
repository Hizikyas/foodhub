import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        replyList: [],
    },
    reducers: {
        addReply(state, action) {
            const admins = action.payload;
            state.replyList = [
                ...state.replyList,
                {
                    mealListName: admins.mealList,
                    totalAmount: admins.orderAmount,
                    reply: admins.reply,
                    date: {
                        day: admins.day,
                        month: admins.month,
                        year: admins.year
                    }
                }
            ];
        },
        updateReply(state, action) {
            const admins = action.payload;
            const existingReplyIndex = state.replyList.findIndex(
                admin => admin.mealListName.join(',') === admins.mealList.join(',')
            );

            if (existingReplyIndex !== -1) {
                state.replyList[existingReplyIndex] = {
                    mealListName: admins.mealList,
                    totalAmount: admins.orderAmount,
                    reply: admins.reply,
                    date: {
                        day: admins.day,
                        month: admins.month,
                        year: admins.year
                    }
                };
            }
        } , 
        removeReply(state)
        {
            state.replyList = [] ;
        }

    }
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
