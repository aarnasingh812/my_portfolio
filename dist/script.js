const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const concepts={
  studentperformance:{title:'Student Performance Predictor',github:'https://github.com/aarnasingh812/Student_Performance_Predictor',description:'Student Academic Performance Predictor is a machine learning web application that predicts students’  scores using demographic and academic data. Built with a modular ML pipeline, the project automates data ingestion, preprocessing, model training, and evaluation using multiple regression algorithms and hyperparameter tuning. The application provides predictions through a Flask-based web interface and includes Docker containerization and AWS Elastic Beanstalk deployment configurations, demonstrating an end-to-end machine learning workflow from raw data to production deployment.',tags:[]},
  sentiment:{title:'Sentiment Analysis',github:'https://github.com/aarnasingh812/Sentiment_Analysis---NLP',description:'Sentiment Analysis is a machine learning project that analyzes public opinions about the tournament by classifying tweets into positive, negative, and neutral sentiments. Using Natural Language Processing (NLP), the project preprocesses tweet text through stopword removal, text cleaning, stemming, and tokenization before converting it into numerical features using TF-IDF vectorization. A Linear Support Vector Classifier (Linear SVC) is trained and evaluated on a dataset of 22,524 tweets. The project demonstrates an end-to-end text classification workflow, from raw text preprocessing to model evaluation.',tags:[]},
  prlens:{title:'PR Lens',github:'https://github.com/aarnasingh812/PRLens---AI_Powered_PR_Analysis_Service',description:'PRLens is an AI-powered code review service that automatically analyzes GitHub pull requests to identify potential bugs, performance bottlenecks, coding style issues, and violations of best practices. Built with FastAPI, Celery, and Redis, it processes code reviews asynchronously using Groq-hosted LLMs, allowing long-running analysis tasks to execute without blocking API requests. The service retrieves changed files directly from GitHub and returns structured findings with line references, issue descriptions, and actionable improvement suggestions, helping developers streamline code reviews and improve code quality.',tags:[]},
  docchat:{title:'DocChat AI',github:'https://github.com/aarnasingh812/DocChat-AI',description:'DocChat AI is an AI-powered document intelligence platform that enables users to upload PDF documents and interact with their contents through natural, conversational queries. Built using Retrieval-Augmented Generation (RAG), hybrid search, and OCR, it delivers context-aware answers with page-specific source citations, making document research faster and more efficient. Designed with modular architecture, the platform can serve as a foundation for organizations seeking self-hosted document intelligence solutions, helping them maintain greater control over sensitive documents and reduce reliance on third-party document-chat platforms.',tags:['']},
  claimweave:{title:'ClaimWeave',github:'https://github.com/aarnasingh812/ClaimWeave-AI',description:'ClaimWeave is an AI-powered health insurance claim preparation platform that helps policyholders simplify the reimbursement process by organizing hospital bills, discharge summaries, payment receipts, and policy documents into a structured submission package. It combines OCR, AI-based data extraction, and rule-based validation to identify missing documents, detect inconsistencies, cross-check financial details, and pre-fill official insurer claim forms. By generating a comprehensive, audit-ready submission pack with document checklists and source references, ClaimWeave AI reduces manual paperwork, minimizes common preparation errors, and makes claim preparation faster and more reliable.',tags:[]},
  finance:{title:'Finance Buddy',github:'https://github.com/aarnasingh812/FinanceBuddy',description:'Finance Buddy is an AI-powered personal finance platform that helps users take control of their finances by tracking income, expenses, and savings goals in one place. It analyzes spending patterns to detect unusual transactions, forecasts savings progress, and generates personalized, AI-driven recommendations to help users reduce unnecessary expenses, make informed financial decisions, and achieve their financial goals more effectively.',tags:[]},
  assistant:{title:'Context-aware AI assistant',description:'Suggested showcase: an assistant that retrieves relevant information from a knowledge base, then generates answers with source context. Add your own problem statement, architecture, evaluation, and lessons learned.',tags:['Python','LLMs','RAG']},
  vision:{title:'Vision intelligence pipeline',description:'Suggested showcase: a vision workflow covering dataset preparation, model training, and inference. Include your actual dataset, evaluation approach, results, and a few example predictions.',tags:['PyTorch','OpenCV','Python']},
  api:{title:'From model to API',description:'Suggested showcase: a Python service that exposes a machine learning model through an API. Add your endpoint design, validation approach, deployment details, and repository.',tags:['FastAPI','Docker','REST']}
};
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=concepts[button.dataset.project];document.querySelector('#dialog-title').textContent=project.title;document.querySelector('#dialog-description').textContent=project.description;
  const details={studentperformance:{category:'Machine Learning',tags:['Python','Flask','Scikit-learn','Pandas','NumPy','XGBoost','CatBoost','Machine Learning','Regression','GridSearchCV','Docker']},sentiment:{category:'Natural Language Processing',tags:['Python','Machine Learning','NLP','NLTK','Scikit-learn','Pandas','NumPy','TF-IDF','Linear SVM']},prlens:{category:'AI-Powered Tool',tags:['Python','FastAPI','Celery','Redis','LLMs','GitHub REST API','Pydantic','Asynchronous Processing']},docchat:{category:'Retrieval Augmented Generation',tags:['FastAPI','RAG','LLMs','PostgreSQL','PGVector','Hybrid Search','OCR']},claimweave:{category:'Agentic AI',tags:['FastAPI','Python','PostgreSQL','Google Gemini','LangGraph','OCR','PyMuPDF']},finance:{category:'Web Application',tags:['Django Rest Framework','MySQL','Celery','Redis','Statistical Models','LLM Integration','Asynchronous Processing','Vue3', 'Docker']}}[button.dataset.project] || {category:'Featured Project',tags:project.tags};
  document.querySelector('#dialog-category').textContent=details.category;
  const tags=document.querySelector('#dialog-tags');tags.replaceChildren(...details.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));
  document.querySelector('.dialog-stack-heading').hidden=details.tags.length===0;
  tags.hidden=details.tags.length===0;
  const actions=document.querySelector('#dialog-actions');actions.replaceChildren();
  for(const [label,url] of [['GitHub',project.github],['Live Site',project.live]]){if(url){const link=document.createElement('a');link.className='button '+(label==='GitHub'?'primary':'secondary');link.textContent=label+' ↗';link.href=url;link.target='_blank';link.rel='noopener noreferrer';actions.append(link);}}
  if(!project.github){const github=document.createElement('button');github.type='button';github.className='button primary';github.textContent='GitHub ↗';github.disabled=true;github.title='Repository link to be added';actions.prepend(github);const note=document.createElement('span');note.className='repository-pending';note.textContent='Repository link to be added';actions.append(note);}
  actions.classList.add('social-links');
  const githubButton=actions.querySelector('.primary');
  if(githubButton){githubButton.className='social-button social-button-featured';githubButton.replaceChildren(document.querySelector('#contact .social-button-featured svg').cloneNode(true),document.createTextNode('GitHub'));}
  actions.hidden=!actions.childElementCount;
  dialog.showModal();
  document.body.classList.add('project-modal-open');
}));
dialog.addEventListener('close',()=>document.body.classList.remove('project-modal-open'));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});

