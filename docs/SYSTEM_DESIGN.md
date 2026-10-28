# System design — Sprint 5 logical model

**Status:** analysis deliverable written; no physical technology, API provider or production architecture has been selected. Source: **Combined System Requirements Document and Logical Model.docx**.

## Functional decomposition
1. 1.0 Manage User Access
2. 2.0 Retrieve Market Data
3. 3.0 Manage Watchlists
4. 4.0 Compare and Visualize Stocks
5. 5.0 Generate AI and Risk Insights
   - 5.1 Validate Analysis Request
   - 5.2 Retrieve Market Context
   - 5.3 Prepare AI Request
   - 5.4 Review AI Response
   - 5.5 Return Analysis Result

## Context diagram (no internal stores)
~~~mermaid
flowchart LR
  U[Investor / User] <--> F[0.0 FinSight]
  F <--> M[Market Data Provider]
  F <--> A[AI Analysis Service]
~~~
User sends credentials, lookup, watchlist, compare, and analysis requests and receives results. Market provider supplies quote/history; AI service exchanges prompt/context and generated explanation.

## Level 0 Data Flow Diagram
~~~mermaid
flowchart TD
  U[User] <--> P1((1.0 User Access))
  U <--> P2((2.0 Market Data))
  U <--> P3((3.0 Watchlists))
  U <--> P4((4.0 Comparison and Charts))
  U <--> P5((5.0 AI and Risk))
  P1 <--> D1[(D1 Profiles)]
  P2 <--> D2[(D2 Market Data Cache)]
  P2 <--> M[Market Data Provider]
  P3 <--> D3[(D3 Watchlists)]
  D2 --> P4
  D2 --> P5
  P5 <--> A[AI Analysis Service]
  P5 --> D4[(D4 Analysis History)]
~~~

## Level 1 of process 5.0
~~~mermaid
flowchart LR
  U[Analysis request] --> V[5.1 Validate]
  V --> C[5.2 Read Market Context]
  D2[(D2 Cache)] --> C
  C --> P[5.3 Prepare AI Request]
  P <--> A[External AI Service]
  A --> R[5.4 Review AI Response]
  R --> S[5.5 Save Reference and Return]
  S --> D4[(D4 Analysis History)]
  S --> O[User Insight]
~~~
The review checks missing information, inappropriate certainty and risk caveats. D4 may store only non-sensitive status/reference metadata.

## Functional primitive 5.1
~~~text
BEGIN ValidateAnalysisRequest
  result.status = "invalid"
  IF symbol missing OR invalid: result.message = "Enter a valid stock symbol"
  ELSE IF analysis_type unsupported: result.message = "Select a supported analysis type"
  ELSE: result.status = "valid"; result.message = "Request accepted"
  RETURN result
END
~~~

The FDD top-level names match Level 0. Level 1 balances process 5.0. These diagrams are conceptual and do not imply code or services already exist.
