/**
 * @file Poynt Collect APIs
 */

const request = require("request");
var helpers = require("./helpers");

/**
 * Retrive eligible-fees from poynt api (ex. Surcharge)
 */
module.exports.getEligibleFees = function (options, next) {
    var hasErr =
        helpers.hasKeys(options, ["businessId", "cardToken", "amounts"]) ||
        helpers.hasKeys(options.amounts, ["transactionAmount"]);
    if (hasErr) {
        return next(hasErr);
    }

    var body = {
        action: "SALE",
        amounts: {
            currency: options.amounts.currency || "USD",
            cashbackAmount: options.amounts.cashbackAmount || 0,
            transactionAmount: options.amounts.transactionAmount,
            tipAmount: options.amounts.tipAmount || 0,
        },
        fundingSource: {
            type: "CREDIT_DEBIT",
            cardToken: options.cardToken || undefined,
            nonce: options.nonce || undefined,
        },
        context: {
            businessId: options.businessId,
        },
    }

    this.request(
        {
            url: `/businesses/${options.businessId}/transactions/eligible-fees`,
            method: "POST",
            body: body,
            requestId: options.requestId,
        },
        next
    );
};


module.exports.getSurcharge = module.exports.getEligibleFees;