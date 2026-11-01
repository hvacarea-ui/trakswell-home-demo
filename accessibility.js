/* Local keyboard support for the full-screen designer. No network requests. */
(()=>{
 const sessions=new WeakMap();
 function activate(container,titleId){
  if(sessions.has(container))return;
  const attributes=new Map(['role','aria-modal','aria-labelledby','tabindex'].map(name=>[name,container.getAttribute(name)]));
  const siblings=new Map();
  for(let branch=container;branch.parentElement&&branch!==document.body;branch=branch.parentElement){
   for(const sibling of branch.parentElement.children){
    if(sibling!==branch){siblings.set(sibling,sibling.inert);sibling.inert=true;}
   }
  }
  container.setAttribute('role','dialog');container.setAttribute('aria-modal','true');
  container.setAttribute('aria-labelledby',titleId);container.setAttribute('tabindex','-1');
  sessions.set(container,{attributes,siblings});
 }
 function deactivate(container){
  const session=sessions.get(container);if(!session)return;
  for(const [element,inert] of session.siblings)element.inert=inert;
  for(const [name,value] of session.attributes){if(value===null)container.removeAttribute(name);else container.setAttribute(name,value);}
  sessions.delete(container);
 }
 function tabbable(container){
  return [...container.querySelectorAll('button,a[href],input,select,textarea,summary,[tabindex]')].filter(node=>{
   if(node.tabIndex<0||node.matches(':disabled')||node.closest('[inert],[hidden]')||!node.getClientRects().length)return false;
   const style=getComputedStyle(node);if(style.visibility==='hidden'||style.visibility==='collapse')return false;
   if(node.type==='radio'&&node.name){
    const group=[...container.querySelectorAll('input[type="radio"]')].filter(r=>r.name===node.name&&r.form===node.form&&!r.disabled&&r.getClientRects().length);
    return node===(group.find(r=>r.checked)||group[0]);
   }
   return true;
  });
 }
 function trap(event,container){
  if(event.key!=='Tab'||event.defaultPrevented)return;
  const items=tabbable(container),current=document.activeElement;
  if(!items.length){event.preventDefault();container.focus();return;}
  // A programmatically focused heading is also a valid starting point.
  if(!container.contains(current)||current===container||event.shiftKey&&current===items[0]||!event.shiftKey&&current===items.at(-1)){
   event.preventDefault();(event.shiftKey?items.at(-1):items[0]).focus();
  }
 }
 window.TrakswellAccessibility={activate,deactivate,tabbable,trap};
})();
