---

## Prerequisites

- Go installed ([https://golang.org/dl/](https://golang.org/dl/))
- Swag CLI installed:
  ```bash
  go install github.com/swaggo/swag/cmd/swag@latest
````

* OpenAPI Generator CLI installed:

  ```bash
  brew install openapi-generator
  ```
* Node.js or Bun installed for frontend dependencies
* (Optional) Bun installed ([https://bun.sh](https://bun.sh))

---

## Backend: Generate OpenAPI Spec

1. Navigate to your Go backend project root.
2. Generate the OpenAPI spec JSON and YAML files with Swaggo:

   ```bash
   swag init
   ```

   This creates `./docs/swagger.json` and `./docs/swagger.yaml`.

---

## Generate TypeScript Client SDK

1. From your frontend or project root, run:

   ```bash
   openapi-generator generate \
     -i ./docs/swagger.json \
     -g typescript-fetch \
     -o ./client-sdk
   ```

2. This generates a TypeScript client SDK inside the `client-sdk` folder.

---

## Frontend: Install and Run

1. Install dependencies (choose one):

   Using npm:

   ```bash
   npm install
   ```

   Using Bun:

   ```bash
   bun install
   ```

2. Run the Vite development server:

   Using npm:

   ```bash
   npm run dev
   ```

   Using Bun:

   ```bash
   bun run dev
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173) to view the app.

---

## Using the Generated Client SDK

1. Import the client SDK in your React components:

   ```ts
   import { DefaultApi } from '../client-sdk';

   const api = new DefaultApi();

   api.someEndpointGet().then(response => {
     console.log(response.data);
   });
   ```

2. Adjust the import path based on your project structure.

---

## Troubleshooting

* If `swag init` fails, ensure your Go API has proper Swagger comments.
* If `openapi-generator` cannot find the spec file, verify the path to `swagger.json`.
* For local API specs served via HTTP, you can use the URL instead of a local file path:

  ```bash
  openapi-generator generate -i http://localhost:8080/swagger/doc.json -g typescript-fetch -o ./client-sdk
  ```

---

## References

* [Swaggo Documentation](https://github.com/swaggo/swag)
* [OpenAPI Generator Documentation](https://openapi-generator.tech/)
* [Vite](https://vitejs.dev/)
* [React](https://reactjs.org/)

```
