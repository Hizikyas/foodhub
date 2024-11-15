import React, { useEffect, useState } from 'react';
import OrdertrackItem from './OrderTrackItem';
import classes from "./OrderTrackList.module.css";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ReplyFetch } from "../../API/fetch";
import { ordertrackActions } from "../../Store/OrderTrackSlice";
import { UIactions } from "../../Store/UIshowSlice";
import { adminActions } from "../../Store/adminReplySlice";

const OrderTrackList = () => {
    const password = useSelector(state => state.Login.userPassword);
    const adminList = useSelector(state => state.admin.replyList);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        ReplyFetch(password, dispatch)
            .then(({ info }) => {
                if (info) {
                    const orderListName = info.orderMealNameList.map(each => each.name);
                    const orderTotalAmount = info.orderMealNameList.reduce(
                        (total, each) => parseFloat(total) + parseFloat(each.totalPrice),
                        0
                    );

                    dispatch(ordertrackActions.addOrderTrack({
                        orderListName: orderListName,
                        orderTotalAmount: orderTotalAmount,
                        day: new Date().getDate(),
                        month: new Date().getMonth() + 1,
                        year: new Date().getFullYear(),
                    }));

                    const existingEntry = adminList.find(admin => 
                        admin.mealListName.join(',') === orderListName.join(',')
                    );

                    if (!existingEntry) {
                        dispatch(adminActions.addReply({
                            mealList: orderListName,
                            orderAmount: orderTotalAmount,
                            day: new Date().getDate(),
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear(),
                            reply: info.reply || "please wait reply, pending ..."
                        }));
                    } else if (existingEntry && info.reply && existingEntry.reply !== info.reply) {
                        dispatch(adminActions.updateReply({
                            mealList: orderListName,
                            orderAmount: orderTotalAmount,
                            day: new Date().getDate(),
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear(),
                            reply: info.reply
                        }));
                    }
                } else {
                    dispatch(UIactions.showNotification({ status: "error", message: "No data received from the server" }));
                    setTimeout(() => {
                        dispatch(UIactions.clearNotification());
                    }, 3000);
                }

                setLoading(false); 
            })
            .catch(error => {
                dispatch(UIactions.showNotification({ status: "error", message: error.message }));
                setTimeout(() => {
                    dispatch(UIactions.clearNotification());
                }, 3000);
                setLoading(false);  
            });
    }, [dispatch, password ]);

    const hasOrders = adminList && adminList.length > 0;

    return (
        <div className={classes.container}>
            <ul className={classes["order-list"]}>
                {loading ? ( 
                    <p className={classes.center}>Loading orders...</p>  
                ) : hasOrders ? (
                    adminList.map(each =>
                        <OrdertrackItem
                            key={`${each.date.day}-${each.mealListName.join('-')}`}
                            totalAmount={each.totalAmount}
                            mealList={each.mealListName}
                            day={each.date.day}
                            month={each.date.month}
                            year={each.date.year}
                            reply={each.reply}
                        />
                    )
                ) : (
                    <p className={classes.center}>No order received</p>  
                )}
            </ul>
        </div>
    );
}

export default OrderTrackList;
