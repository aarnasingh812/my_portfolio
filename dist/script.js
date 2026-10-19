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

