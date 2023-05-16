const handleResponse = async (response: Response) => {
  if (!response.ok) {
    debugger;
    const message = await response.json();
    throw Error(message || "Request error");
  }

  console.log(response);
  return response.json();
};

const apiClient = async ({ url, path, method, body }: apiClientProps) => {
  const requestOptions = {
    method,
    headers: { "Content-Type": "application/json" },
    body: !!body ? JSON.stringify(body) : undefined,
  };
  
  return await fetch(`${url}${path}`, requestOptions).then(handleResponse);
};

interface apiClientProps {
  url: string
  path: string;
  method: string;
  body?: unknown;
}

export default apiClient;
