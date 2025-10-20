'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/payment/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentIntentResponse {
  client_secret: string;
  error?: string;
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const amount = 5000; // default amount in smallest unit (e.g., cents)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch('/api/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        });

        const data: PaymentIntentResponse = await res.json();

        if (data.error) {
          console.error('Stripe Error:', data.error);
          setClientSecret(null);
        } else {
          setClientSecret(data.client_secret);
        }
      } catch (err) {
        console.error('Network Error:', err);
        setClientSecret(null);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  if (loading) return <p>Loading payment…</p>;
  if (!clientSecret) return <p>Unable to initialize payment. Please try again.</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
