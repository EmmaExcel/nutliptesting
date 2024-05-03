import{$ as N,S as x,R as T,L as b,T as M,U as k,V as z,X as D,Y as I,Z as O}from"./index-GxelU0FC.js";function R(w){if(w.length>=255)throw new TypeError("Alphabet too long");for(var n=new Uint8Array(256),v=0;v<n.length;v++)n[v]=255;for(var p=0;p<w.length;p++){var c=w.charAt(p),A=c.charCodeAt(0);if(n[A]!==255)throw new TypeError(c+" is ambiguous");n[A]=p}var l=w.length,E=w.charAt(0),y=Math.log(l)/Math.log(256),u=Math.log(256)/Math.log(l);function m(e){if(e instanceof Uint8Array||(ArrayBuffer.isView(e)?e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength):Array.isArray(e)&&(e=Uint8Array.from(e))),!(e instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(e.length===0)return"";for(var t=0,g=0,a=0,i=e.length;a!==i&&e[a]===0;)a++,t++;for(var s=(i-a)*u+1>>>0,r=new Uint8Array(s);a!==i;){for(var h=e[a],f=0,o=s-1;(h!==0||f<g)&&o!==-1;o--,f++)h+=256*r[o]>>>0,r[o]=h%l>>>0,h=h/l>>>0;if(h!==0)throw new Error("Non-zero carry");g=f,a++}for(var d=s-g;d!==s&&r[d]===0;)d++;for(var C=E.repeat(t);d<s;++d)C+=w.charAt(r[d]);return C}function U(e){if(typeof e!="string")throw new TypeError("Expected String");if(e.length===0)return new Uint8Array;for(var t=0,g=0,a=0;e[t]===E;)g++,t++;for(var i=(e.length-t)*y+1>>>0,s=new Uint8Array(i);e[t];){var r=n[e.charCodeAt(t)];if(r===255)return;for(var h=0,f=i-1;(r!==0||h<a)&&f!==-1;f--,h++)r+=l*s[f]>>>0,s[f]=r%256>>>0,r=r/256>>>0;if(r!==0)throw new Error("Non-zero carry");a=h,t++}for(var o=i-a;o!==i&&s[o]===0;)o++;for(var d=new Uint8Array(g+(i-o)),C=g;o!==i;)d[C++]=s[o++];return d}function S(e){var t=U(e);if(t)return t;throw new Error("Non-base"+l+" character")}return{encode:m,decodeUnsafe:U,decode:S}}var q=R;const F=q,B="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";var V=F(B);const _=N(V);class W extends x{async authenticateUser(){var n;if(!this.provider||!((n=this.chainConfig)!==null&&n!==void 0&&n.chainId))throw T.notConnectedError();const{chainNamespace:v,chainId:p}=this.chainConfig;if(this.status!==b.CONNECTED)throw T.notConnectedError("Not connected with wallet, Please login/connect first");const c=await this.provider.request({method:"getAccounts"});if(c&&c.length>0){const A=M(c[0],this.name);if(A&&!k(A))return{idToken:A};const l={domain:window.location.origin,uri:window.location.href,address:c[0],chainId:parseInt(p,16),version:"1",nonce:Math.random().toString(36).slice(2),issuedAt:new Date().toISOString()},E=await z(l,v),y=new TextEncoder().encode(E),u=await this.provider.request({method:"signMessage",params:{message:y,display:"utf8"}}),m=await D(v,_.encode(u),E,this.name,this.sessionTime);return I(c[0],this.name,m),{idToken:m}}throw T.notConnectedError("Not connected with wallet, Please login/connect first")}async disconnect(){if(this.status!==b.CONNECTED)throw T.disconnectionError("Not connected with wallet");const n=await this.provider.request({method:"getAccounts"});n&&n.length>0&&O(n[0],this.name)}}export{W as B};
