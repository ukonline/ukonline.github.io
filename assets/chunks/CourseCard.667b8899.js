import{_ as a,o as n,c as _,x as e,t as r,a as c}from"./framework.0e180df0.js";const u={props:{course:{type:Object,required:!0}},computed:{authors(){const s=this.course.authors;return s.length===1?s[0]:`${s.slice(0,-1).join(", ")} et ${s.at(-1)}`}}},i=["href"],l=["src"],d={class:"description"},h={class:"authors"};function p(s,f,t,m,v,o){return n(),_("a",{href:t.course.link,class:"card"},[e("img",{src:t.course.cover,class:"cover"},null,8,l),e("div",d,[e("h2",null,r(t.course.title),1),e("p",null,r(t.course.description),1),e("span",h,[c(" Par "),e("i",null,r(o.authors),1),c(". ")])])],8,i)}const C=a(u,[["render",p],["__scopeId","data-v-16aa0388"]]);export{C};
