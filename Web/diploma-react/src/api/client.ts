const handleResponse = async (response: Response) => {
  if (!response.ok) {
    debugger;
    const message = await response.json();
    throw Error(message || "Request error");
  }

  console.log(response);
  return response.json();
};

const apiClient = async ({ url, method, body }: apiClientProps) => {
  const requestOptions = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  var a = await fetch(`${url}`, requestOptions).then(handleResponse);
  debugger
  return a;
};

interface apiClientProps {
  url: string
  method: string;
  body?: any;
}

export default apiClient;
