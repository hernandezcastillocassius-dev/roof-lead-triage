// brain.js
const TOKEN = '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';

async function ceoCommand(txt){
  add('Working...','bot');
  const repo = 'hernandezcastillocassius-dev/roof-lead-triage';
  const file = 'index.html';

  // 1. get current file
  const get = await fetch(`https://api.github.com/repos/${repo}/contents/${file}`);
  const json = await get.json();
  let content = atob(json.content);

  // 2. toggle button color
  const newColor = content.includes('background:green') ? 'blue' : 'green';
  content = content.replace(/background:(\w+)/, `background:${newColor}`);

  // 3. save back
  const body = {message:`AI set button ${newColor}`,content:btoa(content),sha:json.sha};
  await fetch(json.url,{
     method:'PUT',
     body:JSON.stringify(body),
     headers:{
       'Content-Type':'application/json',
       'Authorization':'token ' + TOKEN
     }
  });

  add('Deploying...','bot');
  location.reload();      // instant visual check
}
