(()=>{var I="openchamber.sdk",V=1;var v_=`
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
`;function gT(_){let E=_.documentElement;if(E.hasAttribute("data-oc-scrollbar-activity"))return;E.setAttribute("data-oc-scrollbar-activity","");let O=new WeakMap;_.addEventListener("scroll",(X)=>{let D=X.target===_?E:X.target;if(!(D instanceof Element))return;if(!D.hasAttribute("data-oc-scrolling"))D.setAttribute("data-oc-scrolling","");let P=O.get(D);if(P!==void 0)clearTimeout(P);O.set(D,setTimeout(()=>{O.delete(D),D.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var xS=`(${gT.toString()})(document);`;var u_=128,l_=65536;var P_=128;var $_=65536;var pT=/^[a-z][a-z0-9-]{0,39}$/;var mT=(_)=>Object(_)===_&&!Array.isArray(_),n_=(_,E)=>Object.keys(_).every((O)=>E.includes(O)),cT=(_)=>String(_)===_&&_.length>=1&&_.length<=60,dT=(_)=>String(_)===_&&_.length>=1&&_.length<=80,vT=(_)=>{if(!Array.isArray(_)||_.length>4)return!1;let E=new Set;for(let O of _){if(!mT(O)||!pT.test(O.id)||!cT(O.label))return!1;if(O.disabled!==void 0&&O.disabled!==!0&&O.disabled!==!1)return!1;if(E.has(O.id))return!1;if(E.add(O.id),O.kind==="button"){if(!n_(O,["kind","id","label","disabled"]))return!1;continue}if(O.kind!=="select"||!n_(O,["kind","id","label","value","options","disabled"]))return!1;if(!dT(O.value)||!Array.isArray(O.options)||O.options.length<1||O.options.length>16)return!1;let X=new Set;for(let D of O.options){if(!mT(D)||!n_(D,["value","label"])||!dT(D.value)||!cT(D.label)||X.has(D.value))return!1;X.add(D.value)}if(!X.has(O.value))return!1}return!0};var uT=["{id}","{segment}","{segments+}"];var CE=new Set(uT);var lT=["turn-finished","turn-failed","permission-asked","question-asked"];var XE=new Set(lT);var L_=20000000,Y_=256;var o_=(_)=>("bytes"in _)?_.bytes.byteLength:_.content.length,nT=(_,E)=>{if(_.path!==E.path||_.readOnly!==E.readOnly)return!1;if(_.encoding==="text"||E.encoding==="text")return _.encoding==="text"&&E.encoding==="text"&&_.content===E.content;if(_.bytes.byteLength!==E.bytes.byteLength)return!1;for(let O=0;O<_.bytes.byteLength;O+=1)if(_.bytes[O]!==E.bytes[O])return!1;return!0};var oT=/^[A-Za-z0-9_-]{1,80}$/;var aT=["left","right","top","bottom"];var iT=(_,E=0,O={remaining:16000})=>{if(--O.remaining<0||E>=32)return!1;if(_===null)return!0;let X=Array.isArray(_)?_:Object(_)===_?Object.values(_):[];for(let D of X)if(!iT(D,E+1,O))return!1;return!0},a_=(_)=>{if(_===null||_===!0||_===!1)return!0;if(Array.isArray(_))return Object.keys(_).every((E)=>/^(0|[1-9]\d*)$/.test(E)&&Number(E)<_.length)&&_.every(a_);if(Object(_)===_){let E=Object.getPrototypeOf(_);return(E===null||E===Object.prototype)&&Object.values(_).every(a_)}return String(_)===_||Number.isFinite(_)},i_=(_)=>{try{if(String(_.id)!==_.id||!oT.test(_.id)||!Number.isFinite(_.anchor.x)||Math.abs(_.anchor.x)>1e5||!Number.isFinite(_.anchor.y)||Math.abs(_.anchor.y)>1e5||!Number.isFinite(_.anchor.width)||!Number.isFinite(_.anchor.height)||_.anchor.width<=0||_.anchor.height<=0||_.anchor.width>1e5||_.anchor.height>1e5||!Number.isInteger(_.width)||_.width<160||_.width>640||!Number.isInteger(_.height)||_.height<48||_.height>480||_.side!==void 0&&!aT.includes(_.side)||_.focus!==void 0&&_.focus!==!0&&_.focus!==!1||!iT(_.data)||!a_(_.data))return!1;return JSON.stringify(_.data).length<=16000}catch{return!1}};var sT=["file","directory","other","missing"],s_=(_)=>Boolean(_&&"sessionId"in _),t_=(_)=>Boolean(_&&"sent"in _&&!("sessionId"in _));var tT=/^[0-9a-f]{7,64}$/i,e_=(_)=>tT.test(_),Q_=500,Z_=32000,eT=16000,_S=128,TS=200,SS=2000,ES=16000,OS=80,US=200,AS=16000;var MS=2000;var _T=20000,k_=1024,z_=2000000;var F_=64000,J_=8000,TT=4000;var ST=960000;var RS=999,CS=1e4,C_=500,GS=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],XS=["stopped","starting","ready","failed"],HS=new Set(GS),DS=(_)=>HS.has(_),IS=(_)=>_&&DS(_)?_:"HOST_REJECTED",t=(_)=>{if(_===void 0)return!1;if(_===null||_===!0||_===!1)return!0;if(String(_)===_)return!0;if(Number(_)===_)return Number.isFinite(_);if(Array.isArray(_))return _.every(t);if(Object(_)===_)return Object.values(_).every(t);return!1},VS=(_)=>t(_)&&JSON.stringify(_).length<=AS,rT=(_)=>_?.trim().slice(0,US)??"",e=(_)=>{let E=_.id.trim().slice(0,_S),O=_.title.trim().slice(0,TS),X=_.url.trim().slice(0,SS),D=_.text?.trim().slice(0,ES),P=_.author?.trim().slice(0,OS),g=_.kind==="pull"?"pull":"issue",b={providerId:_.providerId.trim(),id:E,title:O||E,url:X,kind:g};if(D)b.text=D;if(P)b.author=P;if(g==="pull"){let c=rT(_.branches?.head),F=rT(_.branches?.base);if(c&&F)b.branches={head:c,base:F}}if(VS(_.data))b.data=_.data;return b},ET=(_)=>{let E=e(_);if(_.projectId)E.projectId=_.projectId;if(_.navigation)E.navigation=_.navigation;if(_.worktree)E.worktree=_.worktree;return E},OT=(_)=>{let E={text:_.text.trim().slice(0,eT)};if(_.send)E.send=!0;return E},UT=(_)=>{if(_===null||!Number.isFinite(_))return null;return Math.min(RS,Math.max(0,Math.round(_)))},AT=(_)=>{if(!Number.isFinite(_))return 0;return Math.min(CS,Math.max(0,Math.ceil(_)))};var __=(_)=>_.length>0&&_.length<=k_&&!_.includes("\x00")&&!_.includes("\\");var B_=(_)=>{if(!_.startsWith("/")||_.includes("\x00")||_.includes("\\")||_.includes("://"))return!1;if(_.length>MS)return!1;return!_.split("/").some((O)=>O==="."||O==="..")},bS=new Set(XS),MT=(_)=>Boolean(_&&"status"in _&&bS.has(String(_.status))&&!("body"in _)),K_=(_)=>Boolean(_&&"status"in _&&"body"in _&&Number.isInteger(_.status)),RT=(_)=>Boolean(_&&"content"in _&&String(_.content)===_.content),CT=(_)=>Boolean(_&&"written"in _&&_.written===!0),GT=(_)=>Boolean(_&&"entries"in _&&Array.isArray(_.entries)),qS=new Set(sT),XT=(_)=>Boolean(_&&"kind"in _&&"size"in _&&qS.has(String(_.kind))&&Number.isFinite(_.size)),DT=(_)=>Boolean(_&&"text"in _&&String(_.text)===_.text&&!("status"in _)),yS=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),hS=(_)=>Object(_)===_?_:null,r_=(_)=>String(_)===_&&_.length>0,gS=(_)=>{if(!r_(_.id))return null;if(_.ok===!0){let E={channel:I,v:V,type:"result",id:_.id,ok:!0};if(Object(_.payload)===_.payload)E.payload=_.payload;return E}if(_.ok===!1&&r_(_.error))return{channel:I,v:V,type:"result",id:_.id,ok:!1,error:_.error,code:IS(r_(_.code)?_.code:void 0)};return null},IT=(_)=>{let E=hS(_);if(!E||E.channel!==I||E.v!==V)return null;if(E.type==="result")return gS(E);if(!yS.has(String(E.type))||Object(E.payload)!==E.payload)return null;return E};var NS=(_)=>("key"in _)&&("metaKey"in _)&&("ctrlKey"in _),mS=(_)=>(_.metaKey||_.ctrlKey)&&!_.altKey&&!_.shiftKey&&_.key.toLowerCase()==="s";class M extends Error{code;constructor(_,E){super(E);this.name="HostRequestError",this.code=_}}var fS=()=>Promise.reject(new M("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),j_=()=>Promise.reject(new M("BAD_PATH",`File path must be 1 to ${k_} characters without NUL or backslash.`)),x_=(_)=>{if(_===void 0)return;if(Object(_)!==_||Array.isArray(_)||_.scope!==void 0&&_.scope!=="instance"&&_.scope!=="device")throw new M("HOST_REJECTED",'Storage scope must be "instance" or "device".');return _.scope==="device"?"device":void 0},G=(_)=>{return _.value+=1,`oc-${_.value}`},VT=(_={})=>{let E=_.target??("window"in globalThis?window:null);if(!E)throw new M("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let O=_.acceptSource??((T)=>T===E.parent),X=_.requestTimeoutMs??_T,D=new Set,P=new Set,g=new Set,b=new Set,c=new Set,F=new Set,J=new Set,z=new Set,B=new Set,h=new Set,p=[],E_=null,O_=null,I_=new Set,V_=new Set,U_=null,A_=null,m_=!1,i=new Map,r=new Map,s=new Map,d=!1,C={value:0},R=null,v=null,M_=!1,R_=!1,FT=null,JT=(T)=>{if(!T)return null;return{sessionId:T.id,phase:T.busy?"started":"completed"}},q=(T)=>{E.parent.postMessage(T,"*")},BT=()=>{if(d||E.parent===E||h.size===0||R?.features?.lateGenerateResults!==!0)return;q({channel:I,v:V,type:"generate-late-listen"})},Y=(T,S)=>{for(let U of T)try{U(S)}catch(A){console.error(A)}},KT=(T)=>{if(!(T instanceof MessageEvent))return;if(!O(T.source))return;let S=IT(T.data);if(!S)return;if(S.type==="workspace"){let A=r.get(S.payload.subscriptionId);if(A)Y([A],S.payload.snapshot);return}if(S.type==="shells"){let A=s.get(S.payload.subscriptionId);if(A)Y([A],S.payload.snapshot);return}if(S.type==="ready"){if(R=S.payload,v=JT(S.payload.session),Y(D,S.payload),Y(P,S.payload.directory),Y(g,S.payload.session),v)Y(b,v);Y(c,S.payload.connection),Y(F,S.payload.settings),Y(J,S.payload.item),BT();return}if(S.type==="generate-late"){if(h.size===0)p.push(S.payload);else Y(h,S.payload);return}if(S.type==="directory"){if(R)R={...R,directory:S.payload.directory};Y(P,S.payload.directory);return}if(S.type==="session"){if(R)R={...R,session:S.payload.session};if(!S.payload.session)v=null;else if(v?.sessionId!==S.payload.session.id)v=JT(S.payload.session);Y(g,S.payload.session);return}if(S.type==="session-lifecycle"){v=S.payload,Y(b,S.payload);return}if(S.type==="connection"){if(R)R={...R,connection:S.payload.connection};Y(c,S.payload.connection);return}if(S.type==="settings"){if(R)R={...R,settings:S.payload.settings};Y(F,S.payload.settings);return}if(S.type==="item"){if(R)R={...R,item:S.payload.item};Y(J,S.payload.item);return}if(S.type==="status-control-event"){Y(z,S.payload);return}if(S.type==="popover-closed"){Y(B,S.payload);return}if(S.type==="action"){let A=(N)=>{if(!d)q({channel:I,v:V,type:"action-result",id:S.id,payload:N})},f=O_;if(!f){A({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>f(S.payload)).then(()=>A({ok:!0}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();A({ok:!1,error:(k||"Action failed.").slice(0,C_)})});return}if(S.type==="file-open"){let A=S.payload;if(A_&&nT(A_,A))return;A_=A,Y(I_,S.payload);return}if(S.type==="file-saved"){Y(V_,S.payload.version);return}if(S.type==="file-snapshot"){let A=(k)=>{if(!d)q({channel:I,v:V,type:"file-snapshot-result",id:S.id,payload:k})},f=(k)=>A({error:(k.trim()||"Could not read the edited file.").slice(0,C_)}),N=U_;if(!N){f("This extension does not edit files.");return}Promise.resolve().then(()=>N(S.payload.purpose)).then((k)=>{if(o_(k)>L_){f(`The file is over ${L_} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>Y_){f(`The snapshot version is over ${Y_} characters.`);return}A({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>f(k instanceof Error?k.message:String(k)));return}if(S.type==="resolve"){let A=(N)=>{q({channel:I,v:V,type:"resolve-result",id:S.id,payload:N})},f=E_;if(!f){A({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>f(S.payload)).then((N)=>A({item:N?e(N):null}),(N)=>{let k=(N instanceof Error?N.message:String(N)).trim();A({error:(k||"Command failed.").slice(0,C_)})});return}let U=i.get(S.id);if(!U)return;if(clearTimeout(U.timer),i.delete(S.id),S.ok){U.resolve(S.payload);return}U.reject(new M(S.code,S.error))};E.addEventListener("message",KT),q({channel:I,v:V,type:"hello"});let K=(T,S=X)=>{if(d||E.parent===E)return Promise.reject(new M("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((U,A)=>{let f=setTimeout(()=>{i.delete(T.id),A(new M("HOST_TIMEOUT","Host did not answer in time."))},S);i.set(T.id,{resolve:U,reject:A,timer:f}),q(T)})},Q=(T)=>K(T).then(()=>{return}),Z={channel:I,v:V},c_=(T)=>{if(!d&&E.parent!==E)q(T)},jT=()=>c_({...Z,type:"file-save"}),xT=(T)=>{if(!NS(T)||!mS(T))return;T.preventDefault(),jT()},wT=(T)=>{if(!NS(T)||T.key!=="Escape"||R?.surface!=="popover"||!R.popover)return;T.preventDefault(),yT(R.popover.id,"escape").catch(()=>{return})},N_=()=>{let T=R?.surface==="popover"?R.popover:void 0;if(!T)return;let S=M_||R_;if(FT===S)return;FT=S,hT(T.id,S).catch(()=>{return})},f_=()=>{if(R?.surface!=="popover"||M_)return;M_=!0,N_()},HT=(T)=>{if(R?.surface!=="popover"||T.relatedTarget!==null||!M_)return;M_=!1,N_()},bT=()=>{if(R?.surface!=="popover"||R_)return;R_=!0,N_()},qT=()=>{if(R?.surface!=="popover"||!R_)return;R_=!1,N_()},m=(T,S=1024)=>{if(!T.trim()||T.length>S)throw new M("HOST_REJECTED",`Identity must contain 1 to ${S} characters.`)},d_=async(T)=>{if(T.kind!=="projects")m(T.projectId);let S=await K({...Z,type:"workspace-read",id:G(C),payload:T});if(!S||!("kind"in S)||!("state"in S)||S.kind!==T.kind)throw new M("HOST_REJECTED","Host did not return workspace data.");return S},p_=async(T,S)=>{if(T.kind!=="projects")m(T.projectId);let U=G(C);r.set(U,S);try{await Q({...Z,type:"workspace-subscribe",id:G(C),payload:{subscriptionId:U,query:T}})}catch(A){if(r.delete(U),!d)q({...Z,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!r.delete(U)||d)return;q({...Z,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},jS=async(T,S)=>{if(T.kind==="session")m(T.sessionId);if(T.kind==="project")m(T.projectId);let U=G(C);s.set(U,S);try{await Q({...Z,type:"shells-subscribe",id:G(C),payload:{subscriptionId:U,scope:T}})}catch(A){if(s.delete(U),!d)q({...Z,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}});throw A}return()=>{if(!s.delete(U)||d)return;q({...Z,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:U}})}},W_=async(T)=>{if("key"in T&&(T.key.length===0||T.key.length>u_))throw new M("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(T.op==="set"&&!t(T.value))throw new M("HOST_REJECTED","Storage values must be JSON.");if(T.op==="set"&&new TextEncoder().encode(JSON.stringify(T.value)).length>l_)throw new M("HOST_REJECTED","Storage value exceeds 64 KiB.");if(T.scope==="device"&&R?.features?.deviceStorage!==!0)throw new M("UNSUPPORTED","This host does not support device storage.");let S=await K({...Z,type:"storage",id:G(C),payload:T});if(!S||!("storage"in S)||S.op!==T.op)throw new M("HOST_REJECTED","Host did not return storage data.");return S},yT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-close",id:G(C),payload:S?{id:T,reason:S}:{id:T}}),hT=(T,S)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===T)?Promise.reject(new M("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-anchor",id:G(C),payload:{id:T,active:S}});return E.addEventListener("keydown",wT,!0),E.addEventListener("pointerover",f_),E.addEventListener("pointermove",f_),E.addEventListener("pointerout",HT),E.addEventListener("focus",bT),E.addEventListener("blur",qT),{onAction:(T)=>{return O_=T,()=>{if(O_===T)O_=null}},listProjects:async()=>{let T=await d_({kind:"projects"});if(T.kind!=="projects")throw new M("HOST_REJECTED","Expected projects.");return T},listWorktrees:async(T)=>{let S=await d_({kind:"worktrees",projectId:T});if(S.kind!=="worktrees")throw new M("HOST_REJECTED","Expected worktrees.");return S},listSessions:async(T)=>{let S=await d_({kind:"sessions",projectId:T});if(S.kind!=="sessions")throw new M("HOST_REJECTED","Expected sessions.");return S},onProjects:(T)=>p_({kind:"projects"},(S)=>{if(S.kind==="projects")T(S)}),onWorktrees:(T,S)=>p_({kind:"worktrees",projectId:T},(U)=>{if(U.kind==="worktrees")S(U)}),onSessions:(T,S)=>p_({kind:"sessions",projectId:T},(U)=>{if(U.kind==="sessions")S(U)}),onRunningShells:(T,S)=>jS(T,S),readShellOutput:async(T,S)=>{m(T,P_);let U=S?.cursor;if(U!==void 0&&(!Number.isInteger(U)||U<0))throw new M("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let A=S?.tailBytes;if(A!==void 0&&(!Number.isInteger(A)||A<1||A>$_))throw new M("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${$_}.`);let N=await K({...Z,type:"shell-output",id:G(C),payload:{shellId:T,cursor:U,tailBytes:A}});if(!N||typeof N.output!=="string"||!Number.isFinite(N.cursor))throw new M("HOST_REJECTED","Host did not return shell output.");return N},stopShell:async(T)=>{if(m(T,P_),(await K({...Z,type:"shell-stop",id:G(C),payload:{shellId:T}}))?.stopped!==!0)throw new M("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(T)=>{m(T),await Q({...Z,type:"open-session",id:G(C),payload:{sessionId:T}})},storage:{get:async(T,S)=>{let U=x_(S),A={op:"get",key:T};if(U)A.scope=U;let f=await W_(A);return f.op==="get"&&f.found?f.value:void 0},set:async(T,S,U)=>{let A=x_(U),f={op:"set",key:T,value:S};if(A)f.scope=A;await W_(f)},delete:async(T,S)=>{let U=x_(S),A={op:"delete",key:T};if(U)A.scope=U;await W_(A)},keys:async(T)=>{let S=x_(T),U={op:"keys"};if(S)U.scope=S;let A=await W_(U);if(A.op!=="keys")throw new M("HOST_REJECTED","Expected storage keys.");return A.keys}},onReady:(T)=>{if(D.add(T),R)T(R);return()=>{D.delete(T)}},onDirectory:(T)=>{if(P.add(T),R)T(R.directory);return()=>{P.delete(T)}},onSession:(T)=>{if(g.add(T),R)T(R.session);return()=>{g.delete(T)}},onSessionLifecycle:(T)=>{if(b.add(T),v)T(v);return()=>{b.delete(T)}},onConnection:(T)=>{if(c.add(T),R)T(R.connection);return()=>{c.delete(T)}},onSettings:(T)=>{if(F.add(T),R)T(R.settings);return()=>{F.delete(T)}},onItem:(T)=>{if(J.add(T),R)T(R.item);return()=>{J.delete(T)}},onStatusControl:(T)=>{return z.add(T),()=>{z.delete(T)}},onPopoverClosed:(T)=>{return B.add(T),()=>{B.delete(T)}},setStatusControls:(T)=>{if(R?.features?.statusControls!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support status controls."));if(!vT(T))return Promise.reject(new M("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...Z,type:"status-controls",id:G(C),payload:{controls:T}})},openPopover:(T)=>{if(R?.features?.popovers!==!0)return Promise.reject(new M("UNSUPPORTED","This host does not support popovers."));if(!i_(T))return Promise.reject(new M("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...Z,type:"popover-open",id:G(C),payload:T})},closePopover:yT,setPopoverAnchorActive:hT,onResolve:(T)=>{return E_=T,()=>{if(E_===T)E_=null}},toast:(T)=>{let S=T.message.trim();if(!S||S.length>Q_)return Promise.reject(new M("HOST_REJECTED",`Toast message must contain 1 to ${Q_} characters.`));if(T.copy&&T.copy!==!0&&(!T.copy.text.length||T.copy.text.length>Z_))return Promise.reject(new M("HOST_REJECTED",`Toast copy text must contain 1 to ${Z_} characters.`));return Q({channel:I,v:V,type:"toast",id:G(C),payload:{...T,message:S}})},openUrl:(T)=>Q({channel:I,v:V,type:"open-url",id:G(C),payload:{url:T}}),openCommit:(T)=>e_(T)?Q({channel:I,v:V,type:"open-commit",id:G(C),payload:{sha:T}}):Promise.reject(new M("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(T)=>Q({channel:I,v:V,type:"open-surface",id:G(C),payload:{surfaceId:T}}),writeClipboard:(T)=>Q({channel:I,v:V,type:"clipboard-write",id:G(C),payload:{text:T}}),compose:(T)=>Q({channel:I,v:V,type:"compose",id:G(C),payload:T}),attach:(T)=>Q({channel:I,v:V,type:"attach",id:G(C),payload:e(T)}),startSession:async(T)=>{if(T.projectId!==void 0)m(T.projectId);let S=T.worktree;if(S&&S!==!0)if(S.kind==="existing")m(S.directory);else{if(S.name!==void 0)m(S.name,200);if(S.baseBranch!==void 0)m(S.baseBranch,200)}let U=await K({channel:I,v:V,type:"start-session",id:G(C),payload:ET(T)},_.requestTimeoutMs??180000);if(!s_(U))throw new M("HOST_REJECTED","Host did not return a session.");return U},prompt:(T)=>K({channel:I,v:V,type:"prompt",id:G(C),payload:OT(T)}).then((S)=>{if(!t_(S))throw new M("HOST_REJECTED","Host did not return a prompt result.");return S}),sessionLink:(T)=>Q({channel:I,v:V,type:"session-link",id:G(C),payload:e(T)}),close:()=>Q({channel:I,v:V,type:"close",id:G(C)}),oauthStart:()=>Q({channel:I,v:V,type:"oauth-start",id:G(C)}),oauthDisconnect:()=>Q({channel:I,v:V,type:"oauth-disconnect",id:G(C)}),request:(T)=>(B_(T.path)?K({channel:I,v:V,type:"request",id:G(C),payload:T}):fS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host request result was empty.");return S}),serviceRequest:(T)=>(B_(T.path)?K({channel:I,v:V,type:"service-request",id:G(C),payload:T}):fS()).then((S)=>{if(!K_(S))throw new M("HOST_REJECTED","Host service request result was empty.");return S}),serviceStatus:()=>K({channel:I,v:V,type:"service-status",id:G(C)}).then((T)=>{if(!MT(T))throw new M("HOST_REJECTED","Host did not return service status.");return T}),readFile:(T)=>(__(T)?K({channel:I,v:V,type:"file-read",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!RT(S))throw new M("HOST_REJECTED","Host did not return file content.");return S}),writeFile:(T,S)=>{if(!__(T))return j_();if(S.length>z_)return Promise.reject(new M("FILE_TOO_LARGE",`Content is over ${z_} characters.`));return K({channel:I,v:V,type:"file-write",id:G(C),payload:{path:T,content:S}}).then((U)=>{if(!CT(U))throw new M("HOST_REJECTED","Host did not confirm the write.");return U})},listDir:(T)=>(__(T)?K({channel:I,v:V,type:"file-list",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!GT(S))throw new M("HOST_REJECTED","Host did not return directory entries.");return S}),stat:(T)=>(__(T)?K({channel:I,v:V,type:"file-stat",id:G(C),payload:{path:T}}):j_()).then((S)=>{if(!XT(S))throw new M("HOST_REJECTED","Host did not return file status.");return S}),generate:(T)=>{let S=T.prompt.trim(),U=T.system?.trim();if(S.length===0||S.length>F_)return Promise.reject(new M("HOST_REJECTED",`Prompt must be 1 to ${F_} characters.`));if(U!==void 0&&(U.length===0||U.length>J_))return Promise.reject(new M("HOST_REJECTED",`System prompt must be 1 to ${J_} characters.`));let A=T.maxOutputTokens===void 0?void 0:Math.min(TT,Math.max(1,Math.floor(T.maxOutputTokens)));if(A!==void 0&&!Number.isFinite(A))return Promise.reject(new M("HOST_REJECTED","maxOutputTokens must be a number."));let f={prompt:S};if(U!==void 0)f.system=U;if(A!==void 0)f.maxOutputTokens=A;return K({channel:I,v:V,type:"generate",id:G(C),payload:f},_.requestTimeoutMs??ST).then((N)=>{if(!DT(N))throw new M("HOST_REJECTED","Host did not return generated text.");return N})},onLateGenerateResult:(T)=>{h.add(T);for(let S of p.splice(0))Y([T],S);return BT(),()=>{h.delete(T)}},setBadge:(T)=>Q({channel:I,v:V,type:"badge",id:G(C),payload:{count:UT(T)}}),setHeight:(T)=>Q({channel:I,v:V,type:"resize",id:G(C),payload:{height:AT(T)}}),onFileOpen:(T)=>{if(I_.add(T),!m_)m_=!0,E.addEventListener("keydown",xT,!0);if(A_)T(A_);return()=>{I_.delete(T)}},onFileSnapshot:(T)=>{return U_=T,()=>{if(U_===T)U_=null}},onFileSaved:(T)=>{return V_.add(T),()=>{V_.delete(T)}},reportFileChange:(T)=>c_({...Z,type:"file-change",payload:{dirty:T.dirty,edited:T.edited}}),requestFileSave:jT,reportFileUnsupported:()=>c_({...Z,type:"file-unsupported"}),dispose:()=>{for(let T of r.keys())q({...Z,type:"workspace-unsubscribe",id:G(C),payload:{subscriptionId:T}});r.clear();for(let T of s.keys())q({...Z,type:"shells-unsubscribe",id:G(C),payload:{subscriptionId:T}});if(s.clear(),d=!0,E_=null,O_=null,U_=null,I_.clear(),V_.clear(),m_)E.removeEventListener("keydown",xT,!0);E.removeEventListener("message",KT),E.removeEventListener("keydown",wT,!0),E.removeEventListener("pointerover",f_),E.removeEventListener("pointermove",f_),E.removeEventListener("pointerout",HT),E.removeEventListener("focus",bT),E.removeEventListener("blur",qT);for(let T of i.values())clearTimeout(T.timer),T.reject(new M("HOST_UNAVAILABLE","Host client was disposed."));i.clear(),D.clear(),P.clear(),g.clear(),b.clear(),c.clear(),F.clear(),J.clear(),z.clear(),B.clear(),h.clear(),p.length=0}}};var WS=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var zE=new Set(WS);var PS=["none","agent","user"];var JE=new Set(PS);var cS=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],dS=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],$S=(_,E)=>{E.style.colorScheme=_.mode;for(let[O,X]of cS)E.style.setProperty(O,_.tokens[X]);for(let[O,X,D]of dS){let P=_.tokens[D]??"";E.style.setProperty(O,P),E.style.setProperty(X,P)}E.style.setProperty("font-family",_.tokens.font),E.style.setProperty("font-size","0.875rem"),E.style.setProperty("line-height","1.45"),E.style.setProperty("color",_.tokens.foreground)},NT=(_,E)=>{if($S(_.theme,E),E.dataset)E.dataset.ocSurface=_.surface,E.dataset.ocTheme=_.theme.mode};var pS={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(_,E)=>`var(--${_}, var(--oc-${pS[_]}, ${E}))`,l=W("surface-background","transparent"),H_=W("surface-elevated","transparent"),T_=W("surface-elevated-foreground","inherit"),y=W("surface-foreground","inherit"),$=W("surface-muted-foreground","gray"),vS=W("surface-muted","transparent"),o=W("interactive-border","currentColor"),x=W("interactive-hover","transparent"),a=W("interactive-active","transparent"),fT=W("interactive-selection","transparent"),WT=W("interactive-selection-foreground","inherit"),u=W("primary","currentColor"),PT=W("primary-text","inherit"),$T=W("error-text","inherit"),uS=W("font-sans","inherit"),LT=W("font-mono","monospace"),ZS=W("radius","9px"),YT=`calc(${ZS} - 2px)`,LS=`calc(${ZS} - 4px)`,L=(_,E,O="transparent")=>`color-mix(in srgb, ${_} ${E}%, ${O})`,YS=`background-image: linear-gradient(${x}, ${x});`,QT=(_,E="0.5px")=>`box-shadow: inset 0 0 0 ${E} ${_}, var(--oc-sdk-field-lift);`,ZT="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",QS="box-shadow: var(--oc-sdk-lit);",kT=`inset 0 0.5px 0 0 ${L(y,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,lS=`
:root {
  --oc-sdk-edge: ${L(y,16)};
  --oc-sdk-field-bg: ${H_};
  --oc-sdk-raised-bg: ${l};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(y,14)};
  --oc-sdk-field-bg: ${L(l,50,H_)};
  --oc-sdk-raised-bg: ${H_};
  --oc-sdk-field-lift: ${kT};
  --oc-sdk-raised-lift: ${kT};
  --oc-sdk-lit: ${kT};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,w_=(_)=>{let E=W(`status-${_}`,"currentColor");return`
.oc-sdk[data-tone="${_}"], .oc-sdk [data-tone="${_}"] { --oc-sdk-tone: ${E}; --oc-sdk-tone-text: ${W(`${_}-text`,"inherit")}; }`},nS=`
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
`,kS=`${lS}
.oc-sdk { color: ${y}; font-family: ${uS}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${YS} }
.oc-sdk-mono { font-family: ${LT}; }
.oc-sdk-muted { color: ${$}; }
${w_("success")}${w_("warning")}${w_("error")}${w_("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${u}; --oc-sdk-tone-text: ${PT}; }

.oc-sdk-btn { border-radius: ${YT}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${LS}; }
.oc-sdk-btn[data-variant="default"] { color: ${PT}; background: ${L(u,10,l)}; border-color: ${L(u,12)}; ${QS} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(u,16,l)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(u,22,l)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${vS}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${T_}; ${ZT} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${a}, ${a}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${x}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${a}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${$T}; background: ${L("var(--oc-sdk-tone)",7,l)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${QS} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,l)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,l)}; box-shadow: none; }

.oc-sdk-field-note { color: ${$}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$T}; }
.oc-sdk-input { border-radius: ${YT}; background: var(--oc-sdk-field-bg); color: ${T_}; ${QT("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${$}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${QT(L(y,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${QT(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${LT}; }

.oc-sdk-search-icon { color: ${$}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${u}; }
.oc-sdk-search-clear { border-radius: ${LS}; color: ${$}; }
.oc-sdk-search-clear:hover { background: ${x}; color: ${y}; }

.oc-sdk-trigger { border-radius: ${YT}; background: var(--oc-sdk-raised-bg); color: ${T_}; ${ZT} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${x}, ${x}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${a}, ${a}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${$}; }
.oc-sdk-trigger-chevron { color: ${$}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${T_}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${H_}; background-clip: padding-box; color: ${T_}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${x}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fT}; color: ${WT}; }
.oc-sdk-option-check { color: ${y}; }
.oc-sdk-option[data-destructive="true"] { color: ${$T}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${$}; }
.oc-sdk-popup-empty { color: ${$}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${o}; border-radius: 4px; color: ${y}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(y,60,o)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${o}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${l}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${u}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${YS} }
.oc-sdk-check-desc { color: ${$}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(y,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${$}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${y}; }
.oc-sdk-tab[aria-selected="true"] { color: ${WT}; background: ${fT}; border-color: ${o}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${T_}; background: var(--oc-sdk-raised-bg); ${ZT} }
.oc-sdk-tab-count { color: ${$}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(y,6)}; color: ${$}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${x}; }
.oc-sdk-row[aria-selected="true"] { background: ${fT}; color: ${WT}; }
.oc-sdk-row-lead { font-family: ${LT}; color: ${$}; }
.oc-sdk-row-sub { color: ${$}; }
.oc-sdk-row-meta { color: ${$}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${$}; }

.oc-sdk-empty-body { color: ${$}; }

.oc-sdk-spinner { color: ${$}; }
.oc-sdk-spinner-ring { border-color: ${o}; border-top-color: ${u}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${$}; }

.oc-sdk-separator { color: ${$}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(o,40)}; }

.oc-sdk-progress-label { color: ${$}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(y,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${u}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${PT}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(o,60)}; }
`,j=`
${v_}
${nS}
${kS}`;var zS=(_)=>{let E=_.match(/^---\s*\n([\s\S]*?)\n---/);if(!E)return null;let O=E[1].split(`
`).find((X)=>/^\s*description\s*:/.test(X));if(!O)return null;return O.replace(/^\s*description\s*:\s*/,"").replace(/^["']|["']$/g,"").trim()||null},sS=(_)=>_.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/,"").trim(),FS=async(_,E)=>{try{let{entries:O}=await _.listDir(E);return O.filter((X)=>X.kind==="file"&&X.name.endsWith(".md")).map((X)=>X.name)}catch{return[]}},JS=async(_,E)=>{try{let{content:O}=await _.readFile(E);return O}catch{return null}},BS=async(_,E)=>{let O=[],X=[],D=new Set,P=new Map,g="~/.config/opencode/snippet";for(let F of await FS(_,"~/.config/opencode/snippet")){let J=await JS(_,`~/.config/opencode/snippet/${F}`);if(J===null)continue;let z=sS(J);if(!z)continue;let B=F.replace(/\.md$/,""),h=zS(J)??B,p=`snip:${z}`;if(D.has(p))continue;D.add(p),O.push({label:h,text:z}),P.set(B,h)}let b=E?["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands"),"command","commands",".opencode/command",".opencode/commands"]:["~/.config/opencode/snippet".replace("snippet","command"),"~/.config/opencode/snippet".replace("snippet","commands")];for(let F of b)for(let J of await FS(_,F)){let z=await JS(_,`${F}/${J}`);if(z===null)continue;let B=J.replace(/\.md$/,""),h=zS(z)??B;P.set(B,h);let p=`cmd:/${B}`;if(D.has(p))continue;D.add(p),X.push({label:h,text:`/${B}`})}if(E)try{let{content:F}=await _.readFile(".openchamber/project.json"),J=JSON.parse(F);if(Array.isArray(J.draftStarters))for(let z of J.draftStarters.slice(0,30)){if(typeof z?.name!=="string"||!z.name)continue;let B=`cmd:/${z.name}`;if(D.has(B))continue;D.add(B),X.unshift({label:P.get(z.name)??z.name,text:`/${z.name}`})}}catch{}let c=O.length+X.length===0?"无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters":"来自 opencode 片段/命令与本仓 draftStarters去各自位置管理";return{snippets:O,commands:X,hint:c}},KS=async(_,E,O)=>{try{let X=await _.prompt({text:E,send:!0});if(O(X.sent==="sent"?"已提交到会话":`未直接发出（${X.sent}），已填入输入框`),X.sent!=="sent")await _.prompt({text:E}).catch(()=>{return})}catch(X){if(X instanceof M&&(X.code==="NO_SESSION"||X.code==="SESSION_BUSY"))O(X.code==="NO_SESSION"?"无会话已填入输入框":"会话忙已填入输入框稍后发送"),await _.prompt({text:E}).catch(()=>{return});else O(X instanceof M?`${X.code}`:"发送失败")}};var X_=VT(),D_=document.querySelector("#root");if(!D_)throw Error("Missing #root");D_.innerHTML=`<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
.mut{font-size:12px;opacity:.7}
</style><div class="grid" id="g"></div><div class="mut" id="out"></div>`;var g_=document.querySelector("#g"),tS=document.querySelector("#out"),eS=async(_)=>{g_.innerHTML="";let{snippets:E,commands:O}=await BS(X_,_);for(let D of[...O,...E]){let P=document.createElement("button");P.textContent=D.label,P.title=D.text.length>200?D.text.slice(0,200):D.text,P.onclick=()=>void KS(X_,D.text,(g)=>{tS.textContent=g}),g_.appendChild(P)}if(g_.children.length===0)g_.innerHTML='<span class="mut">暂无快捷</span>';let X=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(X).catch(()=>{return})};new ResizeObserver(()=>{let _=Math.ceil(D_.getBoundingClientRect().height);X_.setHeight(_).catch(()=>{return})}).observe(D_);X_.onReady((_)=>{NT(_,document.documentElement),eS(_.directory??null)});})();
