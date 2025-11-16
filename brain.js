// brain.js  (real edit, no login)
async function ceoCommand(txt){
  add('Editing now...','bot');
  const repo = 'hernandezcastillocassius-dev/roof-lead-triage';
  const file = 'index.html';
  // 1. get current file
  const get = await fetch(`https://api.github.com/repos/${repo}/contents/${file}`);
  const json = await get.json();
  let content = atob(json.content);
  // 2. change button color
  const newColor = content.includes('background:green') ? 'blue' : 'green';
  content = content.replace(/background:(\w+)/, `background:${newColor}`);
  // 3. save back
  const body = {message:`AI set button ${newColor}`,content:btoa(content),sha:json.sha};
  await fetch(json.url,{method:'PUT',body:JSON.stringify(body),headers:{'Content-Type':'application/json'}});
  add('Deploying...','bot');
  // 4. trigger Netlify rebuild
  await fetch('https://api.netlify.com/build_hooks/YOUR_HOOK_ID',{method:'POST'});
  location.reload();
}
