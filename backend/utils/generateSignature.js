import crypto from "crypto";

export const generateEsewaSignature = (
  totalAmount,
  transactionUuid,
  productCode
) => {
  const secretKey = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";

  const signedString =
    `total_amount=${totalAmount},` +
    `transaction_uuid=${transactionUuid},` +
    `product_code=${productCode}`;

  return crypto
    .createHmac("sha256", secretKey)
    .update(signedString)
    .digest("base64");
};