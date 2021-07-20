export default function formatPrice(price) {
  let formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return formatter.format(price);
}
