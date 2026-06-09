import { useEffect } from 'react';
import { X } from 'lucide-react';

export type InfoPage =
  | 'about'
  | 'faqs'
  | 'customer-support'
  | 'delivery-details'
  | 'terms'
  | 'privacy'
  | 'account'
  | 'manage-deliveries'
  | 'orders'
  | 'payments'
  | 'features'
  | 'works'
  | 'career'
  | 'ebooks'
  | 'tutorial'
  | 'blog'
  | 'youtube';

interface InfoModalProps {
  page: InfoPage | null;
  onClose: () => void;
}

const CONTENT: Record<InfoPage, { title: string; body: React.ReactNode }> = {
  about: {
    title: 'About Pace Store',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>
          Pace Store is a modern fashion platform that brings high-quality clothing collections
          for men, women, and children. Founded in 2026, we have served millions of customers
          around the world.
        </p>
        <p>
          Our mission is simple: to provide clothing that fits your lifestyle and makes you proud
          to wear it. Each product is carefully selected from trusted brands with the highest quality standards.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          {[['2026', 'Founded Year'], ['50+', 'Partner Brands'], ['2M+', 'Customers']].map(([num, label]) => (
            <div key={label} className="bg-cream rounded-xl p-4 text-center">
              <p className="font-display text-2xl font-semibold text-ink">{num}</p>
              <p className="text-xs text-ink-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
        <p>
          We are committed to sustainability and ethical business practices. Our entire supply chain
          is regularly audited to ensure high environmental and labor standards.
        </p>
      </div>
    ),
  },
  faqs: {
    title: 'Frequently Asked Questions',
    body: (
      <div className="space-y-4">
        {[
          {
            q: 'How long does delivery take?',
            a: 'Standard shipping takes 3–4 working days. Express shipping is available within 1–2 working days for an additional fee.',
          },
          {
            q: 'Can I return a product?',
            a: 'Yes, we accept returns within 30 days of purchase as long as the product is in its original condition with tags attached.',
          },
          {
            q: 'How do I track my order?',
            a: 'Once your order is shipped, you will receive an email with a tracking number that can be used to track your package on the "Manage Deliveries" page.',
          },
          {
            q: 'What payment methods are accepted?',
            a: 'We accept Visa, Mastercard, PayPal, Apple Pay, and Google Pay.',
          },
          {
            q: 'Is there a loyalty program?',
            a: 'Yes! Every purchase earns points that can be redeemed for discounts on your next transaction. Register an account to start collecting points.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="border border-black/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-cream">
              <p className="text-sm font-semibold text-ink">{q}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  'customer-support': {
    title: 'Customer Support',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>Our support team is ready to help you 7 days a week, from 08:00 to 22:00 WIB.</p>
        <div className="space-y-3">
          {[
            { label: 'Email', value: 'support@pacestore.com' },
            { label: 'WhatsApp', value: '+62 812-3456-7890' },
            { label: 'Live Chat', value: 'Available in application (08:00–22:00)' },
            { label: 'Average Response', value: 'Less than 2 hours' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-3 p-3 bg-cream rounded-xl">
              <span className="text-xs font-semibold text-ink min-w-28">{label}</span>
              <span className="text-xs text-ink-muted">{value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  'delivery-details': {
    title: 'Delivery Details',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <div className="space-y-3">
          {[
            { type: 'Regular', time: '3–4 working days', price: 'Free above $300' },
            { type: 'Express', time: '1–2 working days', price: '$29.99' },
            { type: 'Same Day', time: 'Same day (order before 12:00)', price: '$39.99' },
          ].map(({ type, time, price }) => (
            <div key={type} className="p-4 bg-cream rounded-xl border border-black/5">
              <p className="font-semibold text-ink text-sm">{type}</p>
              <p className="text-xs mt-1">{time}</p>
              <p className="text-xs text-accent font-medium mt-0.5">{price}</p>
            </div>
          ))}
        </div>
        <p className="text-xs">
          Delivery is available across Indonesia. Remote areas may require an additional 1–2 working days.
        </p>
      </div>
    ),
  },
  terms: {
    title: 'Terms & Conditions',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        {[
          { title: '1. Use of Services', text: 'By using the Pace Store platform, you agree to these terms and conditions. You must be at least 18 years old or have parent/guardian permission to make a purchase.' },
          { title: '2. User Account', text: 'You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to deactivate accounts that violate the terms of use.' },
          { title: '3. Pricing and Payment', text: 'All prices are listed in USD and include applicable taxes. We reserve the right to change prices at any time without prior notice.' },
          { title: '4. Product Returns', text: 'Products can be returned within 30 days in original condition. Return shipping costs are borne by the buyer unless the product is defective.' },
          { title: '5. Intellectual Property Rights', text: 'All content on this platform, including images, text, and logos, belongs to Pace Store and is protected by copyright.' },
        ].map(({ title, text }) => (
          <div key={title}>
            <p className="font-semibold text-ink">{title}</p>
            <p className="mt-1">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        {[
          { title: 'Data We Collect', text: 'We collect information you provide when registering (name, email, address), transaction data, and anonymous platform usage data.' },
          { title: 'Data Usage', text: 'Data is used to process orders, improve services, personalize your experience, and for communication related to your orders.' },
          { title: 'Data Security', text: 'All data is encrypted using SSL/TLS. We do not sell your personal data to any third party.' },
          { title: 'Cookies', text: 'We use cookies to improve your browsing experience. You can disable cookies through your browser settings.' },
          { title: 'Your Rights', text: 'You have the right to access, modify, or delete your personal data at any time by contacting our support team.' },
        ].map(({ title, text }) => (
          <div key={title}>
            <p className="font-semibold text-ink">{title}</p>
            <p className="mt-1">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  account: {
    title: 'Manage Account',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>Manage your account information for a more personalized shopping experience.</p>
        <div className="space-y-2">
          {['Change name and profile picture', 'Update email address and password', 'Add and manage delivery addresses', 'View purchase history', 'Set notification preferences', 'Manage saved payment methods'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-cream rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="text-xs">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs">To access this feature, please log in to your Pace Store account.</p>
      </div>
    ),
  },
  'manage-deliveries': {
    title: 'Manage Deliveries',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>Monitor and manage all your shipments in one page.</p>
        <div className="p-4 bg-cream rounded-xl border border-black/5 text-center">
          <p className="text-ink font-semibold text-sm">No active shipments</p>
          <p className="text-xs mt-1">Your orders will appear here after checkout</p>
        </div>
        <p>The delivery tracking feature allows you to:</p>
        <ul className="space-y-2">
          {['View real-time package status', 'Change delivery address (before processed)', 'Reschedule delivery time', 'Contact the courier directly'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <span className="text-xs">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  orders: {
    title: 'My Orders',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>View and manage all your order history.</p>
        <div className="p-6 bg-cream rounded-xl border border-black/5 text-center">
          <p className="text-ink font-semibold text-sm">No orders yet</p>
          <p className="text-xs mt-1">Start shopping to see your order history here</p>
        </div>
        <p className="text-xs">Every order can be tracked, and you can request a return directly from the order details page within 30 days of purchase.</p>
      </div>
    ),
  },
  payments: {
    title: 'Payment Methods',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>We support various secure and trusted payment methods.</p>
        <div className="grid grid-cols-2 gap-3">
          {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'].map((method) => (
            <div key={method} className="p-3 bg-cream rounded-xl border border-black/5 text-center">
              <p className="text-xs font-semibold text-ink">{method}</p>
            </div>
          ))}
        </div>
        <p>All transactions are processed with 256-bit SSL encryption. Your card data is never stored on our servers.</p>
      </div>
    ),
  },
  features: {
    title: 'Features',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        {[
          { icon: '🔍', title: 'Smart Search', desc: 'Find products quickly using real-time search.' },
          { icon: '🏷️', title: 'Filter & Sort', desc: 'Filter by category, price, and rating.' },
          { icon: '🛒', title: 'Easy Checkout', desc: 'Fast checkout process with various payment methods.' },
          { icon: '📦', title: 'Order Tracking', desc: 'Monitor your order status in real-time.' },
          { icon: '↩️', title: 'Easy Returns', desc: 'Easy product returns within 30 days.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex gap-3 p-3 bg-cream rounded-xl">
            <span className="text-lg">{icon}</span>
            <div>
              <p className="font-semibold text-ink text-xs">{title}</p>
              <p className="text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  works: {
    title: 'How It Works',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        {[
          { step: '01', title: 'Browse Collection', desc: 'Explore thousands of products from various categories and brands.' },
          { step: '02', title: 'Select Product', desc: 'Click a product to view full details, choose your size, and add to cart.' },
          { step: '03', title: 'Checkout', desc: 'Enter your delivery address and choose your preferred payment method.' },
          { step: '04', title: 'Confirmation', desc: 'Receive a confirmation email and tracking number to monitor your shipment.' },
          { step: '05', title: 'Receive Package', desc: 'The package arrives within 3–4 working days. Enjoy your shopping!' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex gap-4">
            <span className="font-display text-2xl font-semibold text-ink/10 flex-shrink-0 w-8">{step}</span>
            <div>
              <p className="font-semibold text-ink text-sm">{title}</p>
              <p className="text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  career: {
    title: 'Career at Pace Store',
    body: (
      <div className="space-y-4 text-sm text-ink-muted leading-relaxed">
        <p>Join the Pace Store team and be part of the digital fashion revolution.</p>
        <div className="space-y-3">
          {[
            { title: 'Frontend Engineer', dept: 'Engineering', type: 'Full-time' },
            { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time' },
            { title: 'Marketing Specialist', dept: 'Marketing', type: 'Full-time' },
            { title: 'Content Writer', dept: 'Content', type: 'Part-time' },
          ].map(({ title, dept, type }) => (
            <div key={title} className="p-4 bg-cream rounded-xl border border-black/5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink text-sm">{title}</p>
                <p className="text-xs text-ink-muted mt-0.5">{dept}</p>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-1 bg-ink text-cream rounded-full">{type}</span>
            </div>
          ))}
        </div>
        <p className="text-xs">Send your CV to <span className="text-ink font-medium">careers@pacestore.com</span></p>
      </div>
    ),
  },
  ebooks: {
    title: 'Free eBooks',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        <p>Download free guides to look stylish every day.</p>
        {[
          { title: 'The Capsule Wardrobe Guide', pages: '48 pages' },
          { title: 'Color Coordination 101', pages: '32 pages' },
          { title: 'Dressing for Your Body Type', pages: '56 pages' },
          { title: 'Sustainable Fashion Handbook', pages: '40 pages' },
        ].map(({ title, pages }) => (
          <div key={title} className="flex items-center justify-between p-3 bg-cream rounded-xl border border-black/5">
            <div>
              <p className="font-semibold text-ink text-xs">{title}</p>
              <p className="text-[11px] mt-0.5">{pages} · PDF</p>
            </div>
            <button className="text-xs font-semibold text-accent hover:text-accent-dark transition-colors">
              Download
            </button>
          </div>
        ))}
      </div>
    ),
  },
  tutorial: {
    title: 'Development Tutorial',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        <p>Learn how to build a modern e-commerce application with the latest technologies.</p>
        {[
          { title: 'React + TypeScript Fundamentals', duration: '4 hours' },
          { title: 'Axios & API Integration', duration: '2 hours' },
          { title: 'Tailwind CSS Deep Dive', duration: '3 hours' },
          { title: 'State Management with Context API', duration: '2.5 hours' },
          { title: 'Deployment to Vercel/Netlify', duration: '1 hour' },
        ].map(({ title, duration }) => (
          <div key={title} className="flex items-center justify-between p-3 bg-cream rounded-xl border border-black/5">
            <p className="font-medium text-ink text-xs">{title}</p>
            <span className="text-[11px] text-ink-muted flex-shrink-0 ml-3">{duration}</span>
          </div>
        ))}
      </div>
    ),
  },
  blog: {
    title: 'How to — Blog',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        {[
          { title: 'How to Choose the Right Clothing Size', date: '5 Jun 2025' },
          { title: 'This Season’s Fashion Trends You Must Try', date: '1 Jun 2025' },
          { title: 'Mix & Match Outfits for Various Occasions', date: '28 May 2025' },
          { title: 'Guide to Caring for Clothes to Make Them Lasting', date: '20 May 2025' },
          { title: '10 Local Brands with Comparable Quality', date: '15 May 2025' },
        ].map(({ title, date }) => (
          <div key={title} className="p-3 bg-cream rounded-xl border border-black/5">
            <p className="font-semibold text-ink text-xs leading-snug">{title}</p>
            <p className="text-[11px] mt-1">{date}</p>
          </div>
        ))}
      </div>
    ),
  },
  youtube: {
    title: 'Youtube Playlist',
    body: (
      <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
        <p>Watch tutorials and fashion inspiration directly from our YouTube channel.</p>
        {[
          { title: 'Pace Store Style Guide 2025', videos: '12 videos', views: '48K views' },
          { title: 'Behind the Brand', videos: '8 videos', views: '22K views' },
          { title: 'Outfit of the Week', videos: '24 videos', views: '115K views' },
          { title: 'Sustainable Fashion Series', videos: '6 videos', views: '18K views' },
        ].map(({ title, videos, views }) => (
          <div key={title} className="flex items-center justify-between p-3 bg-cream rounded-xl border border-black/5">
            <div>
              <p className="font-semibold text-ink text-xs">{title}</p>
              <p className="text-[11px] mt-0.5">{videos} · {views}</p>
            </div>
            <button className="text-xs font-semibold text-accent hover:text-accent-dark transition-colors">
              Watch
            </button>
          </div>
        ))}
      </div>
    ),
  },
};

export function InfoModal({ page, onClose }: InfoModalProps) {
  useEffect(() => {
    if (!page) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [page, onClose]);

  if (!page) return null;

  const content = CONTENT[page];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-cream-soft rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8 flex-shrink-0">
          <h2 className="font-display text-lg font-medium text-ink">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-ink-muted hover:text-ink transition-all"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {content.body}
        </div>
      </div>
    </div>
  );
}