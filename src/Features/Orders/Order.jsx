// Test ID: IIDSAT

// import OrderItem from '../Orders/OrderItems';

import {  useLoaderData } from 'react-router-dom';
import { getOrder } from '../../API/getMenu';
import { calcMinutesLeft, formatCurrency, formatDate, } from '../UTIL/Helpers';
import OrderItems from './OrderItems';
// import { useEffect } from 'react';

function Order() {

  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  console.log(order);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // const fetcher = useFetcher();

  // useEffect(function () {
  //   if (!fetcher.data) {
  //     fetcher.load('/menu');
  //   }
  // }, [fetcher]);

  // console.log(fetcher.data);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {<ul className="divide-stone-300 divide-y border-b border-t">
        {cart.map((item, i) => (
          <OrderItems item={item} key={i} />
        ))}
      </ul>}

      <div className="space-y-2 bg-stone-300 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>

        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}

        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;