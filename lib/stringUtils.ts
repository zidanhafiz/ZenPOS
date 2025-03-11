export const formatToRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0, // No decimal places
  }).format(amount);
};

export const formatDate = (
  date: string,
  type: "long" | "short" = "short"
): string => {
  if (type === "long") {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

export const getProductImagePath = (imageUrl: string) => {
  const urlParts = imageUrl.split("/products/");
  return urlParts[1];
};
