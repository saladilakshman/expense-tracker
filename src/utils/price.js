export const IndianPrice = (price) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: price.toString().length,
    }).format(Number(price));
  } catch (err) {
    console.log(err);
  }
};
