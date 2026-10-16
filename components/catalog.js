(()=>{'use strict';const key='vms-theme';const toggle=document.getElementById('theme-toggle');const label=document.getElementById('theme-label');const status=document.getElementById('button-feedback');function theme(dark){document.body.classList.toggle('dark',dark);toggle.setAttribute('aria-pressed',String(dark));label.textContent=dark?'Светлая тема':'Тёмная тема'}let stored=null;try{stored=localStorage.getItem(key)}catch(_){}theme(stored==='dark'||(stored!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches));toggle.addEventListener('click',()=>{const d=!document.body.classList.contains('dark');theme(d);try{localStorage.setItem(key,d?'dark':'light')}catch(_){}});window.addEventListener('storage',e=>{if(e.key===key)theme(e.newValue==='dark')});document.querySelectorAll('#buttons .button:not(:disabled)').forEach(btn=>btn.addEventListener('click',()=>status.textContent='Нажата кнопка: '+btn.textContent.trim()));document.getElementById('status').addEventListener('change',e=>document.getElementById('status-preview').textContent=e.target.value?'Выбрано: '+e.target.value:'Выбор не сделан.');const check=document.getElementById('notifications');check.addEventListener('change',()=>document.getElementById('check-preview').textContent=check.checked?'Уведомления включены.':'Уведомления отключены.');const partial=document.getElementById('partial');if(partial){partial.indeterminate=true;partial.addEventListener('change',()=>{partial.indeterminate=false;});}})();

/* v0.6 Data Table — no backend, demonstrational records. */
(()=>{
'use strict';
const records=[
{name:'Aurora',imo:'9387421',status:'В пути',updated:'2026-10-10'},
{name:'Baltic Star',imo:'9283479',status:'В порту',updated:'2026-10-09'},
{name:'Northern Light',imo:'9418263',status:'Обслуживание',updated:'2026-10-07'},
{name:'Ocean Pearl',imo:'9176532',status:'В пути',updated:'2026-10-11'},
{name:'Vega',imo:'9531827',status:'В порту',updated:'2026-10-08'},
{name:'Seabird',imo:'9642138',status:'В пути',updated:'2026-10-12'},
{name:'Arctic Dawn',imo:'9003456',status:'Обслуживание',updated:'2026-10-03'},
{name:'Atlantic Hope',imo:'9127348',status:'В порту',updated:'2026-10-06'}
];
const pageSize=4,selected=new Set();let page=0,sortKey='name',sortDir=1;
const byId=id=>document.getElementById(id);
const tbody=byId('table-body'),all=byId('table-select-all');
const search=byId('table-search'),filter=byId('table-status');
const sorted=()=>{
 const term=search.value.toLocaleLowerCase('ru').trim(),status=filter.value;
 return records.filter(r=>(!status||r.status===status)&&(!term||r.name.toLocaleLowerCase('ru').includes(term)||r.imo.includes(term))).sort((a,b)=>sortDir*String(a[sortKey]).localeCompare(String(b[sortKey]),'ru'));
};
function render(){
 const rows=sorted(),pageCount=Math.max(1,Math.ceil(rows.length/pageSize));page=Math.min(page,pageCount-1);
 const visible=rows.slice(page*pageSize,(page+1)*pageSize);
 tbody.replaceChildren();
 if(!visible.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=5;td.className='table-empty';td.textContent='По вашему запросу ничего не найдено';tr.append(td);tbody.append(tr);}
 visible.forEach(row=>{
 const tr=document.createElement('tr');
 const selection=document.createElement('td');const checkbox=document.createElement('input');
 checkbox.type='checkbox';checkbox.checked=selected.has(row.imo);checkbox.setAttribute('aria-label','Выбрать судно '+row.name);
 checkbox.addEventListener('change',()=>{checkbox.checked?selected.add(row.imo):selected.delete(row.imo);render();});
 selection.append(checkbox);tr.append(selection);
 for(const key of ['name','imo','status','updated']){
  const td=document.createElement('td');
  if(key==='status'){const span=document.createElement('span');span.className='table-status-pill';span.dataset.status=row[key];span.textContent=row[key];td.append(span);}
  else td.textContent=row[key];
  tr.append(td);
 }
 tbody.append(tr);
 });
 const checked=visible.filter(r=>selected.has(r.imo)).length;
 all.checked=visible.length>0&&checked===visible.length;
 all.indeterminate=checked>0&&checked<visible.length;
 all.disabled=!visible.length;
 byId('table-page').textContent=(page+1)+' / '+pageCount;
 byId('table-summary').textContent='Показано '+visible.length+' из '+rows.length+' записей';
 byId('table-selection').textContent='Выбрано строк: '+selected.size;
 byId('table-prev').disabled=page===0;byId('table-next').disabled=page>=pageCount-1;
 document.querySelectorAll('[data-sort]').forEach(button=>{
  const active=button.dataset.sort===sortKey;
  button.setAttribute('aria-pressed',String(active));
  button.querySelector('span').textContent=active?(sortDir===1?'↑':'↓'):'↕';
  button.closest('th').setAttribute('aria-sort',active?(sortDir===1?'ascending':'descending'):'none');
 });
}
[search,filter].forEach(el=>el.addEventListener(el===search?'input':'change',()=>{page=0;render();}));
all.addEventListener('change',()=>{sorted().slice(page*pageSize,(page+1)*pageSize).forEach(r=>all.checked?selected.add(r.imo):selected.delete(r.imo));render();});
document.querySelectorAll('[data-sort]').forEach(button=>button.addEventListener('click',()=>{
 const next=button.dataset.sort;sortDir=next===sortKey?-sortDir:1;sortKey=next;page=0;render();
}));
byId('table-prev').addEventListener('click',()=>{if(page>0){page--;render();}});
byId('table-next').addEventListener('click',()=>{if((page+1)*pageSize<sorted().length){page++;render();}});
render();
})();


/* v0.6.3 Advanced components */
(()=>{
'use strict';
const tabs=[...document.querySelectorAll('.vms-tab')];
function activate(index,moveFocus=false){
 tabs.forEach((tab,i)=>{
  const active=i===index;
  tab.setAttribute('aria-selected',String(active));
  tab.tabIndex=active?0:-1;
  document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;
 });
 if(moveFocus)tabs[index].focus();
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>activate(i));
 tab.addEventListener('keydown',e=>{
  let next=null;
  if(e.key==='ArrowRight')next=(i+1)%tabs.length;
  if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
  if(e.key==='Home')next=0;
  if(e.key==='End')next=tabs.length-1;
  if(next!==null){e.preventDefault();activate(next,true);}
 });
});
const dialog=document.getElementById('demo-modal');
const open=document.getElementById('open-demo-modal');
if(dialog && open){
 open.addEventListener('click',()=>dialog.showModal());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close('cancel');});
}
const region=document.getElementById('vms-toast-region');
const texts={success:'Действие выполнено успешно.',error:'Не удалось выполнить действие.',info:'Это информационное уведомление.'};
document.querySelectorAll('[data-toast]').forEach(btn=>btn.addEventListener('click',()=>{
 const kind=btn.dataset.toast;
 const toast=document.createElement('div');toast.className='vms-toast';toast.dataset.kind=kind;
 const description=document.createElement('p');description.textContent=texts[kind];
 const close=document.createElement('button');close.type='button';close.className='vms-toast-close';close.setAttribute('aria-label','Закрыть уведомление');close.textContent='×';
 close.addEventListener('click',()=>toast.remove());
 toast.append(description,close);region.append(toast);
 setTimeout(()=>toast.remove(),7000);
}));
})();
