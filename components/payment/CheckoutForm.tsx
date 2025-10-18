'use client';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url removed for inline flow
        },
        redirect: 'if_required', // important to prevent page reload
      });

      if (error) {
        setMessage(error.message || 'Payment failed');
        setPaymentDone(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('✅ Payment completed successfully!');
        setPaymentDone(true);
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
      setPaymentDone(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      {message && (
        <p className={`text-sm font-semibold ${paymentDone ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-yellow-500 p-2 rounded-lg text-white font-semibold disabled:opacity-50"
      >
        {loading ? 'Processing...' : paymentDone ? '✔ Payment Done' : 'Pay'}
      </button>
    </form>
  );
}
