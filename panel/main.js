(()=>{var X="openchamber.sdk",I=1;var v_=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function pT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(D)=>{let V=D.target===_?E:D.target;if(!(V instanceof Element))return;if(!V.hasAttribute("data-oc-scrolling"))V.setAttribute("data-oc-scrolling","");let Q=O.get(V);if(Q!==void 0)clearTimeout(Q);O.set(V,setTimeout(()=>{O.delete(V),V.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var yS=`(${pT.toString()})(document);`;var u_=128,l_=65536;var W_=128;var P_=65536;var nT=/^[a-z][a-z0-9-]{0,39}$/;var vT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),uT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,lT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,oT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!vT(O)||!nT.test(O.id)||!uT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!n_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!n_(O,["kind","id","label","value","options","disabled"]))return!1;if(!lT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let D=new Set;for(let V of O.options){if(!vT(V)||!n_(V,["value","label"])||!lT(V.value)||!uT(V.label)||D.has(V.value))return!1;D.add(V.value)}if(!D.has(O.value))return!1}return!0};var aT=["{id}","{segment}","{segments+}"];var XE=new Set(aT);var iT=["turn-finished","turn-failed","permission-asked","question-asked"];var VE=new Set(iT);var $_=20000000,L_=256;var o_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,rT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var sT=/^[A-Za-z0-9_-]{1,80}$/;var tT=["left","right","top","bottom"];var eT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let D=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let V of D)if(!eT(V,E+1,O))return!1;return!0},a_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(a_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(a_)}return String(_)===_||Number.isFinite(_)},i_=(_)=>{try{if(String(_.id)!==_.id||!sT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!tT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!eT(_.data)||!a_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var TS=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var SS=/^[0-9a-f]{7,64}$/i,e_=(_)=>SS.test(_),k_=500,Y_=32000,ES=16000,OS=128,US=200,AS=2000,MS=16000,RS=80,CS=200,GS=16000;var DS=2000;var _T=20000,z_=1024,Q_=2000000;var Z_=64000,F_=8000,TT=4000;var ST=960000;var XS=999,IS=1e4,R_=500,VS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],fS=["stopped","starting","ready","failed"],hS=new Set(VS),NS=(_)=>hS.has(_),WS=(_)=>_&&NS(_)?_:"HOST_REJECTED",i=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(i);if(Object(_)===_)return Object.values(_).every(i);return!1},PS=(_)=>i(_)&&JSON.stringify(_).length<=GS,_S=(_)=>_?.trim().slice(0,CS)??"",r=(_)=>{let E=_.id.trim().slice(0,OS),O=_.title.trim().slice(0,US),D=_.url.trim().slice(0,AS),V=_.text?.trim().slice(0,MS),Q=_.author?.trim().slice(0,RS),g=_.kind==="pull"?"pull":"issue",w={providerId:_.providerId.trim(),id:E,title:O||E,url:D,kind:g};if(V)w.text=V;if(Q)w.author=Q;if(g==="pull"){let c=_S(_.branches?.head),d=_S(_.branches?.base);if(c&&d)w.branches={head:c,base:d}}if(PS(_.data))w.data=_.data;return w},ET=(_)=>{let E=r(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,ES)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(XS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(IS,Math.max(0,Math.ceil(_)))};var s=(_)=>_.length>0&&_.length<=z_&&!_.includes("\x00")&&!_.includes("\\");var J_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>DS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},mS=new Set(fS),MT=(_)=>Boolean(_&&"status"in _&&mS.has(String(_.status))&&!("body"in _)),B_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),gS=new Set(TS),DT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&gS.has(String(_.kind))&&Number.isFinite(_.size)),XT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),cS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),dS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,pS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:X,v:I,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:X,v:I,type:"result",id:_.id,ok:!1,error:_.error,code:WS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=dS(_);if(!E||E.channel!==X||E.v!==I)return null;if(E.type==="result")return pS(E);if(!cS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var $S=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),vS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var LS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),K_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${z_} characters without NUL or backslash.`)),j_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),D=_.requestTimeoutMs??_T,V=new Set,Q=new Set,g=new Set,w=new Set,c=new Set,d=new Set,T_=new Set,G_=new Set,D_=new Set,l=new Set,m_=[],S_=null,E_=null,X_=new Set,I_=new Set,O_=null,U_=null,g_=!1,n=new Map,o=new Map,a=new Map,H=!1,C={value:0},R=null,y=null,A_=!1,M_=!1,jT=null,xT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},j=(T)=>{E.parent.postMessage(T,"*")},wT=()=>{if(H||E.parent===E||l.size===0||R?.features?.lateGenerateResults!==!0)return;j({channel:X,v:I,type:"generate-late-listen"})},L=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},bT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let A=o.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="shells"){let A=a.get(S.payload.subscriptionId);if(A)L([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,y=xT(S.payload.session),L(V,S.payload),L(Q,S.payload.directory),L(g,S.payload.session),y)L(w,y);L(c,S.payload.connection),L(d,S.payload.settings),L(T_,S.payload.item),wT();return}if(S.type==="generate-late"){if(l.size===0)m_.push(S.payload);else L(l,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};L(Q,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)y=null;else if(y?.sessionId!==S.payload.session.id)y=xT(S.payload.session);L(g,S.payload.session);return}if(S.type==="session-lifecycle"){y=S.payload,L(w,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};L(c,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};L(d,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};L(T_,S.payload.item);return}if(S.type==="status-control-event"){L(G_,S.payload);return}if(S.type==="popover-closed"){L(D_,S.payload);return}if(S.type==="action"){let A=(f)=>{if(!H)j({channel:X,v:I,type:"action-result",id:S.id,payload:f})},N=E_;if(!N){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>N(S.payload)).then(()=>A({ok:!0}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({ok:!1,error:(z||"Action failed.").slice(0,R_)})});return}if(S.type==="file-open"){let A=S.payload;if(U_&&rT(U_,A))return;U_=A,L(X_,S.payload);return}if(S.type==="file-saved"){L(I_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(z)=>{if(!H)j({channel:X,v:I,type:"file-snapshot-result",id:S.id,payload:z})},N=(z)=>A({error:(z.trim()||"Could not read the edited file.").slice(0,R_)}),f=O_;if(!f){N("This extension does not edit files.");return}Promise.resolve().then(()=>f(S.payload.purpose)).then((z)=>{if(o_(z)>$_){N(`The file is over ${$_} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>L_){N(`The snapshot version is over ${L_} characters.`);return}A({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},(z)=>N(z instanceof Error?z.message:String(z)));return}if(S.type==="resolve"){let A=(f)=>{j({channel:X,v:I,type:"resolve-result",id:S.id,payload:f})},N=S_;if(!N){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>N(S.payload)).then((f)=>A({item:f?r(f):null}),(f)=>{let z=(f instanceof Error?f.message:String(f)).trim();A({error:(z||"Command failed.").slice(0,R_)})});return}let U=n.get(S.id);if(!U)return;if(clearTimeout(U.timer),n.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",bT),j({channel:X,v:I,type:"hello"});let Z=(T,S=D)=>{if(H||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let N=setTimeout(()=>{n.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);n.set(T.id,{resolve:U,reject:A,timer:N}),j(T)})},k=(T)=>Z(T).then(()=>{return}),Y={channel:X,v:I},c_=(T)=>{if(!H&&E.parent!==E)j(T)},HT=()=>c_({...Y,type:"file-save"}),yT=(T)=>{if(!$S(T)||!vS(T))return;T.preventDefault(),HT()},qT=(T)=>{if(!$S(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),cT(R.popover.id,"escape").catch(()=>{return})},V_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=A_||M_;if(jT===S)return;jT=S,dT(T.id,S).catch(()=>{return})},f_=()=>{if(R?.surface!=="popover"||A_)return;A_=!0,V_()},hT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!A_)return;A_=!1,V_()},mT=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,V_()},gT=()=>{if(R?.surface!=="popover"||!M_)return;M_=!1,V_()},b=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")b(T.projectId);let S=await Z({...Y,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")b(T.projectId);let U=G(C);o.set(U,S);try{await k({...Y,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(o.delete(U),!H)j({...Y,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!o.delete(U)||H)return;j({...Y,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},HS=async(T,S)=>{if(T.kind==="session")b(T.sessionId);if(T.kind==="project")b(T.projectId);let U=G(C);a.set(U,S);try{await k({...Y,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(a.delete(U),!H)j({...Y,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!a.delete(U)||H)return;j({...Y,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},N_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!i(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await Z({...Y,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},cT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...Y,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),dT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):k({...Y,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",qT,!0),E.addEventListener("pointerover",f_),E.addEventListener("pointermove",f_),E.addEventListener("pointerout",hT),E.addEventListener("focus",mT),E.addEventListener("blur",gT),{onAction:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>HS(T,S),readShellOutput:async(T,S)=>{b(T,W_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>P_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${P_}.`);let f=await Z({...Y,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!f||typeof f.output!=="string"||!Number.isFinite(f.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return f},stopShell:async(T)=>{if(b(T,W_),(await Z({...Y,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{b(T),await k({...Y,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=j_(S),A={op:"get",key:T};if(U)A.scope=U;let N=await N_(A);return N.op==="get"&&N.found?N.value:void 0},set:async(T,S,U)=>{let A=j_(U),N={op:"set",key:T,value:S};if(A)N.scope=A;await N_(N)},delete:async(T,S)=>{let U=j_(S),A={op:"delete",key:T};if(U)A.scope=U;await N_(A)},keys:async(T)=>{let S=j_(T),U={op:"keys"};if(S)U.scope=S;let A=await N_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(V.add(T),R)T(R);return()=>{V.delete(T)}},onDirectory:(T)=>{if(Q.add(T),R)T(R.directory);return()=>{Q.delete(T)}},onSession:(T)=>{if(g.add(T),R)T(R.session);return()=>{g.delete(T)}},onSessionLifecycle:(T)=>{if(w.add(T),y)T(y);return()=>{w.delete(T)}},onConnection:(T)=>{if(c.add(T),R)T(R.connection);return()=>{c.delete(T)}},onSettings:(T)=>{if(d.add(T),R)T(R.settings);return()=>{d.delete(T)}},onItem:(T)=>{if(T_.add(T),R)T(R.item);return()=>{T_.delete(T)}},onStatusControl:(T)=>{return G_.add(T),()=>{G_.delete(T)}},onPopoverClosed:(T)=>{return D_.add(T),()=>{D_.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!oT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...Y,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!i_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...Y,type:"popover-open",id:G(C),payload:T})},closePopover:cT,setPopoverAnchorActive:dT,onResolve:(T)=>{return S_=T,()=>{if(S_===T)S_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>k_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${k_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>Y_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${Y_} characters.`));return k({channel:X,v:I,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>k({channel:X,v:I,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>e_(T)?k({channel:X,v:I,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>k({channel:X,v:I,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>k({channel:X,v:I,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>k({channel:X,v:I,type:"compose",id:G(C),payload:T}),attach:(T)=>k({channel:X,v:I,type:"attach",id:G(C),payload:r(T)}),startSession:async(T)=>{if(T.projectId!==void 0)b(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")b(S.directory);else{if(S.name!==void 0)b(S.name,200);if(S.baseBranch!==void 0)b(S.baseBranch,200)}let U=await Z({channel:X,v:I,type:"start-session",id:G(C),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>Z({channel:X,v:I,type:"prompt",id:G(C),payload:OT(T)}).then((S)=>{if(!t_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>k({channel:X,v:I,type:"session-link",id:G(C),payload:r(T)}),close:()=>k({channel:X,v:I,type:"close",id:G(C)}),oauthStart:()=>k({channel:X,v:I,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>k({channel:X,v:I,type:"oauth-disconnect",id:G(C)}),request:(T)=>(J_(T.path)?Z({channel:X,v:I,type:"request",id:G(C),payload:T}):LS()).then((S)=>{if(!B_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(J_(T.path)?Z({channel:X,v:I,type:"service-request",id:G(C),payload:T}):LS()).then((S)=>{if(!B_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>Z({channel:X,v:I,type:"service-status",id:G(C)}).then((T)=>{if(!MT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(s(T)?Z({channel:X,v:I,type:"file-read",id:G(C),payload:{path:T}}):K_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!s(T))return K_();if(S.length>Q_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${Q_} characters.`));return Z({channel:X,v:I,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!CT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(s(T)?Z({channel:X,v:I,type:"file-list",id:G(C),payload:{path:T}}):K_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(s(T)?Z({channel:X,v:I,type:"file-stat",id:G(C),payload:{path:T}}):K_()).then((S)=>{if(!DT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>Z_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${Z_} characters.`));if(U!==void 0&&(U.length===0||U.length>F_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${F_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let N={prompt:S};if(U!==void 0)N.system=U;if(A!==void 0)N.maxOutputTokens=A;return Z({channel:X,v:I,type:"generate",id:G(C),payload:N},_.requestTimeoutMs??ST).then((f)=>{if(!XT(f))throw new M("HOST_REJECTED","Host did not return generated text.");return f})},onLateGenerateResult:(T)=>{l.add(T);for(let S of m_.splice(0))L([T],S);return wT(),()=>{l.delete(T)}},setBadge:(T)=>k({channel:X,v:I,type:"badge",id:G(C),payload:{count:UT(T)}}),setHeight:(T)=>k({channel:X,v:I,type:"resize",id:G(C),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(X_.add(T),!g_)g_=!0,E.addEventListener("keydown",yT,!0);if(U_)T(U_);return()=>{X_.delete(T)}},onFileSnapshot:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},onFileSaved:(T)=>{return I_.add(T),()=>{I_.delete(T)}},reportFileChange:(T)=>c_({...Y,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:HT,reportFileUnsupported:()=>c_({...Y,type:"file-unsupported"}),dispose:()=>{for(let T of o.keys())j({...Y,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});o.clear();for(let T of a.keys())j({...Y,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(a.clear(),H=!0,S_=null,E_=null,O_=null,X_.clear(),I_.clear(),g_)E.removeEventListener("keydown",yT,!0);E.removeEventListener("message",bT),E.removeEventListener("keydown",qT,!0),E.removeEventListener("pointerover",f_),E.removeEventListener("pointermove",f_),E.removeEventListener("pointerout",hT),E.removeEventListener("focus",mT),E.removeEventListener("blur",gT);for(let T of n.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));n.clear(),V.clear(),Q.clear(),g.clear(),w.clear(),c.clear(),d.clear(),T_.clear(),G_.clear(),D_.clear(),l.clear(),m_.length=0}}};var kS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var BE=new Set(kS);var YS=["none","agent","user"];var jE=new Set(YS);var uS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],lS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],zS=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,D]of uS)E.style.setProperty(O,_.tokens[D]);for(let[O,D,V]of lS){let Q=_.tokens[V]??"";E.style.setProperty(O,Q),E.style.setProperty(D,Q)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},fT=(_,E)=>{if(zS(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var nS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(_,E)=>`var(--${_}, var(--oc-${nS[_]}, ${E}))`,h=W("surface-background","transparent"),w_=W("surface-elevated","transparent"),t=W("surface-elevated-foreground","inherit"),x=W("surface-foreground","inherit"),P=W("surface-muted-foreground","gray"),oS=W("surface-muted","transparent"),v=W("interactive-border","currentColor"),J=W("interactive-hover","transparent"),u=W("interactive-active","transparent"),NT=W("interactive-selection","transparent"),WT=W("interactive-selection-foreground","inherit"),q=W("primary","currentColor"),PT=W("primary-text","inherit"),$T=W("error-text","inherit"),aS=W("font-sans","inherit"),LT=W("font-mono","monospace"),JS=W("radius","9px"),kT=`calc(${JS} - 2px)`,QS=`calc(${JS} - 4px)`,$=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,ZS=`background-image: linear-gradient(${J}, ${J});`,YT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,zT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",FS="box-shadow: var(--oc-sdk-lit);",QT=`inset 0 0.5px 0 0 ${$(x,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,iS=`
:root {
  --oc-sdk-edge: ${$(x,16)};
  --oc-sdk-field-bg: ${w_};
  --oc-sdk-raised-bg: ${h};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${$(x,14)};
  --oc-sdk-field-bg: ${$(h,50,w_)};
  --oc-sdk-raised-bg: ${w_};
  --oc-sdk-field-lift: ${QT};
  --oc-sdk-raised-lift: ${QT};
  --oc-sdk-lit: ${QT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,x_=(_)=>{let E=W(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${_}-text`,"inherit")}; }`},rS=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,BS=`${iS}
.oc-sdk { color: ${x}; font-family: ${aS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ZS} }
.oc-sdk-mono { font-family: ${LT}; }
.oc-sdk-muted { color: ${P}; }
${x_("success")}${x_("warning")}${x_("error")}${x_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${PT}; }

.oc-sdk-btn { border-radius: ${kT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${QS}; }
.oc-sdk-btn[data-variant="default"] { color: ${PT}; background: ${$(q,10,h)}; border-color: ${$(q,12)}; ${FS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${$(q,16,h)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${$(q,22,h)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${oS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${u}, ${u}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${t}; ${zT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${u}, ${u}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${J}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${u}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${$T}; background: ${$("var(--oc-sdk-tone)",7,h)}; border-color: ${$("var(--oc-sdk-tone)",12)}; ${FS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${$("var(--oc-sdk-tone)",9,h)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${$("var(--oc-sdk-tone)",11,h)}; box-shadow: none; }

.oc-sdk-field-note { color: ${P}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$T}; }
.oc-sdk-input { border-radius: ${kT}; background: var(--oc-sdk-field-bg); color: ${t}; ${YT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${P}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${YT($(x,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${YT(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${LT}; }

.oc-sdk-search-icon { color: ${P}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${QS}; color: ${P}; }
.oc-sdk-search-clear:hover { background: ${J}; color: ${x}; }

.oc-sdk-trigger { border-radius: ${kT}; background: var(--oc-sdk-raised-bg); color: ${t}; ${zT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${u}, ${u}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${P}; }
.oc-sdk-trigger-chevron { color: ${P}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${t}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${w_}; background-clip: padding-box; color: ${t}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${J}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${NT}; color: ${WT}; }
.oc-sdk-option-check { color: ${x}; }
.oc-sdk-option[data-destructive="true"] { color: ${$T}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${$(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${P}; }
.oc-sdk-popup-empty { color: ${P}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${v}; border-radius: 4px; color: ${x}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${$(x,60,v)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${v}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${h}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ZS} }
.oc-sdk-check-desc { color: ${P}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${$(x,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${P}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${x}; }
.oc-sdk-tab[aria-selected="true"] { color: ${WT}; background: ${NT}; border-color: ${v}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${t}; background: var(--oc-sdk-raised-bg); ${zT} }
.oc-sdk-tab-count { color: ${P}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${$(x,6)}; color: ${P}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${$("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${J}; }
.oc-sdk-row[aria-selected="true"] { background: ${NT}; color: ${WT}; }
.oc-sdk-row-lead { font-family: ${LT}; color: ${P}; }
.oc-sdk-row-sub { color: ${P}; }
.oc-sdk-row-meta { color: ${P}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${P}; }

.oc-sdk-empty-body { color: ${P}; }

.oc-sdk-spinner { color: ${P}; }
.oc-sdk-spinner-ring { border-color: ${v}; border-top-color: ${q}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${$("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${P}; }

.oc-sdk-separator { color: ${P}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${$(v,40)}; }

.oc-sdk-progress-label { color: ${P}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${$(x,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${PT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${$(v,60)}; }
`,F=`
${v_}
${rS}
${BS}`;var KS=[{label:"/news",text:"/news"},{label:"/ci",text:"/ci"},{label:"/cd",text:"/cd"},{label:"/tag",text:"/tag"}],FT=async(_)=>{try{let E=await _.storage.get("shortcuts");if(Array.isArray(E))return E.filter((O)=>typeof O==="object"&&O!==null&&typeof O.label==="string"&&typeof O.text==="string").slice(0,30)}catch{}return[]},JT=(_,E)=>{_.storage.set("shortcuts",JSON.parse(JSON.stringify(E))).catch(()=>{return})},jS=async(_,E,O)=>{try{let D=await _.prompt({text:E,send:!0});if(O(D.sent==="sent"?"已提交到会话":`未直接发出（${D.sent}），已填入输入框`),D.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(D){if(D instanceof M&&(D.code==="NO_SESSION"||D.code==="SESSION_BUSY"))O(D.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(D instanceof M?`${D.code}`:"发送失败")}};var __=VT(),wS=document.querySelector("#root");if(!wS)throw Error("Missing #root");wS.innerHTML=`
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
h3{margin:4px 0 0;font-size:13px;opacity:.65;font-weight:600}
.grid{display:flex;flex-wrap:wrap;gap:8px}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0);font-weight:700}
button:disabled{opacity:.5}
button.danger{padding:4px 8px;font-size:12px}
.row{display:flex;gap:8px;align-items:center}
input{flex:1;min-width:0;padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit)}
.mut{font-size:13px;opacity:.7}
</style>
<h3>常用命令</h3>
<div class="grid" id="preset"></div>
<h3>我的快捷</h3>
<div class="grid" id="custom"></div>
<div class="row">
  <input id="new-label" placeholder="名称，如 发版检查" maxlength="20" />
  <input id="new-text" placeholder="发送内容，如 /ci" maxlength="500" />
  <button id="btn-add" title="添加快捷按钮">＋</button>
</div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
`;var p=(_)=>document.querySelector(`#${_}`),xS=p("preset"),BT=p("custom"),TE=p("out"),h_=(_)=>{TE.textContent=_},bS=(_)=>{let E=document.createElement("button");return E.className="cmd",E.textContent=_.label,E.title=_.text,E.onclick=()=>void jS(__,_.text,h_),E},SE=(_)=>{if(BT.innerHTML="",_.length===0){BT.innerHTML='<span class="mut">暂无下面加一个</span>';return}for(let E of _){let O=document.createElement("span");O.className="row",O.appendChild(bS(E));let D=document.createElement("button");D.className="danger",D.textContent="✕",D.title=`删除 ${E.label}`,D.onclick=()=>{let V=_.filter((Q)=>Q!==E);JT(__,V),KT()},O.appendChild(D),BT.appendChild(O)}},KT=async()=>{xS.innerHTML="";for(let _ of KS)xS.appendChild(bS(_));SE(await FT(__))};p("btn-add").onclick=()=>{let _=p("new-label").value.trim().slice(0,20),E=p("new-text").value.trim().slice(0,500);if(!_||!E){h_("名称和内容都要填");return}FT(__).then((O)=>{if(O.length>=30){h_("最多 30 个");return}let D=[...O,{label:_,text:E}];JT(__,D),p("new-label").value="",p("new-text").value="",KT()}).catch(()=>{h_("添加失败")})};__.onReady((_)=>{fT(_,document.documentElement),KT()});})();
