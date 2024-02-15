"use strict";(self.webpackChunkLogIn=self.webpackChunkLogIn||[]).push([[8382],{2939:(j,v,s)=>{s.r(v),s.d(v,{ion_menu:()=>A,ion_menu_button:()=>L,ion_menu_toggle:()=>I});var l=s(5861),i=s(9942),x=s(4510),y=s(2019),h=s(512),c=s(2413),_=s(2936),o=s(5551),r=s(4459),d=s(1076);s(1848),s(4913);const C='[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .ion-focusable:not([tabindex^="-"])',A=class{constructor(t){(0,i.r)(this,t),this.ionWillOpen=(0,i.d)(this,"ionWillOpen",7),this.ionWillClose=(0,i.d)(this,"ionWillClose",7),this.ionDidOpen=(0,i.d)(this,"ionDidOpen",7),this.ionDidClose=(0,i.d)(this,"ionDidClose",7),this.ionMenuChange=(0,i.d)(this,"ionMenuChange",7),this.lastOnEnd=0,this.blocker=y.G.createBlocker({disableScroll:!0}),this.didLoad=!1,this.operationCancelled=!1,this.isAnimating=!1,this._isOpen=!1,this.inheritedAttributes={},this.handleFocus=e=>{const n=(0,_.q)(document);n&&!n.contains(this.el)||this.trapKeyboardFocus(e,document)},this.isPaneVisible=!1,this.isEndSide=!1,this.contentId=void 0,this.menuId=void 0,this.type=void 0,this.disabled=!1,this.side="start",this.swipeGesture=!0,this.maxEdgeStart=50}typeChanged(t,e){const n=this.contentEl;n&&(void 0!==e&&n.classList.remove(`menu-content-${e}`),n.classList.add(`menu-content-${t}`),n.removeAttribute("style")),this.menuInnerEl&&this.menuInnerEl.removeAttribute("style"),this.animation=void 0}disabledChanged(){this.updateState(),this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})}sideChanged(){this.isEndSide=(0,h.p)(this.side),this.animation=void 0}swipeGestureChanged(){this.updateState()}connectedCallback(){var t=this;return(0,l.Z)(function*(){typeof customElements<"u"&&null!=customElements&&(yield customElements.whenDefined("ion-menu")),void 0===t.type&&(t.type=o.c.get("menuType","overlay"));const e=void 0!==t.contentId?document.getElementById(t.contentId):null;null!==e?(t.el.contains(e)&&console.error('Menu: "contentId" should refer to the main view\'s ion-content, not the ion-content inside of the ion-menu.'),t.contentEl=e,e.classList.add("menu-content"),t.typeChanged(t.type,void 0),t.sideChanged(),c.m._register(t),t.menuChanged(),t.gesture=(yield Promise.resolve().then(s.bind(s,6535))).createGesture({el:document,gestureName:"menu-swipe",gesturePriority:30,threshold:10,blurOnStart:!0,canStart:n=>t.canStart(n),onWillStart:()=>t.onWillStart(),onStart:()=>t.onStart(),onMove:n=>t.onMove(n),onEnd:n=>t.onEnd(n)}),t.updateState()):console.error('Menu: must have a "content" element to listen for drag events on.')})()}componentWillLoad(){this.inheritedAttributes=(0,h.i)(this.el)}componentDidLoad(){var t=this;return(0,l.Z)(function*(){t.didLoad=!0,t.menuChanged(),t.updateState()})()}menuChanged(){this.didLoad&&this.ionMenuChange.emit({disabled:this.disabled,open:this._isOpen})}disconnectedCallback(){var t=this;return(0,l.Z)(function*(){yield t.close(!1),t.blocker.destroy(),c.m._unregister(t),t.animation&&t.animation.destroy(),t.gesture&&(t.gesture.destroy(),t.gesture=void 0),t.animation=void 0,t.contentEl=void 0})()}onSplitPaneChanged(t){const{target:e}=t;e===this.el.closest("ion-split-pane")&&(this.isPaneVisible=t.detail.isPane(this.el),this.updateState())}onBackdropClick(t){this._isOpen&&this.lastOnEnd<t.timeStamp-100&&t.composedPath&&!t.composedPath().includes(this.menuInnerEl)&&(t.preventDefault(),t.stopPropagation(),this.close())}onKeydown(t){"Escape"===t.key&&this.close()}isOpen(){return Promise.resolve(this._isOpen)}isActive(){return Promise.resolve(this._isActive())}open(t=!0){return this.setOpen(!0,t)}close(t=!0){return this.setOpen(!1,t)}toggle(t=!0){return this.setOpen(!this._isOpen,t)}setOpen(t,e=!0){return c.m._setOpen(this,t,e)}focusFirstDescendant(){const{el:t}=this,e=t.querySelector(C);e?e.focus():t.focus()}focusLastDescendant(){const{el:t}=this,e=Array.from(t.querySelectorAll(C)),n=e.length>0?e[e.length-1]:null;n?n.focus():t.focus()}trapKeyboardFocus(t,e){const n=t.target;n&&(this.el.contains(n)?this.lastFocus=n:(this.focusFirstDescendant(),this.lastFocus===e.activeElement&&this.focusLastDescendant()))}_setOpen(t,e=!0){var n=this;return(0,l.Z)(function*(){return!(!n._isActive()||n.isAnimating||t===n._isOpen||(n.beforeAnimation(t),yield n.loadAnimation(),yield n.startAnimation(t,e),n.operationCancelled?(n.operationCancelled=!1,1):(n.afterAnimation(t),0)))})()}loadAnimation(){var t=this;return(0,l.Z)(function*(){const e=t.menuInnerEl.offsetWidth,n=(0,h.p)(t.side);if(e===t.width&&void 0!==t.animation&&n===t.isEndSide)return;t.width=e,t.isEndSide=n,t.animation&&(t.animation.destroy(),t.animation=void 0);const a=t.animation=yield c.m._createAnimation(t.type,t);o.c.getBoolean("animated",!0)||a.duration(0),a.fill("both")})()}startAnimation(t,e){var n=this;return(0,l.Z)(function*(){const a=!t,m=(0,o.b)(n),p="ios"===m?"cubic-bezier(0.32,0.72,0,1)":"cubic-bezier(0.0,0.0,0.2,1)",u="ios"===m?"cubic-bezier(1, 0, 0.68, 0.28)":"cubic-bezier(0.4, 0, 0.6, 1)",f=n.animation.direction(a?"reverse":"normal").easing(a?u:p);e?yield f.play():f.play({sync:!0}),"reverse"===f.getDirection()&&f.direction("normal")})()}_isActive(){return!this.disabled&&!this.isPaneVisible}canSwipe(){return this.swipeGesture&&!this.isAnimating&&this._isActive()}canStart(t){return!(document.querySelector("ion-modal.show-modal")||!this.canSwipe())&&(!!this._isOpen||!c.m._getOpenSync()&&F(window,t.currentX,this.isEndSide,this.maxEdgeStart))}onWillStart(){return this.beforeAnimation(!this._isOpen),this.loadAnimation()}onStart(){this.isAnimating&&this.animation?this.animation.progressStart(!0,this._isOpen?1:0):(0,h.o)(!1,"isAnimating has to be true")}onMove(t){if(!this.isAnimating||!this.animation)return void(0,h.o)(!1,"isAnimating has to be true");const n=O(t.deltaX,this._isOpen,this.isEndSide)/this.width;this.animation.progressStep(this._isOpen?1-n:n)}onEnd(t){if(!this.isAnimating||!this.animation)return void(0,h.o)(!1,"isAnimating has to be true");const e=this._isOpen,n=this.isEndSide,a=O(t.deltaX,e,n),m=this.width,p=a/m,u=t.velocityX,f=m/2,z=u>=0&&(u>.2||t.deltaX>f),T=u<=0&&(u<-.2||t.deltaX<-f),b=e?n?z:T:n?T:z;let W=!e&&b;e&&!b&&(W=!0),this.lastOnEnd=t.currentTime;let k=b?.001:-.001;k+=(0,x.g)([0,0],[.4,0],[.6,1],[1,1],(0,h.l)(0,p<0?.01:p,.9999))[0]||0;const X=this._isOpen?!b:b;this.animation.easing("cubic-bezier(0.4, 0.0, 0.6, 1)").onFinish(()=>this.afterAnimation(W),{oneTimeCallback:!0}).progressEnd(X?1:0,this._isOpen?1-k:k,300)}beforeAnimation(t){(0,h.o)(!this.isAnimating,"_before() should not be called while animating"),this.el.classList.add(D),this.el.setAttribute("tabindex","0"),this.backdropEl&&this.backdropEl.classList.add(M),this.contentEl&&(this.contentEl.classList.add(S),this.contentEl.setAttribute("aria-hidden","true")),this.blocker.block(),this.isAnimating=!0,t?this.ionWillOpen.emit():this.ionWillClose.emit()}afterAnimation(t){var e;this._isOpen=t,this.isAnimating=!1,this._isOpen||this.blocker.unblock(),t?(this.ionDidOpen.emit(),(null===(e=document.activeElement)||void 0===e?void 0:e.closest("ion-menu"))!==this.el&&this.el.focus(),document.addEventListener("focus",this.handleFocus,!0)):(this.el.classList.remove(D),this.el.removeAttribute("tabindex"),this.contentEl&&(this.contentEl.classList.remove(S),this.contentEl.removeAttribute("aria-hidden")),this.backdropEl&&this.backdropEl.classList.remove(M),this.animation&&this.animation.stop(),this.ionDidClose.emit(),document.removeEventListener("focus",this.handleFocus,!0))}updateState(){const t=this._isActive();this.gesture&&this.gesture.enable(t&&this.swipeGesture),t||(this.isAnimating&&(this.operationCancelled=!0),this.afterAnimation(!1))}render(){const{type:t,disabled:e,isPaneVisible:n,inheritedAttributes:a,side:m}=this,p=(0,o.b)(this);return(0,i.h)(i.H,{role:"navigation","aria-label":a["aria-label"]||"menu",class:{[p]:!0,[`menu-type-${t}`]:!0,"menu-enabled":!e,[`menu-side-${m}`]:!0,"menu-pane-visible":n}},(0,i.h)("div",{class:"menu-inner",part:"container",ref:u=>this.menuInnerEl=u},(0,i.h)("slot",null)),(0,i.h)("ion-backdrop",{ref:u=>this.backdropEl=u,class:"menu-backdrop",tappable:!1,stopPropagation:!1,part:"backdrop"}))}get el(){return(0,i.f)(this)}static get watchers(){return{type:["typeChanged"],disabled:["disabledChanged"],side:["sideChanged"],swipeGesture:["swipeGestureChanged"]}}},O=(t,e,n)=>Math.max(0,e!==n?-t:t),F=(t,e,n,a)=>n?e>=t.innerWidth-a:e<=a,D="show-menu",M="show-backdrop",S="menu-content-open";A.style={ios:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{-webkit-transform:translateX(-9999px);transform:translateX(-9999px);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;top:0;bottom:0}@supports (inset-inline-start: 0){:host(.menu-side-start) .menu-inner{inset-inline-start:0;inset-inline-end:auto}}@supports not (inset-inline-start: 0){:host(.menu-side-start) .menu-inner{left:0;right:auto}:host-context([dir=rtl]):host(.menu-side-start) .menu-inner,:host-context([dir=rtl]).menu-side-start .menu-inner{left:unset;right:unset;left:auto;right:0}@supports selector(:dir(rtl)){:host(.menu-side-start:dir(rtl)) .menu-inner{left:unset;right:unset;left:auto;right:0}}}:host-context([dir=rtl]):host(.menu-side-start) .menu-inner,:host-context([dir=rtl]).menu-side-start .menu-inner{--ion-safe-area-right:unset;--ion-safe-area-left:0px}@supports selector(:dir(rtl)){:host(.menu-side-start:dir(rtl)) .menu-inner{--ion-safe-area-right:unset;--ion-safe-area-left:0px}}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;top:0;bottom:0}@supports (inset-inline-start: 0){:host(.menu-side-end) .menu-inner{inset-inline-start:auto;inset-inline-end:0}}@supports not (inset-inline-start: 0){:host(.menu-side-end) .menu-inner{left:auto;right:0}:host-context([dir=rtl]):host(.menu-side-end) .menu-inner,:host-context([dir=rtl]).menu-side-end .menu-inner{left:unset;right:unset;left:0;right:auto}@supports selector(:dir(rtl)){:host(.menu-side-end:dir(rtl)) .menu-inner{left:unset;right:unset;left:0;right:auto}}}:host-context([dir=rtl]):host(.menu-side-end) .menu-inner,:host-context([dir=rtl]).menu-side-end .menu-inner{--ion-safe-area-left:unset;--ion-safe-area-right:0px}@supports selector(:dir(rtl)){:host(.menu-side-end:dir(rtl)) .menu-inner{--ion-safe-area-left:unset;--ion-safe-area-right:0px}}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none;transform:none;-webkit-box-shadow:none;box-shadow:none}:host(.menu-pane-visible) ion-backdrop{display:hidden !important}:host(.menu-type-push){z-index:1000}:host(.menu-type-push) .show-backdrop{display:block}",md:":host{--width:304px;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--background:var(--ion-background-color, #fff);left:0;right:0;top:0;bottom:0;display:none;position:absolute;contain:strict}:host(.show-menu){display:block}.menu-inner{-webkit-transform:translateX(-9999px);transform:translateX(-9999px);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);contain:strict}:host(.menu-side-start) .menu-inner{--ion-safe-area-right:0px;top:0;bottom:0}@supports (inset-inline-start: 0){:host(.menu-side-start) .menu-inner{inset-inline-start:0;inset-inline-end:auto}}@supports not (inset-inline-start: 0){:host(.menu-side-start) .menu-inner{left:0;right:auto}:host-context([dir=rtl]):host(.menu-side-start) .menu-inner,:host-context([dir=rtl]).menu-side-start .menu-inner{left:unset;right:unset;left:auto;right:0}@supports selector(:dir(rtl)){:host(.menu-side-start:dir(rtl)) .menu-inner{left:unset;right:unset;left:auto;right:0}}}:host-context([dir=rtl]):host(.menu-side-start) .menu-inner,:host-context([dir=rtl]).menu-side-start .menu-inner{--ion-safe-area-right:unset;--ion-safe-area-left:0px}@supports selector(:dir(rtl)){:host(.menu-side-start:dir(rtl)) .menu-inner{--ion-safe-area-right:unset;--ion-safe-area-left:0px}}:host(.menu-side-end) .menu-inner{--ion-safe-area-left:0px;top:0;bottom:0}@supports (inset-inline-start: 0){:host(.menu-side-end) .menu-inner{inset-inline-start:auto;inset-inline-end:0}}@supports not (inset-inline-start: 0){:host(.menu-side-end) .menu-inner{left:auto;right:0}:host-context([dir=rtl]):host(.menu-side-end) .menu-inner,:host-context([dir=rtl]).menu-side-end .menu-inner{left:unset;right:unset;left:0;right:auto}@supports selector(:dir(rtl)){:host(.menu-side-end:dir(rtl)) .menu-inner{left:unset;right:unset;left:0;right:auto}}}:host-context([dir=rtl]):host(.menu-side-end) .menu-inner,:host-context([dir=rtl]).menu-side-end .menu-inner{--ion-safe-area-left:unset;--ion-safe-area-right:0px}@supports selector(:dir(rtl)){:host(.menu-side-end:dir(rtl)) .menu-inner{--ion-safe-area-left:unset;--ion-safe-area-right:0px}}ion-backdrop{display:none;opacity:0.01;z-index:-1}@media (max-width: 340px){.menu-inner{--width:264px}}:host(.menu-type-reveal){z-index:0}:host(.menu-type-reveal.show-menu) .menu-inner{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}:host(.menu-type-overlay){z-index:1000}:host(.menu-type-overlay) .show-backdrop{display:block;cursor:pointer}:host(.menu-pane-visible){width:var(--width);min-width:var(--min-width);max-width:var(--max-width)}:host(.menu-pane-visible) .menu-inner{left:0;right:0;width:auto;-webkit-transform:none;transform:none;-webkit-box-shadow:none;box-shadow:none}:host(.menu-pane-visible) ion-backdrop{display:hidden !important}:host(.menu-type-overlay) .menu-inner{-webkit-box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18);box-shadow:4px 0px 16px rgba(0, 0, 0, 0.18)}"};const P=function(){var t=(0,l.Z)(function*(e){const n=yield c.m.get(e);return!(!n||!(yield n.isActive()))});return function(n){return t.apply(this,arguments)}}(),L=class{constructor(t){var e=this;(0,i.r)(this,t),this.inheritedAttributes={},this.onClick=(0,l.Z)(function*(){return c.m.toggle(e.menu)}),this.visible=!1,this.color=void 0,this.disabled=!1,this.menu=void 0,this.autoHide=!0,this.type="button"}componentWillLoad(){this.inheritedAttributes=(0,h.i)(this.el)}componentDidLoad(){this.visibilityChanged()}visibilityChanged(){var t=this;return(0,l.Z)(function*(){t.visible=yield P(t.menu)})()}render(){const{color:t,disabled:e,inheritedAttributes:n}=this,a=(0,o.b)(this),m=o.c.get("menuIcon","ios"===a?d.u:d.v),p=this.autoHide&&!this.visible,u={type:this.type},f=n["aria-label"]||"menu";return(0,i.h)(i.H,{onClick:this.onClick,"aria-disabled":e?"true":null,"aria-hidden":p?"true":null,class:(0,r.c)(t,{[a]:!0,button:!0,"menu-button-hidden":p,"menu-button-disabled":e,"in-toolbar":(0,r.h)("ion-toolbar",this.el),"in-toolbar-color":(0,r.h)("ion-toolbar[color]",this.el),"ion-activatable":!0,"ion-focusable":!0})},(0,i.h)("button",Object.assign({},u,{disabled:e,class:"button-native",part:"native","aria-label":f}),(0,i.h)("span",{class:"button-inner"},(0,i.h)("slot",null,(0,i.h)("ion-icon",{part:"icon",icon:m,mode:a,lazy:!1,"aria-hidden":"true"}))),"md"===a&&(0,i.h)("ion-ripple-effect",{type:"unbounded"})))}get el(){return(0,i.f)(this)}};L.style={ios:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.1;--border-radius:4px;--color:var(--ion-color-primary, #3880ff);--padding-start:5px;--padding-end:5px;min-height:32px;font-size:clamp(31px, 1.9375rem, 38.13px)}:host(.ion-activated){opacity:0.4}@media (any-hover: hover){:host(:hover){opacity:0.6}}',md:':host{--background:transparent;--color-focused:currentColor;--border-radius:initial;--padding-top:0;--padding-bottom:0;color:var(--color);text-align:center;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}.button-native{border-radius:var(--border-radius);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit;border:0;outline:none;background:var(--background);line-height:1;cursor:pointer;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.button-inner{display:-ms-flexbox;display:flex;position:relative;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;min-height:inherit;z-index:1}ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;pointer-events:none}:host(.menu-button-hidden){display:none}:host(.menu-button-disabled){cursor:default;opacity:0.5;pointer-events:none}:host(.ion-focused) .button-native{color:var(--color-focused)}:host(.ion-focused) .button-native::after{background:var(--background-focused);opacity:var(--background-focused-opacity)}.button-native::after{left:0;right:0;top:0;bottom:0;position:absolute;content:"";opacity:0}@media (any-hover: hover){:host(:hover) .button-native{color:var(--color-hover)}:host(:hover) .button-native::after{background:var(--background-hover);opacity:var(--background-hover-opacity, 0)}}:host(.ion-color) .button-native{color:var(--ion-color-base)}:host(.in-toolbar:not(.in-toolbar-color)){color:var(--ion-toolbar-color, var(--color))}:host{--background-focused:currentColor;--background-focused-opacity:.12;--background-hover:currentColor;--background-hover-opacity:.04;--border-radius:50%;--color:initial;--padding-start:8px;--padding-end:8px;width:3rem;height:3rem;font-size:1.5rem}:host(.ion-color.ion-focused)::after{background:var(--ion-color-base)}@media (any-hover: hover){:host(.ion-color:hover) .button-native::after{background:var(--ion-color-base)}}'};const I=class{constructor(t){(0,i.r)(this,t),this.onClick=()=>c.m.toggle(this.menu),this.visible=!1,this.menu=void 0,this.autoHide=!0}connectedCallback(){this.visibilityChanged()}visibilityChanged(){var t=this;return(0,l.Z)(function*(){t.visible=yield P(t.menu)})()}render(){const t=(0,o.b)(this),e=this.autoHide&&!this.visible;return(0,i.h)(i.H,{onClick:this.onClick,"aria-hidden":e?"true":null,class:{[t]:!0,"menu-toggle-hidden":e}},(0,i.h)("slot",null))}};I.style=":host(.menu-toggle-hidden){display:none}"},4459:(j,v,s)=>{s.d(v,{c:()=>x,g:()=>h,h:()=>i,o:()=>_});var l=s(5861);const i=(o,r)=>null!==r.closest(o),x=(o,r)=>"string"==typeof o&&o.length>0?Object.assign({"ion-color":!0,[`ion-color-${o}`]:!0},r):r,h=o=>{const r={};return(o=>void 0!==o?(Array.isArray(o)?o:o.split(" ")).filter(d=>null!=d).map(d=>d.trim()).filter(d=>""!==d):[])(o).forEach(d=>r[d]=!0),r},c=/^[a-z][a-z0-9+\-.]*:/,_=function(){var o=(0,l.Z)(function*(r,d,w,E){if(null!=r&&"#"!==r[0]&&!c.test(r)){const g=document.querySelector("ion-router");if(g)return d?.preventDefault(),g.push(r,w,E)}return!1});return function(d,w,E,g){return o.apply(this,arguments)}}()}}]);