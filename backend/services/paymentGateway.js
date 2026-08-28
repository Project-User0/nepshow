import { URLSearchParams } from "url";
import { generateEsewaSignature } from "../utils/generateSignature.js";

const DEFAULT_APP_BASE_URL = "http://localhost:5173";

const buildCallbackUrls = (paymentMethod, transactionId) => {
  const baseUrl = process.env.APP_BASE_URL || DEFAULT_APP_BASE_URL;
  const successUrl = `${baseUrl}/payment?status=success&paymentMethod=${paymentMethod}&transactionId=${encodeURIComponent(transactionId)}`;
  const failureUrl = `${baseUrl}/payment?status=failed&paymentMethod=${paymentMethod}&transactionId=${encodeURIComponent(transactionId)}`;
  return { successUrl, failureUrl };
};

export const initiateGatewayPayment = async ({
  amount,
  paymentMethod,
  transactionId,
  plan,
}) => {
  const { successUrl, failureUrl } = buildCallbackUrls(
    paymentMethod,
    transactionId,
  );
  const appBaseUrl =
    process.env.APP_BASE_URL ||
    process.env.FRONTEND_URL ||
    DEFAULT_APP_BASE_URL;

  if (paymentMethod === "esewa") {
    const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";

    const totalAmount = Number(amount).toFixed(2);
    const taxAmount = "0";
    const serviceCharge = "0";
    const deliveryCharge = "0";

    const signature = generateEsewaSignature(
      totalAmount,
      transactionId,
      productCode,
    );

    return {
      success: true,
      provider: "esewa",
      mode: productCode === "EPAYTEST" ? "sandbox" : "live",

      action: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",

      fields: {
        amount: totalAmount,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        transaction_uuid: transactionId,
        product_code: productCode,
        product_service_charge: serviceCharge,
        product_delivery_charge: deliveryCharge,
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      },

      transactionId,
      plan,
    };
  }

  if (paymentMethod === "khalti") {
    const secretKey =
      process.env.KHALTI_LIVE_SECRET_KEY || process.env.KHALTI_SECRET_KEY;
    const publicKey =
      process.env.KHALTI_LIVE_PUBLIC_KEY || process.env.KHALTI_PUBLIC_KEY;

    if (secretKey && publicKey) {
      try {
        const response = await fetch(
          "https://a.khalti.com/api/v2/epayment/initiate/",
          {
            method: "POST",
            headers: {
              Authorization: `Key ${secretKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              purchase_order_id: transactionId,
              purchase_order_name: plan || "Premium Monthly",
              customer_info: {
                name: "NepShow Customer",
                email: "customer@nepshow.com",
              },
              return_url: successUrl,
              website_url: appBaseUrl,
            }),
          },
        );

        const data = await response.json();
        if (response.ok && data?.pidx) {
          return {
            success: true,
            provider: "khalti",
            mode: "live",
            redirectUrl: data.payment_url,
            transactionId,
            plan,
          };
        }
      } catch (error) {
        console.error("Khalti gateway error:", error.message);
      }
    }

    return {
      success: true,
      provider: "khalti",
      mode: "sandbox",
      redirectUrl: `${appBaseUrl}/payment?status=demo&paymentMethod=khalti&transactionId=${encodeURIComponent(transactionId)}`,
      transactionId,
      plan,
    };
  }

  return {
    success: false,
    message: "Unsupported payment method",
  };
};
