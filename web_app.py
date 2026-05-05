# web_app.py
# Web UI + API that accepts a long JD and returns an Excel report.

from flask import Flask, render_template, request, send_file, jsonify
from services.jd_employee_evaluator import evaluate_employees_from_jd
from reports.report_generator import generate_excel_report
import os
from datetime import datetime

app = Flask(__name__)

EXCEL_PATH = "data/it_employees_sample.xlsx"


@app.route("/")
def home():
    return render_template("index.html")


# ✅ NEW ROUTE → LIVE MATCH PREVIEW (Top 10)
@app.route("/api/get_matches", methods=["POST"])
def get_matches():
    payload = request.get_json(force=True)
    jd_text = payload.get("jd_text", "").strip()

    if not jd_text:
        return jsonify({"error": "JD text is required"}), 400

    if not os.path.exists(EXCEL_PATH):
        return jsonify({"error": f"Employee Excel not found at {EXCEL_PATH}"}), 400

    df = evaluate_employees_from_jd(EXCEL_PATH, jd_text)

    if df.empty:
        return jsonify([])

    # Take Top 10 employees only
    top10 = df.head(10)

    return jsonify(top10.to_dict(orient="records"))


@app.route("/api/generate_excel", methods=["POST"])
def generate_excel():
    payload = request.get_json(force=True)
    jd_text = payload.get("jd_text", "").strip()

    if not jd_text:
        return jsonify({"error": "JD text is required"}), 400

    if not os.path.exists(EXCEL_PATH):
        return jsonify({"error": f"Employee Excel not found at {EXCEL_PATH}"}), 400

    df = evaluate_employees_from_jd(EXCEL_PATH, jd_text)

    if df.empty:
        return jsonify({"error": "No employees found in Excel."}), 400

    os.makedirs("data", exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_path = f"data/jd_match_report_{ts}.xlsx"

    generate_excel_report(df, out_path)

    return send_file(out_path, as_attachment=True, download_name=os.path.basename(out_path))


if __name__ == "__main__":
    app.run(debug=True)