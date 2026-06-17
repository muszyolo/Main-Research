# 📊 Poster Data Analysis Flowchart

This is a **Mermaid Diagram**. It is the perfect visual to fill the large blank space in the middle of your UiTM academic poster. It visually explains to examiners and readers exactly how your data flows from the questionnaire into statistical clusters, and finally into the app intervention.

### How to use this for your poster:
1. Copy the code block below.
2. Go to the **[Mermaid Live Editor](https://mermaid.live/)** in your web browser.
3. Paste the code into the "Code" section on the left.
4. Click the **"Save"** or **"Export"** button (top right) and download it as a **PNG** or **SVG** image.
5. Insert that high-quality image directly into your poster template!

---

```mermaid
graph TD
    %% Styling for academic professional look
    classDef input fill:#1F4E79,stroke:#0B2340,stroke-width:2px,color:#FFFFFF,font-weight:bold,rx:10px,ry:10px;
    classDef analysis fill:#C55A11,stroke:#833C0C,stroke-width:2px,color:#FFFFFF,font-weight:bold,rx:10px,ry:10px;
    classDef cluster fill:#2E75B6,stroke:#1F4E79,stroke-width:2px,color:#FFFFFF,font-weight:bold,rx:10px,ry:10px;
    classDef outcome fill:#548235,stroke:#375623,stroke-width:2px,color:#FFFFFF,font-weight:bold,rx:10px,ry:10px;

    %% Nodes and Flow
    A["📄 Phase 1: Data Collection<br>(CSI-PASD Questionnaire)"]:::input --> B["🧮 Phase 2: TPB Scoring<br>(Attitude, Subjective Norm, PBC)"]:::analysis
    
    B --> C{"⚙️ Phase 3: Unsupervised Machine Learning<br>(K-Means / Latent Profile Analysis)"}:::analysis
    
    C -->|Identifies| D["🟢 Cluster 1: Attitude-Focused<br>(High intent, internal stigma)"]:::cluster
    C -->|Identifies| E["🟡 Cluster 2: Norm-Focused<br>(Driven by community pressure)"]:::cluster
    C -->|Identifies| F["🔴 Cluster 3: Control-Focused<br>(High burnout, logistical barriers)"]:::cluster
    
    D --> G["📱 Phase 4: Precision Mental Health<br>(Targeted Digital Intervention via PrismChat)"]:::outcome
    E --> G
    F --> G
```
