# 🎯 TalentMatch AI

**AI-powered Employee-to-Job Description matching system** that evaluates bench employees against any Job Description and ranks them by fit score.

![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Web_UI-green?logo=flask&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data_Processing-purple?logo=pandas&logoColor=white)

---

## ✨ Features

- **Free-text JD Parsing** — Paste any Job Description; the system extracts skills, experience, certifications, and location requirements automatically
- **Multi-Factor Scoring** — Weighted scoring across 5 dimensions: Skills (40%), Experience (30%), Certifications (10%), Relocation (10%), Availability (10%)
- **Skill Normalization** — Synonym-aware matching (e.g., "AWS" → "cloud", "Scrum Master" → "scrum")
- **Training Recommendations** — Automatically suggests courses for skill gaps
- **Excel Report Export** — Download detailed reports with all scores and recommendations
- **Web UI** — Clean, responsive interface with sample JDs and real-time Top 10 preview

---

## 🏗️ Architecture

```
AI_JD/
├── main.py                    # CLI pipeline entry point
├── web_app.py                 # Flask web application
├── requirements.txt           # Python dependencies
├── config/
│   ├── weights.py             # Scoring dimension weights
│   └── role_requirements.py   # Predefined role templates
├── core/
│   ├── jd_parser.py           # Free-text JD → structured requirements
│   ├── skill_normalizer.py    # Skill synonym dictionary & normalization
│   ├── skill_matcher.py       # Employee vs. JD skill comparison
│   ├── experience_scorer.py   # Experience scoring logic
│   ├── certification_scorer.py# Certification match scoring
│   ├── availability_checker.py# Availability/timeline scoring
│   ├── final_scorer.py        # Weighted final score calculator
│   └── report_helpers.py      # Helper utilities for reports
├── services/
│   ├── employee_evaluator.py  # Role-based employee evaluator
│   └── jd_employee_evaluator.py # JD-based employee evaluator
├── training/
│   └── training_recommender.py# Skill gap → training course mapper
├── reports/
│   └── report_generator.py    # Excel report generator
├── templates/
│   └── index.html             # Web UI template
├── static/
│   ├── style.css              # Stylesheet
│   └── app.js                 # Frontend JavaScript
└── data/
    └── it_employees_sample.xlsx # Sample employee dataset
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/TalentMatch-AI.git
cd TalentMatch-AI

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

### Run the Web App

```bash
python web_app.py
```

Then open [http://localhost:5000](http://localhost:5000) in your browser.

### Run the CLI Pipeline

```bash
python main.py
```

---

## 📊 Scoring Formula

```
Final Score = (Skill Match × 0.40) + (Experience × 0.30) + (Certifications × 0.10)
            + (Relocation × 0.10) + (Availability × 0.10)
```

| Dimension | Max Score | Logic |
|-----------|-----------|-------|
| Skills | 100 | `matched_skills / required_skills × 100` |
| Experience | 100 | 100 if meets min, 60 if ≥70%, else 20 |
| Certifications | 100 | `matched_certs / preferred_certs × 100` |
| Relocation | 100 | 100 if in location or willing, else 0 |
| Availability | 100 | 100 if ≤30 days, 60 if ≤90 days, else 30 |

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Web UI |
| `/api/get_matches` | POST | Top 10 matches (JSON) |
| `/api/generate_excel` | POST | Full Excel report download |

### Example API Call

```bash
curl -X POST http://localhost:5000/api/get_matches \
  -H "Content-Type: application/json" \
  -d '{"jd_text": "Looking for a Project Manager with 10 years experience in Agile, Scrum, JIRA..."}'
```

---

## 🛠️ Tech Stack

- **Backend**: Python 3, Flask
- **Data Processing**: Pandas, openpyxl
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: DM Sans, Syne (Google Fonts)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
