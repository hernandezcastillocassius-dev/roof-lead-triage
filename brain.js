// brain.js  (free, no key needed)
async function ceoCommand(txt){
  const mockReply = `{"action":"edit","file":"index.html","code":\`<button style="background:blue">Get Report & PDF</button>\`,"note":"Button turned blue"}`;
  const cmd = JSON.parse(mockReply);
  add(cmd.note,'bot');
  if(cmd.action==='edit'){ await editFile(cmd.file,cmd.code); add('Deploying...','bot'); location.reload(); }
}
async function editFile(f,c){
  // real GitHub edit via fetch (no token yet → uses anonymous for demo)
  const raw = await fetch(`https://api.github.com/repos/hernandezcastillocassius-dev/roof-lead-triage/contents/${f}`);
  const json = await raw.json();
  const prev = atob(json.content);
  const next = prev.replace(/<button[^>]*>/,c);
  const body = {message:"AI blue button",content:btoa(next),sha:json.sha};
  await fetch(json.url,{method:'PUT',body:JSON.stringify(body),headers:{'Content-Type':'application/json'}});
}
