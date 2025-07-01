// @ts-check

import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Calculate 21% surcharge based on cart subtotal
  const subtotal = Number(input.cart.cost.subtotalAmount.amount);
  const surcharge = Math.round(subtotal * 0.21 * 100) / 100;

  // Only apply surcharge if subtotal is greater than 0
  const discounts = surcharge > 0 ? [
    {
      targets: [
        {
          orderSubtotal: {
            excludedVariantIds: [],
          },
        },
      ],
      value: {
        fixedAmount: {
          amount: surcharge.toString(),
        },
      },
      message: "21% Surcharge",
    }
  ] : [];

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
}
