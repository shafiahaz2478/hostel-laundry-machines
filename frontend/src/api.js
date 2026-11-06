// Turns a fetch Response into JSON, or throws an Error whose message is the
// backend's 4xx "detail" text (FastAPI HTTPException / 422 validation errors).
// Ai generated json parsing
export async function parseResponse(response) {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    let message = "Something went wrong (" + response.status + ")"
    if (data && typeof data.detail === "string") {
      message = data.detail
    } else if (data && Array.isArray(data.detail)) {
      message = data.detail
        .map((d) => (d.loc ? d.loc[d.loc.length - 1] + ": " : "") + d.msg)
        .join(", ")
    }
    throw new Error(message)
  }
  return data
}

// fetch() itself rejects with a TypeError when the server can't be reached.
export function errorText(err) {
  return err instanceof TypeError
    ? "Cannot reach the server. Is the backend running?"
    : err.message
}
