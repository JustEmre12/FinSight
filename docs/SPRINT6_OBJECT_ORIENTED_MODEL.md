# Sprint 6 — Object-Oriented Modeling (FinSight)

**BCS 301W · Systems Analysis & Design · October 28, 2026**  
**Team:** Jake Pepitone, Salih (Project Manager), Asad, Henry  
**Status:** Sprint 6 logical modeling document supplied; diagrams transcribed/redrawn for a readable GitHub representation. **No executable classes, implemented APIs, formal instructor approval, or running website are evidenced.**

## 1. Purpose and scope
Sprint 6 expands the earlier Sprint 4 requirements and Sprint 5 structured logical models into an **object-oriented logical model**: objects, attributes, methods, associations, external actors, use cases, message sequences, states, and an activity. FinSight provides information for stock-market research, **not brokerage trades or personalized investment advice**.

**Original reference:** "Sprint 6- Object-Oriented Modeling.docx", dated October 28, 2026; Figures 6-10, 6-15, 6-18, 6-19, 6-20A, 6-20B, 6-21. Mermaid diagrams below are editable interpretations of those figures, **not** screenshots or proof of production code.

## 2. Objects, attributes and methods (from Sprint 6 §2)

| Object | Attributes (as named in Sprint 6) | Methods |
| --- | --- | --- |
| **User** | userID, name, email, passwordHash | register(), login(), logout() |
| **Stock** | stockID, ticker, companyName, currentPrice | getPrice(), getHistory() |
| **Watchlist** | watchlistID, userID, stockList | addStock(), removeStock(), viewStocks() |
| **MarketData** | dataID, stockID, price, timestamp | fetchData(), updateData() |
| **AIAnalysis** | analysisID, stockID, summary, status | generateAnalysis(), getAnalysis() |
| **StockComparison** | comparisonID, stockIDs, results | compareStocks(), displayResults() |

The names describe **logical responsibilities**. Their attribute types, storage, ownership rules, exact return values, multiplicities, and service design are **not** finalized in the source.

