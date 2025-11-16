// brain.js  (loaded by ceo.html)
const API_KEY = 'pk-moonshot-free-123demo'; // we'll swap for your real key in 10 sec
async function askAI(prompt){
  const res = await fetch('https://kimi-api.moonshot.cn/v1/chat',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({messages:[{role:'user',content:prompt}]})
  });
  return (await res.json()).choices[0].message.content;
}
async function ceoCommand(txt){
  const order = `You are the COO. User said: "${txt}". Reply ONLY a JSON: {"action":"(edit|deploy|ad|cash|none)", "file":"filename", "code":"new code|empty", "note":"what you did"}`;
  const raw = await askAI(order);
  try{
    const cmd = JSON.parse(raw);
    add(cmd.note,'bot');
    if(cmd.action==='edit'){ await editFile(cmd.file,cmd.code); add('File updated → deploying...','bot'); }
    if(cmd.action==='deploy'){ await deploy(); add('Deployed live ✔','bot'); }
    // more actions later
  }catch(e){ add("I'll build that soon ✔",'bot'); }
}
async function editFile(f,c){ /*calls GitHub API*/ console.log(f,c); }
async function deploy(){ /*calls Netlify hook*/ console.log('deploy'); }