// Observe the stationary panel so the sliding card cannot retrigger itself.
const githubPanel = document.querySelector('.about-github');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (githubPanel && 'IntersectionObserver' in window) {
  const revealGithub = () => {
    githubPanel.classList.add('is-revealed');
  };
  const githubObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.15) revealGithub();
      else if (!entry.isIntersecting && !githubPanel.contains(document.activeElement)) {
        githubPanel.classList.remove('is-revealed');
      }
    }
  }, { threshold: [0, 0.15] });
  githubObserver.observe(githubPanel);
  githubPanel.classList.add('reveal-ready');
  githubPanel.addEventListener('focusin', revealGithub);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) revealGithub();
  });
}


const projectTrack = document.querySelector('#project-track');
const projectScrollButtons = document.querySelectorAll('[data-project-scroll]');
if (projectTrack) {
  const updateProjectScroll = () => {
    const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
    projectScrollButtons.forEach(button => {
      button.disabled = Number(button.dataset.projectScroll) < 0
        ? projectTrack.scrollLeft <= 1
        : projectTrack.scrollLeft >= maxScroll - 1;
    });
  };
  projectScrollButtons.forEach(button => button.addEventListener('click', () => {
    const card = projectTrack.querySelector('.project-card');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(projectTrack).columnGap);
    projectTrack.scrollBy({ left: Number(button.dataset.projectScroll) * step });
  }));
  projectTrack.addEventListener('scroll', updateProjectScroll, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(updateProjectScroll).observe(projectTrack);
  else window.addEventListener('resize', updateProjectScroll);
  updateProjectScroll();
}

// A vertical stack: one readable certificate, with the others tucked behind it.
const certificateGallery = document.querySelector('.certificate-gallery');
if (certificateGallery) {
  const cards = [...certificateGallery.querySelectorAll('.certificate-card')];
  let active = 0;
  let hovered = false;
  let focused = false;
  let visible = false;
  let timer = null;
  let lastStep = 0;
  let touchStartY = null;
  const render = () => {
    cards.forEach((card, index) => {
      const offset = (index - active + cards.length) % cards.length;
      card.dataset.position = offset === 0 ? 'front' : offset === 1 ? 'below' : 'above';
      card.tabIndex = offset === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', String(offset !== 0));
    });
  };
  const stop = () => { clearTimeout(timer); timer = null; };
  const schedule = () => {
    stop();
    if (cards.length > 1 && visible && !hovered && !focused && !reducedMotion.matches && !document.hidden) {
      timer = setTimeout(() => { active = (active + 1) % cards.length; render(); schedule(); }, 2000);
    }
  };
  const step = direction => {
    if (cards.length < 2 || performance.now() - lastStep < 850) return;
    lastStep = performance.now();
    active = (active + direction + cards.length) % cards.length;
    render();
    schedule();
  };
  certificateGallery.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  certificateGallery.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  certificateGallery.addEventListener('focusin', () => { focused = true; schedule(); });
  certificateGallery.addEventListener('focusout', event => {
    focused = certificateGallery.contains(event.relatedTarget);
    schedule();
  });
  certificateGallery.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      const cardFocused = cards.includes(document.activeElement);
      step(event.key === 'ArrowDown' ? 1 : -1);
      if (cardFocused) cards[active].focus({ preventScroll: true });
    }
  });
  certificateGallery.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) < 10 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();
    step(event.deltaY > 0 ? 1 : -1);
  }, { passive: false });
  certificateGallery.addEventListener('touchstart', event => { touchStartY = event.touches[0].clientY; stop(); }, { passive: true });
  certificateGallery.addEventListener('touchend', event => {
    if (touchStartY !== null) {
      const distance = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(distance) > 35) step(distance > 0 ? 1 : -1);
    }
    touchStartY = null;
    schedule();
  }, { passive: true });
  certificateGallery.addEventListener('touchcancel', () => { touchStartY = null; schedule(); }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(certificateGallery);
  } else { visible = true; }
  render();
  certificateGallery.classList.add('certificate-stack');
  schedule();
}
