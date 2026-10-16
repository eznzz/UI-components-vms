/* VMS v0.6.5 — standalone SVG charts, no external dependency. */
(()=>{'use strict';
const NS='http://www.w3.org/2000/svg', months=['Май','Июн','Июл','Авг','Сен','Окт'];
const $=(id)=>document.getElementById(id);
function el(name,attrs={},txt){const n=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(txt!==undefined)n.textContent=txt;return n;}
const vals={line:[42,51,47,63,59,72],area:[28,33,30,45,49,56]};
function drawLine(id,data,fill=false,spark=false){
const parent=$(id);if(!parent)return;parent.replaceChildren();
const W=480,H=spark?110:230,L=spark?8:38,R=12,T=12,B=spark?12:36,min=0,max=80;
const theme=getComputedStyle(document.body),primary=theme.getPropertyValue('--vms-color-primary').trim()||'#24518F',muted=theme.getPropertyValue('--vms-color-muted').trim()||'#6B7280',line=theme.getPropertyValue('--vms-color-border').trim()||'#CBD5E1';
const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,'aria-hidden':'true'});
const x=i=>L+i*(W-L-R)/(data.length-1),y=v=>T+(max-v)*(H-T-B)/max;
if(!spark){[0,20,40,60,80].forEach(n=>{svg.append(el('line',{x1:L,x2:W-R,y1:y(n),y2:y(n),stroke:line,'stroke-width':1}));svg.append(el('text',{x:4,y:y(n)+4,fill:muted,'font-size':11},String(n)));});months.forEach((m,i)=>svg.append(el('text',{x:x(i),y:H-12,'text-anchor':'middle',fill:muted,'font-size':12},m)));}
const coords=data.map((n,i)=>`${x(i)},${y(n)}`).join(' ');
if(fill){const area=`M ${x(0)} ${y(0)} L ${coords.replace(/ /g,' L ')} L ${x(data.length-1)} ${y(0)} Z`;svg.append(el('path',{d:area,fill:primary,'fill-opacity':'.13'}));}
svg.append(el('polyline',{points:coords,fill:'none',stroke:primary,'stroke-width':spark?3:3,'stroke-linecap':'round','stroke-linejoin':'round'}));
if(!spark)data.forEach((n,i)=>{const dot=el('circle',{cx:x(i),cy:y(n),r:4,fill:primary,stroke:'var(--vms-color-surface)','stroke-width':2});dot.append(el('title',{},months[i]+': '+n));svg.append(dot)});
parent.append(svg);
}
function bar(){
const p=$('chart-bar');p.replaceChildren();const theme=getComputedStyle(document.body),primary=theme.getPropertyValue('--vms-color-primary').trim()||'#24518F',muted=theme.getPropertyValue('--vms-color-muted').trim()||'#6B7280',border=theme.getPropertyValue('--vms-color-border').trim()||'#CBD5E1',data=[24,38,19],labels=['Порт A','Порт B','Порт C'];
const svg=el('svg',{viewBox:'0 0 480 230','aria-hidden':'true'});
[0,10,20,30,40].forEach(v=>{const y=190-v*4;svg.append(el('line',{x1:30,x2:465,y1:y,y2:y,stroke:border}));svg.append(el('text',{x:4,y:y+4,fill:muted,'font-size':11},String(v)));});
data.forEach((v,i)=>{const x=72+i*130,y=190-v*4;const r=el('rect',{x,y,width:74,height:v*4,rx:4,fill:primary});r.append(el('title',{},labels[i]+': '+v));svg.append(r);svg.append(el('text',{x:x+37,y:211,'text-anchor':'middle',fill:muted,'font-size':12},labels[i]));svg.append(el('text',{x:x+37,y:y-7,'text-anchor':'middle',fill:primary,'font-size':12},String(v)));});p.append(svg);}
function donut(){
const p=$('chart-donut');p.replaceChildren();const theme=getComputedStyle(document.body);const colors=['--vms-status-in-transit','--vms-status-in-port','--vms-status-maintenance'].map(v=>theme.getPropertyValue(v).trim());const data=[52,28,20],names=['В пути','В порту','Обслуживание'],svg=el('svg',{viewBox:'0 0 480 230','aria-hidden':'true'});let offset=0;
data.forEach((v,i)=>{const c=el('circle',{cx:240,cy:112,r:75,fill:'none',stroke:colors[i],'stroke-width':32,'stroke-dasharray':`${v*4.71239} ${471.239-v*4.71239}`,'stroke-dashoffset':-offset*4.71239,transform:'rotate(-90 240 112)'});c.append(el('title',{},names[i]+': '+v));svg.append(c);offset+=v;});
svg.append(el('text',{x:240,y:108,'text-anchor':'middle','font-size':25,'font-weight':700,fill:theme.getPropertyValue('--vms-color-text').trim()},'100'));
svg.append(el('text',{x:240,y:130,'text-anchor':'middle','font-size':12,fill:theme.getPropertyValue('--vms-color-muted').trim()},'всего'));p.append(svg);}
function render(){drawLine('chart-line',vals.line);drawLine('chart-area',vals.area,true);drawLine('chart-sparkline',vals.line,false,true);bar();donut();}
render();
new MutationObserver(m=>{if(m.some(x=>x.attributeName==='class'))render();}).observe(document.body,{attributes:true,attributeFilter:['class']});
})();