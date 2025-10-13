"use client";

import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [base64Input, setBase64Input] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (error) {
      setJsonOutput("Invalid JSON: " + (error as Error).message);
    }
  };

  const encodeBase64 = () => {
    try {
      setBase64Output(btoa(base64Input));
    } catch (error) {
      setBase64Output("Error: " + (error as Error).message);
    }
  };

  const decodeBase64 = () => {
    try {
      setBase64Output(atob(base64Input));
    } catch (error) {
      setBase64Output("Error: " + (error as Error).message);
    }
  };

  const encodeUrl = () => {
    setUrlOutput(encodeURIComponent(urlInput));
  };

  const decodeUrl = () => {
    try {
      setUrlOutput(decodeURIComponent(urlInput));
    } catch (error) {
      setUrlOutput("Error: " + (error as Error).message);
    }
  };

  const generateHash = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHashOutput(hashHex);
    } catch (error) {
      setHashOutput("Error: " + (error as Error).message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Dev Tools</h1>
        <p>Simple developer utilities for everyday tasks</p>
      </div>

      <div className="tools-grid">
        {/* JSON Formatter */}
        <div className="tool-card">
          <h2 className="tool-title">JSON Formatter</h2>
          <div className="input-group">
            <label>Raw JSON:</label>
            <textarea
              rows={4}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"name": "example", "data": [1,2,3]}'
            />
          </div>
          <button className="btn" onClick={formatJson}>
            Format JSON
          </button>
          {jsonOutput && (
            <>
              <div className="output">{jsonOutput}</div>
              <button
                className="btn copy-btn"
                onClick={() => copyToClipboard(jsonOutput)}
              >
                Copy
              </button>
            </>
          )}
        </div>

        {/* Base64 Encoder/Decoder */}
        <div className="tool-card">
          <h2 className="tool-title">Base64 Encoder/Decoder</h2>
          <div className="input-group">
            <label>Input:</label>
            <textarea
              rows={3}
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Enter text or base64 string"
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <button className="btn" onClick={encodeBase64}>
              Encode
            </button>
            <button className="btn" onClick={decodeBase64}>
              Decode
            </button>
          </div>
          {base64Output && (
            <>
              <div className="output">{base64Output}</div>
              <button
                className="btn copy-btn"
                onClick={() => copyToClipboard(base64Output)}
              >
                Copy
              </button>
            </>
          )}
        </div>

        {/* URL Encoder/Decoder */}
        <div className="tool-card">
          <h2 className="tool-title">URL Encoder/Decoder</h2>
          <div className="input-group">
            <label>Input:</label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL or encoded string"
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <button className="btn" onClick={encodeUrl}>
              Encode
            </button>
            <button className="btn" onClick={decodeUrl}>
              Decode
            </button>
          </div>
          {urlOutput && (
            <>
              <div className="output">{urlOutput}</div>
              <button
                className="btn copy-btn"
                onClick={() => copyToClipboard(urlOutput)}
              >
                Copy
              </button>
            </>
          )}
        </div>

        {/* Hash Generator */}
        <div className="tool-card">
          <h2 className="tool-title">SHA-256 Hash Generator</h2>
          <div className="input-group">
            <label>Input:</label>
            <textarea
              rows={3}
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter text to hash"
            />
          </div>
          <button className="btn" onClick={generateHash}>
            Generate Hash
          </button>
          {hashOutput && (
            <>
              <div className="output">{hashOutput}</div>
              <button
                className="btn copy-btn"
                onClick={() => copyToClipboard(hashOutput)}
              >
                Copy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
