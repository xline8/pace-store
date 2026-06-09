import { useEffect, useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react'; // eslint-disable-line
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = 'address' | 'payment' | 'confirm' | 'success';

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'visa',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) { setStep('address'); return; }
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 1800);
  };

  const handleClose = () => {
    setStep('address');
    onClose();
  };

  const STEPS = ['address', 'payment', 'confirm'];
  const stepIndex = STEPS.indexOf(step as string);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={step === 'address' || step === 'payment' || step === 'confirm' ? onClose : undefined} />
      <div className="relative w-full sm:max-w-md bg-cream-soft rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">

        {/* Success state */}
        {step === 'success' ? (
          <div className="flex flex-col items-center justify-center p-10 text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-xl font-medium text-ink">Order Placed!</h2>
              <p className="text-sm text-ink-muted">
                Terima kasih, <strong>{form.name || 'Customer'}</strong>! Pesanan Anda sedang diproses.
              </p>
            </div>
            <div className="w-full p-4 bg-cream rounded-xl border border-black/5 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Estimasi tiba</span>
                <span className="font-medium text-ink">3–4 hari kerja</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-muted">Dikirim ke</span>
                <span className="font-medium text-ink text-right max-w-40">{form.city || 'Alamat Anda'}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm"
            >
              Selesai
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/8 flex-shrink-0">
              <h2 className="font-display text-lg font-medium text-ink">Checkout</h2>
              <button onClick={onClose} className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-ink-muted hover:text-ink transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Step indicator */}
            {(step === 'address' || step === 'payment' || step === 'confirm') && (
              <div className="px-6 pt-4 flex items-center gap-2">
                {[
                  { key: 'address', label: 'Alamat', icon: MapPin },
                  { key: 'payment', label: 'Bayar', icon: CreditCard },
                  { key: 'confirm', label: 'Konfirmasi', icon: Truck },
                ].map(({ key, label }, i) => (
                  <div key={key} className="flex items-center gap-2 flex-1">
                    <div className={`flex items-center gap-1.5 ${i <= stepIndex ? 'text-ink' : 'text-ink/30'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${i < stepIndex ? 'bg-ink border-ink text-cream' : i === stepIndex ? 'border-ink text-ink' : 'border-ink/20 text-ink/30'}`}>
                        {i < stepIndex ? '✓' : i + 1}
                      </div>
                      <span className="text-xs font-medium hidden sm:block">{label}</span>
                    </div>
                    {i < 2 && <div className={`flex-1 h-px mx-1 ${i < stepIndex ? 'bg-ink' : 'bg-ink/15'}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 flex-1 space-y-4">
              {/* Step 1: Address */}
              {step === 'address' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                    <MapPin size={14} className="text-accent" /> Alamat Pengiriman
                  </h3>
                  {[
                    { key: 'name', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap' },
                    { key: 'address', label: 'Alamat', placeholder: 'Jl. contoh No. 123' },
                    { key: 'city', label: 'Kota', placeholder: 'Yogyakarta' },
                    { key: 'zip', label: 'Kode Pos', placeholder: '55281' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-medium text-ink-muted block mb-1">{label}</label>
                      <input
                        type="text"
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-sm text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-ink/30 transition-all"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                    <CreditCard size={14} className="text-accent" /> Metode Pembayaran
                  </h3>
                  <div className="space-y-2">
                    {[
                      { key: 'visa', label: 'Visa / Mastercard', sub: 'Kartu kredit atau debit' },
                      { key: 'paypal', label: 'PayPal', sub: 'Bayar lewat akun PayPal' },
                      { key: 'applepay', label: 'Apple Pay', sub: 'Bayar dengan Touch ID / Face ID' },
                      { key: 'transfer', label: 'Bank Transfer', sub: 'BCA, Mandiri, BNI, BRI' },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        onClick={() => setForm({ ...form, paymentMethod: key })}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${form.paymentMethod === key ? 'border-ink bg-cream' : 'border-black/8 bg-white hover:border-black/20'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${form.paymentMethod === key ? 'border-ink' : 'border-ink/30'}`}>
                          {form.paymentMethod === key && <div className="w-2 h-2 rounded-full bg-ink" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink">{label}</p>
                          <p className="text-xs text-ink-muted">{sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 'confirm' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                    <Truck size={14} className="text-accent" /> Ringkasan Pesanan
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2 bg-cream rounded-xl">
                        <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-contain bg-white rounded-lg p-1" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-ink truncate">{item.product.title}</p>
                          <p className="text-xs text-ink-muted">x{item.quantity}</p>
                        </div>
                        <span className="text-xs font-semibold text-ink">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-cream rounded-xl border border-black/5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-ink-muted">Dikirim ke</span>
                      <span className="text-ink font-medium">{form.name}, {form.city}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-ink-muted">Pembayaran</span>
                      <span className="text-ink font-medium capitalize">{form.paymentMethod}</span>
                    </div>
                    <div className="h-px bg-black/8 my-1" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-ink">Total</span>
                      <span className="text-ink">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-5 border-t border-black/8 flex-shrink-0">
              {step === 'address' && (
                <button
                  onClick={() => setStep('payment')}
                  disabled={!form.name || !form.address || !form.city}
                  className="w-full py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Lanjut ke Pembayaran
                </button>
              )}
              {step === 'payment' && (
                <div className="flex gap-3">
                  <button onClick={() => setStep('address')} className="px-5 py-3.5 border border-black/15 text-ink text-sm font-medium rounded-2xl hover:bg-black/5 transition-colors">
                    Kembali
                  </button>
                  <button onClick={() => setStep('confirm')} className="flex-1 py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm">
                    Lanjut
                  </button>
                </div>
              )}
              {step === 'confirm' && (
                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')} className="px-5 py-3.5 border border-black/15 text-ink text-sm font-medium rounded-2xl hover:bg-black/5 transition-colors">
                    Kembali
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Memproses...
                      </>
                    ) : 'Buat Pesanan'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
