# SmartHire-AI-SOA
### Job Recommendation as a Service Using Service-Oriented Architecture
<p align="center">
  <b>One Intelligent Matching Service. Multiple Recruitment Platforms. Smarter Job Recommendations.</b>
</p>

## 1. Project Overview

SmartHire-AI-SOA is a proposed AI-powered job recommendation service designed using **Service-Oriented Architecture (SOA)**.

The objective is to develop a centralized and reusable job-matching service that can be integrated into multiple recruitment platforms such as LinkedIn, Naukri, and Unstop.

Every recruitment platform maintains its own candidate database containing information such as resumes, technical skills, educational qualifications, work experience, certifications, and career interests.

Instead of developing individual matching algorithms, these platforms can consume the SmartHire-AI service through standardized REST APIs.

The service evaluates candidate profiles against job descriptions, calculates compatibility scores, and generates ranked recommendations from highest to lowest suitability.

**Core Concept:** Providing intelligent candidate-job matching as a reusable service that can be consumed by different external applications.

## 2. Problem Statement

Recruitment platforms need efficient mechanisms to connect suitable candidates with relevant job opportunities.

Developing separate recommendation systems for every platform can lead to:

- Duplication of matching algorithms.
- Increased development and maintenance costs.
- Limited interoperability between applications.
- Inconsistent candidate evaluation methods.
- Difficulty integrating intelligent recommendation capabilities into existing systems.

SmartHire-AI addresses this architectural challenge through a centralized service that provides reusable candidate-job matching functionality.

## 3. Proposed Solution

SmartHire-AI acts as an independent service provider that exposes candidate-job matching functionality through RESTful APIs.

External recruitment applications can submit candidate information and job descriptions to the service.

The matching engine evaluates candidate profiles using multiple parameters and generates a ranked list of suitable candidates.

The service is designed to operate independently of individual recruitment platforms.

### Example Use Case

Consider a company hiring a Java Full Stack Developer.

**Job Requirements:**
- Java
- Spring Boot
- React
- SQL
- Relevant experience

Different recruitment platforms can submit their candidate profiles to SmartHire-AI.

The service evaluates each candidate and returns ranked recommendations.

| Candidate | Matching Score | Rank |
|---|---:|---:|
| Candidate A | 96% | 1 |
| Candidate B | 91% | 2 |
| Candidate C | 85% | 3 |
| Candidate D | 78% | 4 |

*Illustrative results representing the proposed matching workflow.*

The consuming application can display these recommendations to recruiters or job seekers.

## 4. System Architecture

The proposed system consists of three major layers.

### A. Service Consumer Layer

Multiple recruitment applications act as service consumers.

**LinkedIn**
- Professional information.
- Technical skills.
- Work experience.
- Career interests.

**Naukri**
- Candidate resumes.
- Employment information.
- Technical qualifications.
- Job preferences.

**Unstop**
- Student profiles.
- Academic information.
- Technical skills.
- Career interests.

Each platform can communicate with SmartHire-AI through standardized API requests, subject to appropriate authorization and data-sharing permissions.

### B. Service Provider Layer

SmartHire-AI acts as the centralized service provider.

Its responsibilities include:

- Receiving candidate profile information.
- Processing job descriptions.
- Extracting and normalizing skills.
- Evaluating candidate suitability.
- Calculating weighted compatibility scores.
- Generating ranked recommendations.
- Returning results to consuming applications.

### C. Matching Engine Layer

The matching engine contains reusable evaluation components:

1. Job Description Parser
2. Skill Normalization
3. Skill Matching
4. Experience Evaluation
5. Certification Evaluation
6. Interest and Preference Matching
7. Final Weighted Scoring Engine

## 5. Service-Oriented Architecture Principles

The proposed system follows these SOA principles:

| SOA Principle | Application in SmartHire-AI |
|---|---|
| Loose Coupling | External platforms communicate without depending on internal matching logic. |
| Reusability | The same matching service can support multiple recruitment applications. |
| Interoperability | Applications communicate through standard HTTP and JSON formats. |
| Service Contract | REST API endpoints define the communication interface. |
| Service Autonomy | Matching functionality is independent of individual consuming platforms. |
| Discoverability | API documentation describes available service operations. |

**Architecture Objective:** A single centralized matching service can be consumed by multiple independent applications.

## 6. Candidate Matching Methodology

The proposed matching engine evaluates candidates using a weighted scoring approach.

