const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
};

export default fetcher;
