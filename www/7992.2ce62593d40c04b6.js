"use strict";(self.webpackChunkLogIn=self.webpackChunkLogIn||[]).push([[7992],{7992:(y,c,s)=>{s.r(c),s.d(c,{HomePageModule:()=>S});var i=s(6814),u=s(95),a=s(451),r=s(4573),t=s(6689),m=s(9193),h=s(2640),g=s(6471),d=s(7947);const v=[{path:"",component:(()=>{class e{constructor(n,o){this.utilsSvc=n,this.userSvc=o}ngOnInit(){this.userName=this.userSvc.getLastUser()?.userName}singOut(){return this.utilsSvc.presentAlert({header:"Cerrar sesi\xf3n",message:"\xbfSeguro que deseas cerrar sesi\xf3n?",buttons:[{text:"Cancelar",role:"cancel"},{text:"Si, cerrar",handler:()=>{this.userSvc.setLoggedUser(!1),this.utilsSvc.routerLink("/login")}}]})}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(m.f),t.Y36(h.K))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:8,vars:11,consts:[["type","home","title","Home",3,"label"],["shape","round",3,"click"],["slot","end","name","log-out-outline"]],template:function(o,l){1&o&&(t._UZ(0,"app-header",0),t.ALo(1,"async"),t.ALo(2,"translate"),t.TgZ(3,"ion-button",1),t.NdJ("click",function(){return l.singOut()}),t._uU(4),t.ALo(5,"async"),t.ALo(6,"translate"),t._UZ(7,"ion-icon",2),t.qZA()),2&o&&(t.hYB("label","",t.lcZ(1,3,t.lcZ(2,5,"Welcome")),": ",l.userName,""),t.xp6(4),t.hij(" ",t.lcZ(5,7,t.lcZ(6,9,"LogOut"))," "))},dependencies:[a.YG,a.gu,g.G,i.Ov,d.X]})}return e})()}];let p=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#s=this.\u0275inj=t.cJS({imports:[r.Bz.forChild(v),r.Bz]})}return e})();var f=s(822),L=s(2898);let S=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#s=this.\u0275inj=t.cJS({imports:[i.ez,u.u5,a.Pc,p,f.K,L.D]})}return e})()}}]);