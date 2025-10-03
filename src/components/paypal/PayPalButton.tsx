'use client';


import { setTransactionId } from '@/actions';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = (Math.round(amount * 100)) / 100; //123.23

  const createOrder = async (_data: any, actions: any): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD', // 👈 recomendado
            value: `${roundedAmount}`, // 👈 debe ser string en formato 2 decimales
          },
        },
      ],
    });

    console.log(orderId, transactionId)
    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  }

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
    />
  )
}