import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Usernav from "../../../components/user/Usernav";
import {
  completePayment,
  createPayment,
  getUserPayments,
  handlePaymentFailure,
} from "../../../utils/paymentAPI";
import { getStoredUser, isSubscriptionActive, updateStoredUser } from "../../../utils/authMiddleware";

const SINGLE_PLAN = {
  name: "Premium Monthly",
  price: 250,
  duration: "1 Month",
  description: "Unlock full access to premium movies and content.",
  features: ["Unlimited streaming", "HD quality", "Ad-free experience"],
};

const PAYMENT_METHODS = [
  {
    id: "esewa",
    label: "eSewa",
    accent: "from-purple-600 to-purple-700",
    description: "Quick and secure wallet payment",
  },
  {
    id: "khalti",
    label: "Khalti",
    accent: "from-blue-600 to-blue-700",
    description: "Trusted mobile wallet checkout",
  },
];

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("esewa");
  const user = getStoredUser();
  const subscriptionActive = isSubscriptionActive(user);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const transactionId = params.get("transactionId");
    const paymentMethod = params.get("paymentMethod");

    if (status && transactionId) {
      const finalizePayment = async () => {
        try {
          if (status === "success") {
            await completePayment({
              transactionId,
              paymentMethod: paymentMethod || "esewa",
              plan: "premium",
              amount: SINGLE_PLAN.price,
              currency: "NPR",
              startDate: new Date().toISOString(),
              endDate: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000,
              ).toISOString(),
              durationType: "monthly",
            });

            const freshUser = getStoredUser();
            if (freshUser) {
              updateStoredUser({
                ...freshUser,
                subscription: {
                  ...(freshUser.subscription || {}),
                  plan: "premium",
                  isActive: true,
                  startDate: new Date().toISOString(),
                  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                  autoRenew: true,
                },
              });
            }
            setSuccess(
              "Payment completed successfully. Your subscription is now active.",
            );
          } else {
            await handlePaymentFailure({
              transactionId,
              plan: "premium",
              paymentMethod: paymentMethod || "esewa",
              reason: "Payment was cancelled or failed.",
            });
            setError("Payment was cancelled or failed. Please try again.");
          }

          await fetchPayments();
          navigate("/payment", { replace: true });
        } catch (err) {
          setError(err.message || "Unable to finalize payment.");
        }
      };

      finalizePayment();
    }

    fetchPayments();
  }, [location.search, navigate]);

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getUserPayments();
      if (response.success) {
        setPayments(response.data?.payments || []);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (methodId = selectedMethod) => {
  setProcessing(true);
  setError("");
  setSuccess("");

  try {
    const amount = SINGLE_PLAN.price;
    const transactionId = `${methodId.toUpperCase()}_${Date.now()}`;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const response = await createPayment({
      plan: "premium",
      amount,
      currency: "NPR",
      paymentMethod: methodId,
      transactionId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      durationType: "monthly",
    });

    if (response.success) {
      const gateway = response.data.gateway;

      // 1. Handle eSewa (Form submission)
      if (gateway.provider === "esewa") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = gateway.action;

        Object.entries(gateway.fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } 
      // 2. Handle Khalti (URL Redirection)
      else if (gateway.provider === "khalti") {
        if (gateway.redirectUrl) {
          // Send the user to Khalti's payment page (or sandbox fallback)
          window.location.href = gateway.redirectUrl;
        } else {
          throw new Error("Khalti redirect URL is missing from server response.");
        }
      } 
      // 3. Optional fallback for other types
      else {
        setError("Unsupported payment method provider.");
      }
    } else {
      setError(response.message || "Payment failed. Please try again.");
    }
  } catch (err) {
    setError(err.message || "Payment failed. Please try again.");
  } finally {
    setProcessing(false);
  }
};

  return (
    <>
      <Usernav />
      <div className="min-h-screen bg-gray-950 p-6 pt-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              Subscription Payment
            </h1>
            <p className="text-gray-400">
              Choose a single plan and pay with eSewa or Khalti.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-700 bg-red-900/80 p-4 text-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-700 bg-green-900/80 p-4 text-green-100">
              {success}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                    Current Plan
                  </p>
                  <h2 className="text-2xl font-semibold text-white">
                    {SINGLE_PLAN.name}
                  </h2>
                </div>
                <div className="rounded-full bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-300">
                  Rs. {SINGLE_PLAN.price}
                </div>
              </div>

              <p className="mb-6 text-gray-400">{SINGLE_PLAN.description}</p>

              <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800/70 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-300">
                  Includes
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {SINGLE_PLAN.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-red-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gray-700 bg-gray-950/80 p-4 text-sm text-gray-400">
                <p className="font-semibold text-gray-300">Billing details</p>
                {subscriptionActive && (
                  <div className="mt-3 rounded-lg border border-green-700 bg-green-950/60 p-3 text-green-300">
                    Your active subscription already covers premium access this month.
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <span>Plan</span>
                  <span className="text-white">{SINGLE_PLAN.name}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Duration</span>
                  <span className="text-white">{SINGLE_PLAN.duration}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Amount</span>
                  <span className="text-white">Rs. {SINGLE_PLAN.price}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">
                Choose a payment method
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Select one of the available options below to continue.
              </p>

              <div className="mt-6 space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedMethod === method.id
                        ? "border-red-500 bg-red-600/10"
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">
                        {method.label}
                      </span>
                      <span className="rounded-full bg-gray-700 px-3 py-1 text-xs uppercase tracking-wide text-gray-300">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      {method.description}
                    </p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePayment(selectedMethod)}
                disabled={processing || subscriptionActive}
                className="mt-6 w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition hover:from-red-700 hover:to-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing
                  ? "Processing payment..."
                  : subscriptionActive
                    ? "You already have an active subscription"
                    : `Pay Rs. ${SINGLE_PLAN.price} with ${selectedMethod === "esewa" ? "eSewa" : "Khalti"}`}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
            <div className="border-b border-gray-800 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Payment history
              </h2>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-400">
                Loading payments...
              </div>
            ) : payments.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                No payments found yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-300">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-gray-300">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-gray-300">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-gray-300">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr
                        key={payment._id}
                        className="border-t border-gray-800 hover:bg-gray-800/60"
                      >
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 capitalize text-gray-300">
                          {payment.plan}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          Rs. {payment.amount}
                        </td>
                        <td className="px-6 py-4 capitalize text-gray-300">
                          {payment.paymentMethod?.replace("_", " ")}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              payment.status === "completed"
                                ? "bg-green-900 text-green-300"
                                : payment.status === "pending"
                                  ? "bg-yellow-900 text-yellow-300"
                                  : "bg-red-900 text-red-300"
                            }`}
                          >
                            {payment.status?.charAt(0).toUpperCase() +
                              payment.status?.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