## 3. Object relationship diagram — Figure 6-10
\`\`\`mermaid
flowchart TB
  U["User"] -->|owns| W["Watchlist"]
  U -->|searches| S["Stock"]
  W -->|contains| S
  S -->|has data| MD["MarketData"]
  S -->|analyzed by| AI["AIAnalysis"]
  S -->|compared in| SC["StockComparison"]
\`\`\`
These are **logical associations only**, not foreign keys/cardinalities. User accounts own watchlists; watchlists reference Stocks; Stock uses MarketData, AIAnalysis, and StockComparison for research.

## 4. Class diagram — derived view of the §2 object table
The source document gives an **object table and Figure 6-10 relationship diagram**, but does not identify a separate fully detailed UML class diagram. This Mermaid class view transcribes those definitions to support subsequent technical design; data types and multiplicities deliberately remain unspecified.

\`\`\`mermaid
classDiagram
  class User {
    userID
    name
    email
    passwordHash
    register()
    login()
    logout()
  }
  class Stock {
    stockID
    ticker
    companyName
    currentPrice
    getPrice()
    getHistory()
  }
  class Watchlist {
    watchlistID
    userID
    stockList
    addStock()
    removeStock()
    viewStocks()
  }
  class MarketData {
    dataID
    stockID
    price
    timestamp
    fetchData()
    updateData()
  }
  class AIAnalysis {
    analysisID
    stockID
    summary
    status
    generateAnalysis()
    getAnalysis()
  }
  class StockComparison {
    comparisonID
    stockIDs
    results
    compareStocks()
    displayResults()
  }
  User --> Watchlist : owns
  User --> Stock : searches
  Watchlist --> Stock : contains
  Stock --> MarketData : has data
  Stock --> AIAnalysis : analyzed by
  Stock --> StockComparison : compared in
\`\`\`

## 5. Actors and primary use cases — Figure 6-15
**External actors**: (1) **Investor** — searches, analyzes, compares, manages watchlist; (2) **Market Data Provider** — external quote/history source; (3) **AI Service Provider** — external explanation service. These providers support FinSight and are **not additional investors**.

\`\`\`mermaid
flowchart LR
  I["Investor"] --> Search(["Search Stocks"])
  I --> Analyze(["Generate AI Analysis"])
  I --> Watch(["Manage Watchlist"])
  I --> Compare(["Compare Stocks"])
  subgraph F["FinSight System Boundary"]
    Search
    Analyze
    Watch
    Compare
  end
  M["Market Data Provider"] -.-> Search
  M -.-> Analyze
  M -.-> Compare
  A["AI Service Provider"] -.-> Analyze
\`\`\`
*The dotted provider links visualize supporting interactions described in §4; the original simple use-case figure explicitly shows the investor and four tasks, rather than detailing provider-to-use-case links.*

### UC-01 — Search for a Stock (Sprint 6 §5)
- **Actor:** Investor.
- **Precondition:** FinSight is available.
- **Trigger:** Investor enters company name or ticker.
- **Main flow:** Validate input → request stock data → show matching stock details, source and timestamp.
- **Alternative:** Invalid ticker or provider unavailable → understandable error.
- **Postcondition:** Stock details displayed when available.
- **Related:** US-01 / FR-02; US-02 / FR-03; implementation issues #37 and #38.

### UC-02 — Generate AI Market Analysis (Sprint 6 §5)
- **Actor:** Investor.
- **Precondition:** A valid stock has been selected.
- **Trigger:** Investor selects **Generate Analysis**.
- **Main flow:** Retrieve available market data → send relevant context to AI service → display explanation.
- **Alternative:** Missing market data or failed AI request → understandable error.
- **Postcondition:** Explanation with visible **AI disclosure** on success.
- **Related:** US-03 / FR-04; US-07 / FR-08; issues #39 and #43.

The source labels **Manage Watchlist** and **Compare Stocks** as use cases but does **not** provide equally detailed UC-03/UC-04 tables. Avoid presenting newly invented steps as source-provided use-case descriptions. Watchlist management requires sign-in.

## 6. Sequence diagram — Figure 6-18: Stock Search
\`\`\`mermaid
sequenceDiagram
  actor Investor
  participant FinSight
  participant Provider as Market Data Provider
  Investor->>FinSight: Enter company name / ticker (1)
  FinSight->>FinSight: Validate input
  alt Input valid
    FinSight->>Provider: Request stock data (2)
    alt Stock data available
      Provider-->>FinSight: Quotes + source + timestamp (3)
      FinSight-->>Investor: Display stock results (4)
    else Provider unavailable / no match
      FinSight-->>Investor: Display understandable error
    end
  else Input invalid
    FinSight-->>Investor: Display validation error
  end
\`\`\`

## 7. Sequence diagram — Figure 6-19: AI Analysis
\`\`\`mermaid
sequenceDiagram
  actor Investor
  participant FinSight
  participant Market as Market Data Provider
  participant AI as AI Service Provider
  Investor->>FinSight: Request AI analysis (1)
  FinSight->>Market: Request market data (2)
  alt Market data available
    Market-->>FinSight: Return market data (3)
    FinSight->>AI: Request explanation with context (4)
    alt AI succeeds
      AI-->>FinSight: Return summary (5)
      FinSight-->>Investor: Display summary + AI disclosure (6)
    else AI fails
      FinSight-->>Investor: Display service error
    end
  else Market data unavailable
    FinSight-->>Investor: Display data error
  end
\`\`\`

## 8. State transitions — Figure 6-20A: AIAnalysis
\`\`\`mermaid
stateDiagram-v2
  [*] --> Requested
  Requested --> Processing: market data available
  Requested --> Failed: data unavailable
  Processing --> Completed: AI response
  Processing --> Failed: service error
  Completed --> [*]
  Failed --> [*]
\`\`\`
**Status values:** Requested, Processing, Completed, Failed. The model does not define retry logic or background execution timing.

## 9. State transitions — Figure 6-20B: Watchlist
\`\`\`mermaid
stateDiagram-v2
  [*] --> Empty
  Empty --> Populated: add first stock
  Populated --> Populated: add/remove (still nonempty)
  Populated --> Empty: remove last stock
\`\`\`
**Status values:** Empty, Populated. Watchlist operations require an authenticated investor. In a final system, persisted count, authorization and duplicate controls need detailed design.

## 10. Activity diagram — Figure 6-21: Search + optional analysis
\`\`\`mermaid
flowchart TD
  Start(["Start"]) --> Validate["Validate stock ticker"]
  Validate --> Valid{"Valid input?"}
  Valid -->|No| Error["Display error"]
  Valid -->|Yes| Fetch["Fetch market data"]
  Fetch --> Data{"Data available?"}
  Data -->|No| Error
  Data -->|Yes| Details["Display stock information"]
  Details --> Choice{"AI analysis requested?"}
  Choice -->|No| End(["End"])
  Choice -->|Yes| AskAI["Request AI explanation"]
  AskAI --> Success{"AI available?"}
  Success -->|No| Error
  Success -->|Yes| Output["Display explanation + AI disclosure"]
  Output --> End
  Error --> End
\`\`\`
Source §11 specifies both tasks and success/error exits; no trading or automatic buy/sell branch exists.

## 11. Proposed consistency corrections — Sprint 6 §12
These are **proposed**, not confirmed applied in the original Sprint 4/5 source files:
- Preserve **FR-01 through FR-08**; require authentication for personalized watchlists; clearly label AI summaries as informational.
- Align **Investor/User**, **Market Data Provider**, and **AI Service Provider / AI Analysis Service** across the context diagram and Level 0 DFD.
- Balance named flows (search, market data, AI request/response, user insight) between context and Level 0.
- Align terminology in the data dictionary to **User, Stock, Watchlist, MarketData, AIAnalysis**. **StockComparison** is additionally identified as a Sprint 6 object.
- Preserve the Sprint 5 conceptual stores D1–D4; do not silently infer a full physical database redesign.

## 12. Recommendation and next design work — Sprint 6 §§13–15
The team **recommends conditional approval** to proceed to detailed system design; this is *not* proof approval was granted. Proposed priority: secure accounts, stock search, reliable market-data retrieval, AI explanation, and watchlist management. Stock comparison and advanced charts can follow once core functions are validated.

Before implementation, review **data-provider licensing/cost, quote freshness, AI reliability, security, and acceptance criteria**. Link changes to FR/US IDs and the related GitHub Issues. See [traceability](TRACEABILITY.md), [requirements](REQUIREMENTS.md), [test plan](TEST_PLAN.md), and [Kanban](KANBAN.md).
