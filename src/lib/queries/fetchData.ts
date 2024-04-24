export default async function fetchData<T>({
  query,
  error,
  variables,
}: {
  query: string,
  error: string,
  variables?: unknown
}): Promise<T> {
  const headers = {
    "Content-Type": "application/json"
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables
    }),
    next: {
      tags: ["strapi"],
      // Next.js issue: if fetch in the component, not on the page, the cache is always MISS with tags, but with Time-based Revalidation both works correctly
      revalidate: 3600,
    },
  });
    
  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(error);
  }

  const json = await res.json() as T

  return json
}
