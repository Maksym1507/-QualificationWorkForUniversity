const handleResponse = async (response: Response) => {
  if (!response.ok) {
    debugger;
    const message = await response.json();
    throw Error(message.message || "Request error");
  }

  console.log(response);
  return response.json();
};

let headers: { "Content-Type": string; Authorization?: string; } | { "Content-Type": string; };

const apiClient = async ({ url, path, method, body }: apiClientProps) => {
  if (localStorage.getItem("token")) {
    headers = { "Content-Type": "application/json", 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token") || "") };
  }
  else {
    headers = { "Content-Type": "application/json" }
  }

  const requestOptions = {
    method,
    headers: headers,
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