| Matching Parameter | Weight |
|---|---:|
| Technical Skill Matching | 40% |
| Experience Matching | 25% |
| Career Interests and Role Preferences | 15% |
| Certifications | 10% |
| Location Preference | 10% |
| **Total** | **100%** |

### Weighted Scoring Formula

Final Compatibility Score =

(0.40 × Skill Score) +

(0.25 × Experience Score) +

(0.15 × Interest Score) +

(0.10 × Certification Score) +

(0.10 × Location Score)

Each parameter is normalized between 0 and 100.

The final scores are used to rank candidates in descending order of compatibility.

## 7. Service Communication and API Design

The proposed service exposes RESTful endpoints for communication with external recruitment applications.

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/candidates` | Submit candidate profile information. |
| POST | `/api/jobs` | Submit job description information. |
| POST | `/api/match` | Evaluate candidate-job compatibility. |
| POST | `/api/recommendations` | Generate ranked candidate recommendations. |
| GET | `/api/health` | Check service availability. |

### Sample Candidate Request

```json
{
  "candidate_id": "C101",
  "skills": ["Java", "Spring Boot", "React", "SQL"],
  "experience": 1,
  "certifications": ["AWS Cloud Practitioner"],
  "interests": ["Backend Development"],
  "preferred_location": "Chennai",
  "preferred_role": "Java Developer"
}
```

### Sample Job Description Request

```json
{
  "job_id": "J101",
  "title": "Java Full Stack Developer",
  "required_skills": ["Java", "Spring Boot", "React", "SQL"],
  "min_experience": 1,
  "location": "Chennai"
}
```

### Sample Service Response

```json
{
  "job_id": "J101",
  "recommendations": [
    {
      "candidate_id": "C101",
      "match_score": 96,
      "rank": 1
    },
    {
      "candidate_id": "C102",
      "match_score": 89,
      "rank": 2
    }
  ]
}
```

*The above endpoints and JSON payloads describe the proposed service interface, not a claim that every endpoint is currently implemented.*

## 8. Technology Stack

| Category | Technology |
|---|---|
| Programming Language | Python |
| Backend Framework | Flask |
| API Communication | REST APIs |
| Data Exchange | JSON |
| Matching Methodology | Weighted Scoring |
| Data Processing | Pandas, NumPy |
| Frontend | HTML, CSS, JavaScript |
| API Testing | Postman |
| Version Control | Git and GitHub |

## 9. Proposed Service Workflow

1. An external recruitment platform collects candidate information through its application.
2. The platform submits authorized candidate data to the SmartHire-AI service.
3. The service receives the candidate profiles and job description.
4. The job description parser extracts the required skills and experience.
5. The matching engine evaluates candidate profiles against job requirements.
6. The weighted scoring mechanism calculates compatibility scores.
7. Candidates are ranked from highest to lowest matching score.
8. The service returns the recommendations to the consuming application.
9. The external application displays relevant candidate recommendations.

## 10. Advantages

- Reusable matching functionality across multiple applications.
- Reduced duplication of recommendation logic.
- Centralized candidate evaluation.
- Standardized API-based communication.
- Platform-independent service design.
- Scalable architecture for future recruitment integrations.
- Flexible integration with different candidate data sources.

## 11. Future Enhancements

- Integration with actual recruitment platforms through authorized APIs.
- OAuth 2.0 authentication and secure service communication.
- Automated resume parsing and information extraction.
- Advanced semantic matching using NLP and machine learning.
- Personalized job recommendations based on candidate interests.
- Recruiter dashboards with candidate ranking and analytics.
- Cloud deployment for scalable service consumption.

## 12. Conclusion

SmartHire-AI-SOA presents a reusable job recommendation service based on Service-Oriented Architecture.

By separating candidate-job matching functionality from individual recruitment applications, the proposed architecture enables multiple platforms to consume a centralized intelligent matching service through standardized REST APIs.

The system provides an architectural foundation for building interoperable, reusable, and scalable recruitment solutions.

**SmartHire-AI – One Matching Engine, Multiple Recruitment Platforms, Smarter Recommendations.**

---

## Project Information

| Attribute | Details |
|---|---|
| Project Name | SmartHire-AI-SOA |
| Domain | Service-Oriented Architecture |
| Application Area | Recruitment and Job Recommendations |
| Backend | Python Flask |
| Communication | REST APIs |
| Data Format | JSON |
| Version Control | GitHub |

## Team Members

1. Nanditha
2. Tanikasri
3. Shibani

**Academic Project – Service-Oriented Architecture**
