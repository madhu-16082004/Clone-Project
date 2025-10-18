import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid or missing amount' }, { status: 400 });
    }

    // Convert amount in INR to paisa (smallest unit)
    const amountInPaisa = Math.round(amount * 100);

    // Stripe requires minimum 50 cents (~₹50) for INR
    if (amountInPaisa < 5000) {
      return NextResponse.json(
        { error: 'Amount must be at least ₹50' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaisa,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ client_secret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('Stripe Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST method for payments' }, { status: 405 });
}
