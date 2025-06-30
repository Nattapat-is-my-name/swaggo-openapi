import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Import the generated API clients directly
import {
  AccountsApi,
  BottlesApi,
  ExampleApi,
  Configuration,
  type ModelAccount,
  type ModelBottle,
} from "../client-sdk";

// Configure the API client
const API_BASE_URL = "http://localhost:8080/api/v1";

const apiConfig = new Configuration({
  basePath: API_BASE_URL,
  // Add other configuration as needed
  // apiKey: 'your-api-key',
  // accessToken: 'your-access-token',
});

const accountsApi = new AccountsApi(apiConfig);
const bottlesApi = new BottlesApi(apiConfig);
const exampleApi = new ExampleApi(apiConfig);

// Enhanced API Error Handler with more details
const handleApiError = (error: any): string => {
  console.log("Full error object:", error);

  if (error?.response) {
    const status = error.response.status;
    const message = error.response.statusText || "Unknown error";
    return `API Error ${status}: ${message}`;
  } else if (error?.message) {
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      return `Network Error: Cannot connect to ${API_BASE_URL}. Check if server is running and CORS is configured.`;
    }
    return `Network Error: ${error.message}`;
  } else {
    return "An unexpected error occurred";
  }
};

// Helper function to check if API is available
const checkApiHealth = async (): Promise<boolean> => {
  try {
    console.log(`Attempting to connect to: ${API_BASE_URL}/examples/ping`);
    await exampleApi.examplesPingGet();
    return true;
  } catch (error) {
    console.error("API Health check failed:", error);
    return false;
  }
};

// Manual URL test function
const testDirectConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/examples/ping`);
    console.log("Direct fetch response:", response);
    if (response.ok) {
      const text = await response.text();
      console.log("Direct fetch success:", text);
      return `Success: ${text}`;
    } else {
      return `HTTP ${response.status}: ${response.statusText}`;
    }
  } catch (error) {
    console.error("Direct fetch error:", error);
    return `Direct fetch failed: ${error}`;
  }
};

function App() {
  const [count, setCount] = useState(0);
  const [accounts, setAccounts] = useState<ModelAccount[]>([]);
  const [bottles, setBottles] = useState<ModelBottle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pingResult, setPingResult] = useState<string>("");
  const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);
  const [directTestResult, setDirectTestResult] = useState<string>("");

  // Check API health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await checkApiHealth();
      setApiHealthy(healthy);
    };
    checkHealth();
  }, []);

  // Test direct connection
  const handleDirectTest = async () => {
    setLoading(true);
    const result = await testDirectConnection();
    setDirectTestResult(result);
    setLoading(false);
  };

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const accountsList = await accountsApi.accountsGet();
      setAccounts(accountsList);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bottles
  const fetchBottles = async () => {
    try {
      setLoading(true);
      setError(null);
      const bottlesList = await bottlesApi.bottlesGet();
      setBottles(bottlesList);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error fetching bottles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Test ping endpoint
  const testPing = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await exampleApi.examplesPingGet();
      exampleApi.
      setPingResult(result);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error pinging:", err);
    } finally {
      setLoading(false);
    }
  };

  // Test calc endpoint
  const testCalc = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await exampleApi.examplesCalcGet({ val1: 5, val2: 3 });
      alert(`Calculation result: 5 + 3 = ${result}`);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error calculating:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new account
  const createAccount = async () => {
    try {
      setLoading(true);
      setError(null);
      const newAccount = await accountsApi.accountsPost({
        account: {
          name: `Test Account ${Date.now()}`,
          // Add other required fields based on your ModelAddAccount
        },
      });
      setAccounts((prev) => [...prev, newAccount]);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error("Error creating account:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + OpenAPI</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* API Testing Section */}
      <div className="card">
        <h2>API Testing</h2>

        {/* API Health Status */}
        <div style={{ margin: "10px 0" }}>
          <strong>API Status:</strong>
          <span
            style={{
              color:
                apiHealthy === true
                  ? "green"
                  : apiHealthy === false
                  ? "red"
                  : "orange",
              marginLeft: "10px",
            }}
          >
            {apiHealthy === true
              ? "✅ Healthy"
              : apiHealthy === false
              ? "❌ Unavailable"
              : "⏳ Checking..."}
          </span>
        </div>

        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

        {loading && (
          <div style={{ color: "blue", margin: "10px 0" }}>Loading...</div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "10px 0",
            flexWrap: "wrap",
          }}
        >
          <button onClick={testPing}>Test Ping</button>
          <button onClick={testCalc}>Test Calc (5+3)</button>
          <button onClick={handleDirectTest}>Test Direct Connection</button>
          <button onClick={fetchAccounts}>Fetch Accounts</button>
          <button onClick={fetchBottles}>Fetch Bottles</button>
          <button onClick={createAccount}>Create Account</button>
        </div>

        {directTestResult && (
          <div
            style={{
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <strong>Direct Connection Test:</strong> {directTestResult}
          </div>
        )}

        {pingResult && (
          <div style={{ margin: "10px 0" }}>
            <strong>Ping Result:</strong> {pingResult}
          </div>
        )}

        {accounts.length > 0 && (
          <div style={{ margin: "20px 0" }}>
            <h3>Accounts ({accounts.length})</h3>
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              {accounts.map((account, index) => (
                <div
                  key={account.id || index}
                  style={{
                    border: "1px solid #ccc",
                    margin: "5px 0",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <strong>ID:</strong> {account.id}
                  <br />
                  <strong>Name:</strong> {account.name}
                  <br />
                  {/* Display other available properties */}
                  {Object.entries(account).map(([key, value]) => {
                    if (
                      key !== "id" &&
                      key !== "name" &&
                      value !== undefined &&
                      value !== null
                    ) {
                      return (
                        <div key={key}>
                          <strong>{key}:</strong> {String(value)}
                          <br />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {bottles.length > 0 && (
          <div style={{ margin: "20px 0" }}>
            <h3>Bottles ({bottles.length})</h3>
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              {bottles.map((bottle, index) => (
                <div
                  key={bottle.id || index}
                  style={{
                    border: "1px solid #ccc",
                    margin: "5px 0",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <strong>ID:</strong> {bottle.id}
                  <br />
                  <strong>Name:</strong> {bottle.name}
                  <br />
                  {/* Add other bottle fields as needed */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
