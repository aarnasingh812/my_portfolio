const svgNS = 'http://www.w3.org/2000/svg';
const layers = [
  [[88,166],[88,237],[88,308]],
  [[192,98],[192,175],[192,252],[192,329]],
  [[302,116],[302,193],[302,270],[302,347]],
  [[414,172],[414,249]]
];
layers.slice(0,-1).forEach((layer,index) => layer.forEach((start, a) => layers[index+1].forEach((end,b) => {
  const line = document.createElementNS(svgNS,'line');
  for (const [key,value] of Object.entries({x1:start[0],y1:start[1],x2:end[0],y2:end[1]})) line.setAttribute(key,value);
  line.setAttribute('class',`network-line${(a+b+index)%3===0?' hot':''}`);
  document.querySelector('#network-lines').append(line);
})));
layers.flat().forEach(([x,y],index) => {
  const node=document.createElementNS(svgNS,'circle');
  node.setAttribute('cx',x); node.setAttribute('cy',y); node.setAttribute('r',index%3===0?9:6); node.setAttribute('class','network-node');
  const core=node.cloneNode();core.setAttribute('r',index%3===0?3:2);core.setAttribute('class','network-core');
  document.querySelector('#network-nodes').append(node,core);
});
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(item=>{item.classList.toggle('active',item===button);item.setAttribute('aria-pressed',String(item===button));});
  document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));
const concepts={
  assistant:{title:'Context-aware AI assistant',description:'Suggested showcase: an assistant that retrieves relevant information from a knowledge base, then generates answers with source context. Add your own problem statement, architecture, evaluation, and lessons learned.',tags:['Python','LLMs','RAG']},
  vision:{title:'Vision intelligence pipeline',description:'Suggested showcase: a vision workflow covering dataset preparation, model training, and inference. Include your actual dataset, evaluation approach, results, and a few example predictions.',tags:['PyTorch','OpenCV','Python']},
  api:{title:'From model to API',description:'Suggested showcase: a Python service that exposes a machine learning model through an API. Add your endpoint design, validation approach, deployment details, and repository.',tags:['FastAPI','Docker','REST']}
};
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=concepts[button.dataset.project];document.querySelector('#dialog-title').textContent=project.title;document.querySelector('#dialog-description').textContent=project.description;
  const tags=document.querySelector('#dialog-tags');tags.replaceChildren(...project.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
let toastTimeout;
document.querySelector('#contact-button').addEventListener('click',()=>{const toast=document.querySelector('#toast');toast.textContent='This is a demo contact section. Add your real email to activate direct contact.';toast.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('visible'),5000);});
