"use strict";(self["webpackChunkvue3_admin_common"]=self["webpackChunkvue3_admin_common"]||[]).push([[535],{57:function(e,a,l){l.r(a),l.d(a,{default:function(){return k}});l(7658);var s=l(3396),n=l(7139),r=l(4870),o=l(65),u=l(2483),t=l(4689),i=l(9069);const d=()=>(e,a,l)=>{a.length<6?l(new Error(i.Z.global.t("msg.login.passwordRule"))):l()};var m=l(2762),p=l(5941);const c={class:"login-container"},g={class:"title-container"},v={class:"title"},w={class:"svg-container"},_={class:"svg-container"},f=["innerHTML"];var h={__name:"index",setup(e){const a=(0,r.iH)({username:"super-admin",password:"123456"}),l=(0,m.QT)(),i=(0,r.iH)({username:[{required:!0,trigger:"blur",message:l.t("msg.login.usernameRule")}],password:[{required:!0,trigger:"blur",validator:d()}]}),h=(0,r.iH)("password"),y=()=>{h.value="password"===h.value?"text":"password"},W=(0,r.iH)(!1),k=(0,o.oR)(),b=(0,r.iH)(null),H=(0,u.tv)(),V=()=>{b.value.validate((async e=>{try{if(!e)return;W.value=!0,await k.dispatch("user/login",a.value),W.value=!1,H.push("/")}catch(l){p.log("[ user/login error ]",l.response),W.value=!1}}))};return(e,l)=>{const o=(0,s.up)("svg-icon"),u=(0,s.up)("el-input"),d=(0,s.up)("el-form-item"),m=(0,s.up)("el-button"),p=(0,s.up)("el-form");return(0,s.wg)(),(0,s.iD)("div",c,[(0,s.Wm)(p,{ref_key:"loginFormRef",ref:b,class:"login-form",model:a.value,rules:i.value},{default:(0,s.w5)((()=>[(0,s._)("div",g,[(0,s._)("h3",v,(0,n.zw)(e.$t("msg.login.title")),1),(0,s.Wm)((0,r.SU)(t.Z),{class:"lang-select"})]),(0,s.Wm)(d,{prop:"username"},{default:(0,s.w5)((()=>[(0,s._)("span",w,[(0,s.Wm)(o,{icon:"user"})]),(0,s.Wm)(u,{placeholder:"username",name:"username",type:"username",modelValue:a.value.username,"onUpdate:modelValue":l[0]||(l[0]=e=>a.value.username=e)},null,8,["modelValue"])])),_:1}),(0,s.Wm)(d,{prop:"password"},{default:(0,s.w5)((()=>[(0,s._)("span",_,[(0,s.Wm)(o,{icon:"password"})]),(0,s.Wm)(u,{placeholder:"password",name:"password",modelValue:a.value.password,"onUpdate:modelValue":l[1]||(l[1]=e=>a.value.password=e),type:h.value},null,8,["modelValue","type"]),(0,s._)("span",{class:"show-pwd",onClick:y},[(0,s.Wm)(o,{icon:"password"===h.value?"eye":"eye-open"},null,8,["icon"])])])),_:1}),(0,s.Wm)(m,{type:"primary",class:"login-btn",onClick:V,loading:W.value},{default:(0,s.w5)((()=>[(0,s.Uk)((0,n.zw)(e.$t("msg.login.loginBtn")),1)])),_:1},8,["loading"]),(0,s._)("div",{class:"tips",innerHTML:e.$t("msg.login.desc")},null,8,f)])),_:1},8,["model","rules"])])}}},y=l(89);const W=(0,y.Z)(h,[["__scopeId","data-v-171281e5"]]);var k=W}}]);
//# sourceMappingURL=login.cee2e9ab.js.map