import { useEffect } from "react";
import {useDispatch, useSelector}from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";


function OrderConfirmation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {checkout} = useSelector((state)=>state.checkout);

    //clear the cart when the order is confirmed
    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch(clearCart());
            localStorage.removeItem("cart");
        }else{
            navigate("/my-orders");
        }
    },[checkout,dispatch,navigate])

    const calculateEstimatedDelivery = (createdAt)=>{
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate()+10);
        return orderDate.toLocaleDateString();
    }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
            thank you for your order
        </h1>
        {checkout && (<div className="p-6 rounded-lg ">
            <div className="flex justify-between mb-20">
                {/* order id and date */}
                <div>
                    <h2 className="text-xl font-semibold
                    ">order id:{checkout._id}
                    </h2>
                    <p className="text-gray-500">
                        order date:{new Date(checkout.createdAt).toLocaleDateString()}
                    </p>
                </div>
                {/* estimated delivery */}
                <div className="text-emerald-700 text-sm">
                    estimated delivery:{calculateEstimatedDelivery(checkout.creatAt)}
                </div>
            </div>
            {/* orderd items */}
            <div className="mb-20">
                {checkout.checkoutItems.map((item)=>(
                    <div key={item.productId} className="flex items-center mb-4">
                        <img src={item.image} 
                        className="w-16 h-16 object-cover 
                        rounded-md mr-4" />
                        <div>
                            <h4 className="text-md font-semibold">
                                {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {item.color} | {item.size}
                            </p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-md"> ${item.price}</p>
                            <p className="text-sm text-gray-500">qty:{item.quantity}</p>

                        </div>
                    </div>
                ))}
            </div>
            {/* paymnet and delivery info */}
            <div className="grid grid-cols-2 gap-8">
                {/* Payment */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">payment</h4>
                    <p className="text-gray-600">paypal</p>
                </div>
                {/* delivry info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">
                        delivry
                    </h4>
                    <p className="text-gray-600">{checkout.shippingAddress.address}</p>
                    <p className="text-gray-600">{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.contry}</p>
                </div>
            </div>
            </div>)}
    </div>
  )
}

export default OrderConfirmation