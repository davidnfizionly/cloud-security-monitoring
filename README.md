# 🛡️ Cloud Security Monitoring – Multi-Environment Threat Detection

A centralized cloud security dashboard that detects suspicious behaviors across simulated multi-account environments using AWS-native services such as CloudTrail Lake, Athena, Step Functions, and QuickSight.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Workflow Explanation](#workflow-explanation)
- [Challenges & Solutions](#challenges--solutions)
- [Lessons Learned](#lessons-learned)
- [Skills Demonstrated](#skills-demonstrated)

---

## 📖 Project Overview

**Cloud Security Monitoring** is a simulated cloud threat detection platform that mimics monitoring activities across production, staging, and development environments. It leverages AWS CloudTrail Lake to collect logs, Athena for querying, and Step Functions to automate the response workflow. Dashboards are generated with QuickSight for visual insights into user behaviors and threat patterns.

This project is aimed at **SecOps teams and cloud engineers** looking to automate detection of:

- Root user activity
- Denied API calls
- Log deletions
- Unauthorized region access
- Identity anomalies

---

## 🧠 Architecture

```
User/Attacker Action
        |
        v
CloudTrail Logs (Lake)
        |
        v
Athena Query (Suspicious Events)
        |
        v
EventBridge Trigger
        |
        v
Step Functions State Machine
     ├─ Lambda: detectSuspiciousEvents
     ├─ Lambda: scoreEventRisk
     └─ Lambda: sendSecurityAlert
        |
        v
QuickSight Dashboard
```

---

## 🧪 Technologies Used

| AWS Service           | Role in the Project |
|----------------------|---------------------|
| **CloudTrail Lake**  | Collect structured logs across environments |
| **Amazon Athena**     | Run SQL queries to detect suspicious patterns |
| **EventBridge**       | Trigger automated response workflow |
| **Step Functions**    | Orchestrate detection → scoring → alerting |
| **Lambda (x3)**       | Logic for detection, scoring, and notification |
| **QuickSight**        | Visualize threats and KPIs |
| **Secrets Manager**   | Store dummy environment credentials securely |
| **AWS Organizations** (simulated) | Represent multiple logical environments |
| **AWS KMS** (optional) | Encrypt sensitive results or logs |

---

## ⚙️ Key Features

- ✅ Multi-environment simulation: Dev, Staging, and Prod
- ✅ SQL-based threat detection (via Athena)
- ✅ Automated alert workflow using Step Functions
- ✅ Risk scoring model with customizable weights
- ✅ Dashboard analytics via QuickSight
- ✅ Secrets stored securely in AWS Secrets Manager
- ✅ Audit-ready CloudTrail logs in structured JSON

---

## 🔁 Workflow Explanation

1. **Event Injection**  
   Sample CloudTrail logs (or real ones) are streamed into CloudTrail Lake.

2. **Detection via Athena**  
   Scheduled or on-demand SQL queries identify anomalies (e.g., root login, log deletions).

3. **EventBridge Trigger**  
   When a match is found, EventBridge invokes the Step Functions workflow.

4. **Step Functions Workflow**  
   - `detectSuspiciousEvents`: extracts relevant event data  
   - `scoreEventRisk`: assigns a risk score  
   - `sendSecurityAlert`: sends/logs the alert

5. **QuickSight Dashboard**  
   Dashboards are built using Athena datasets to summarize threats by user, environment, type, etc.

---

## 🚧 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| GitHub blocked secret-containing files | Used `git-filter-repo` to remove sensitive blobs from history |
| Lack of real AWS Org | Simulated environments with metadata in DynamoDB or JSON |
| QuickSight setup required manual steps | Created templated dashboard connected to Athena views |
| Large log volume | Filtered logs by date and type for performance during tests |

---

## 🎓 Lessons Learned

- Mastered **Athena querying** on CloudTrail logs
- Gained hands-on with **Step Functions** orchestration
- Learned how to simulate **multi-account environments**
- Experienced GitHub **push protection** and how to clean history
- Developed a security-oriented architecture using **only AWS native tools**

---

## 💼 Skills Demonstrated

- AWS CloudTrail and Lake configuration
- SQL (Athena) for log analysis
- Event-driven architecture with EventBridge + Lambda
- Secure secrets handling with Secrets Manager
- Real-world alerting workflows with Step Functions
- GitHub version control + cleanup (filter-repo)
- Data visualization using QuickSight
- IAM role management and least-privilege enforcement

---

## 🧠 Future Improvements

- Add integration with **Amazon GuardDuty**
- Use **SNS or Slack** for real-time alerts
- Include **Jupyter Notebook** for ad-hoc investigation
- Connect with **AWS Security Hub** for aggregation

---

## 📸 Screenshots and Diagram

📊 See `/docs/screenshots` for:

- Architecture Diagram (PNG)
- Step Functions Workflow Graph
- QuickSight Dashboard preview
- Athena SQL examples

---

## ✅ Status

**✔️ Completed** – All core components functional  
📁 Hosted on GitHub: [cloud-security-monitoring](https://github.com/davidnfizionly/cloud-security-monitoring)