// app/payment/page.tsx
'use client'; // required for client-side hooks

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/payment/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentIntentResponse {
  client_secret?: string;
  error?: string;
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const amount = 5000; // smallest currency unit, e.g., ₹50 = 5000 paisa

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
          setError(data.error);
          setClientSecret(null);
        } else {
          setClientSecret(data.client_secret || null);
        }
      } catch (err: any) {
        setError(err.message || 'Network error');
        setClientSecret(null);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  if (loading) return <p>Loading payment…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!clientSecret) return <p>Unable to initialize payment. Try again.</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
