const jdEl = document.getElementById("jd");
const counterEl = document.getElementById("counter");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMsg = document.getElementById("toastMsg");
const resultsDiv = document.getElementById("results");
const downloadDiv = document.getElementById("download");

// Overlay & Toast
function showOverlay(on){ overlay.classList.toggle("show", !!on); }
function showToast(title, msg){ toastTitle.textContent=title; toastMsg.textContent=msg; toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),2600); }

// JD Counter
function updateCounter(){ counterEl.textContent = `${jdEl.value.length.toLocaleString()} chars`; }
jdEl.addEventListener("input", updateCounter); updateCounter();

// Clear / Load Samples
function clearJD(){ jdEl.value=""; updateCounter(); resultsDiv.innerHTML="Start typing to see matches..."; downloadDiv.innerHTML=""; showToast("Cleared","JD text cleared"); }
function loadSample(type){
  const samples = {
    pm: `Project Manager – 10–15 yrs, PMP, Agile/Scrum...`,
    fe: `Frontend Developer – 3–6 yrs, React/JS...`,
    devops: `DevOps Engineer – 4–8 yrs, CI/CD, AWS...`
  };
  jdEl.value=samples[type]||""; updateCounter(); showToast("Sample Loaded", `${type.toUpperCase()} JD loaded.`);
}

// Generate Excel
async function generateExcel(){
  const jdText=jdEl.value.trim();
  if(!jdText){ showToast("Missing JD","Paste Job Description first."); return; }
  showOverlay(true); showToast("Processing","Generating Excel...");
  try{
    const res = await fetch("/api/generate_excel", {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({jd_text:jdText})
    });
    if(!res.ok) throw new Error("Server error");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const now = new Date(); const name=`jd_match_report_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}.xlsx`;
    const a = document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url);
    showToast("Success","Excel downloaded");
  }catch(e){ showToast("Error",e.message); }
  finally{ showOverlay(false); }
}

// Top 10 live matching preview
let typingTimer;
jdEl.addEventListener("input",()=>{ clearTimeout(typingTimer); typingTimer=setTimeout(updateMatches,800); });
async function updateMatches(){
  const jdText=jdEl.value.trim();
  if(!jdText){ resultsDiv.innerHTML="Start typing to see matches..."; downloadDiv.innerHTML=""; return; }
  try{
    const res=await fetch("/api/get_matches",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({jd_text:jdText}) });
    const data = await res.json();
    if(!data || data.length===0){ resultsDiv.innerHTML="No matches found"; return; }

    // Table
    let html='<table class="table"><tr>';
    for(let key in data[0]) html+=`<th>${key}</th>`;
    html+='</tr>';
    data.forEach(row=>{ html+='<tr>'; for(let key in row) html+=`<td>${row[key]}</td>`; html+='</tr>'; });
    html+='</table>';
    resultsDiv.innerHTML=html;

    // Optional: Download Excel button
    const btn=document.createElement("button");
    btn.textContent="Download Excel"; btn.className="btn btn-primary"; btn.onclick=generateExcel;
    downloadDiv.innerHTML=""; downloadDiv.appendChild(btn);
  }catch(e){ resultsDiv.innerHTML="Error fetching matches"; console.error(e); }
}
