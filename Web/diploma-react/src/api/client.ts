const handleResponse = async (response: Response) => {
  if (!response.ok) {
    debugger;
    const message = await response.json();
    throw Error(message.error || "Request error");
  }

  console.log(response);
  return response.json();
};

const apiClient = async ({ url, method }: apiClientProps) => {
  const requestOptions = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  return await fetch(`${url}`, requestOptions).then(handleResponse);;
};

interface apiClientProps {
  url: string
  method: string;
}

export default apiClient;
