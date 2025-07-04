import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const createCheckoutSession = async (priceId: string) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  // This would typically call your backend to create a checkout session
  // For now, we'll simulate the flow
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });

  const session = await response.json();
  
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
};

export const pricingPlans = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic Calculator', 'Scientific Mode', 'Local History', 'Dark/Light Theme'],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: 'price_pro_monthly',
    features: [
      'All Calculator Modes',
      'AI Math Assistant',
      'Voice Input',
      'Graph Plotting',
      'Export Functions',
      'Cloud Sync',
      'Advanced History',
    ],
  },
  team: {
    name: 'Team',
    price: 29.99,
    priceId: 'price_team_monthly',
    features: [
      'Everything in Pro',
      'Multi-user Collaboration',
      'Team Workspaces',
      'Plugin Access',
      'Priority Support',
      'Custom Integrations',
    ],
  },
};