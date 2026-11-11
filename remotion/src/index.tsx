import React,{useLayoutEffect,useRef,useState} from 'react';
import {AbsoluteFill,Audio,Composition,Img,staticFile,useCurrentFrame,registerRoot,delayRender,continueRender,Sequence} from 'remotion';
import * as THREE from './scene/vendor/three.module.js';
import {createHezeGrowth} from './scene/heze-growth.js';
const green='#c5f788',muted='#a5b2b7',clamp=(n:number)=>Math.max(0,Math.min(1,n)),ease=(n:number)=>1-Math.pow(1-clamp(n),3);
function Nature(){const frame=useCurrentFrame(),canvas=useRef<HTMLCanvasElement>(null),data=useRef<any>(null);const [handle]=useState(()=>delayRender('Willow scene'));useLayoutEffect(()=>{const renderer=new THREE.WebGLRenderer({canvas:canvas.current!,antialias:true});renderer.setSize(1920,1080);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;data.current={renderer,tree:createHezeGrowth()};return ()=>renderer.dispose()},[]);useLayoutEffect(()=>{const d=data.current;if(d){d.tree.update(7.8+frame/30,1920/1080);d.renderer.render(d.tree.scene,d.tree.camera);continueRender(handle)}},[frame,handle]);return <canvas ref={canvas} style={{width:'100%',height:'100%'}}/>}
const Label=({children}:any)=><div style={{fontSize:19,letterSpacing:5,color:green,marginBottom:25}}>{children}</div>;
const Big=({children}:any)=><div style={{fontSize:94,lineHeight:1.22,fontWeight:600,letterSpacing:-2}}>{children}</div>;

const starts=[0,4,7,12,18,25],ends=[4,7,12,18,25,30];
const smooth=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const cutFrames=18;
function Scene({scene}: {scene:number}){
 const f=useCurrentFrame(),local=f/30,t=starts[scene]+local;
 const enter=smooth(f/cutFrames),exit=smooth((local-(ends[scene]-starts[scene]))/.6);
 let transform='',clipPath:string|undefined,opacity=1;
 if(scene===0){opacity=smooth(f/15);transform=`scale(${1.025-enter*.025})`}
 if(scene===1){transform=`translateX(${(1-enter)*1920}px) scale(${1+(1-enter)*.12})`}
 if(scene===2){clipPath=`circle(${enter*145}% at 70% 48%)`;transform=`scale(${1.16-enter*.16})`}
 if(scene===3){clipPath=`polygon(0 0,${enter*125}% 0,${enter*125-25}% 100%,0 100%)`;transform=`translateX(${(1-enter)*100}px)`}
 if(scene===4){transform=`translateY(${(1-enter)*1080}px) scale(${.94+enter*.06})`}
 if(scene===5){clipPath=`inset(${(1-enter)*50}% 0 round ${(1-enter)*70}px)`;transform=`scale(${1.12-enter*.12})`}
 const nextTransform=scene===0?`translateX(${-exit*200}px)`:scene===1?`scale(${1+exit*.3})`:scene===2?`translateX(${-exit*120}px)`:scene===3?`translateY(${-exit*160}px) scale(${1-exit*.05})`:`scale(${1-exit*.08})`;
 return <AbsoluteFill style={{opacity,clipPath,transform,overflow:'hidden',background:'#070b10'}}><AbsoluteFill style={{transform:nextTransform}}>
 {/* Space-only decoration must not overlay the daylight WebGL canvas. */}
 {scene!==2&&<AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 40%,#152c35,transparent 70%)'}}/>}
 {scene!==2&&Array.from({length:70},(_,i)=><div key={i} style={{position:'absolute',left:(i*163.7)%1920,top:((i*131.3-t*(3+i%5))+2160)%1080,width:2,height:2,borderRadius:'50%',background:'#e7f3fa',opacity:.15+(Math.sin(t*.6+i)+1)*.1}}/>)}
{scene===0&&<><div style={{position:'absolute',left:130,top:280}}><Label>HE JIACHEN / PERSONAL SPACE</Label><Big>你好，<br/>我是<span style={{color:green}}>贺佳琛。</span></Big><p style={{fontSize:29,color:muted,marginTop:35}}>所有远行，都有来处。</p></div><div style={{position:'absolute',right:130,top:115,width:650,height:850,borderRadius:28,overflow:'hidden'}}><Img src={staticFile('jiachen-studio-portrait.png')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'50% 40%',transform:`scale(${1.02+t*.006})`}}/></div></>}
{scene===1&&<><div style={{position:'absolute',right:170,top:150,width:750,height:750,borderRadius:'50%',overflow:'hidden',boxShadow:'0 0 100px #56bbff35,0 0 0 3px #77cbff60'}}><Img src={staticFile('earth.jpg')} style={{width:'200%',height:'100%',objectFit:'cover',transform:`translateX(${-27-local*.8}%)`}}/><AbsoluteFill style={{borderRadius:'50%',background:'radial-gradient(circle at 35% 30%,transparent 25%,#02050c44 62%,#010309ef 95%)',boxShadow:'inset 0 0 80px #7fcaff66'}}/></div><div style={{position:'absolute',left:130,top:300}}><Label>01 / BACK TO MY ORIGIN</Label><Big>我的故事，<br/>从<span style={{color:green}}>菏泽</span>开始。</Big><p style={{marginTop:40,fontSize:25,letterSpacing:5,color:muted}}>山东 · 菏泽</p></div></>}
{scene===2&&<><Nature/><AbsoluteFill style={{background:'linear-gradient(90deg,#11170cda,transparent 65%),linear-gradient(0deg,#10160b55,transparent 50%)'}}/><div style={{position:'absolute',left:130,top:290,maxWidth:710}}><Label>02 / ROOTED IN HOME</Label><Big>向下扎根，<br/>向上<span style={{color:green}}>生长。</span></Big><p style={{fontSize:27,color:'#e1e9d5',marginTop:32}}>从一株新苗，到一树新绿。</p></div></>}
{scene===3&&<><div style={{position:'absolute',left:130,top:220}}><Label>03 / PERSONAL JOURNEY</Label><Big>不止一种经历，<br/>不止一种<span style={{color:green}}>可能。</span></Big><p style={{fontSize:27,color:muted,marginTop:35}}>在不同的工作里，积累自己的故事。</p></div><div style={{position:'absolute',right:130,top:195,width:650}}>{[['01','美发行业','五年经历'],['02','家装设计师','空间设计'],['03','台球厅','工作经历'],['04','拼斗店','工作经历']].map((row,i)=>{const a=ease((local-i*.5)/.8);return <div key={i} style={{display:'flex',alignItems:'center',gap:28,padding:'28px 0',borderBottom:'1px solid #ffffff25',opacity:a,transform:`translateX(${(1-a)*50}px)`}}><span style={{fontSize:18,color:green}}>{row[0]}</span><strong style={{fontSize:38,fontWeight:450,flex:1}}>{row[1]}</strong><span style={{fontSize:18,color:muted}}>{row[2]}</span></div>})}</div></>}
{scene===4&&<><div style={{position:'absolute',left:100,top:155}}><Label>04 / PERSONAL MOMENTS</Label><div style={{fontSize:68,fontWeight:500}}>把生活，留在画面里。</div></div><div style={{position:'absolute',left:100,right:100,top:335,height:565,display:'flex',gap:22}}>{['jiachen-stairway.jpg','jiachen-bookstore.jpg','jiachen-billiards.jpg','jiachen-woodland.jpg'].map((name,i)=>{const a=ease((local-i*.25)/.7);return <div key={name} style={{flex:i===2?1.35:1,borderRadius:17,overflow:'hidden',transform:`translateY(${(1-a)*70}px)`,opacity:a,position:'relative'}}><Img src={staticFile(name)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:i===0?'50% 70%':i===2?'50% 40%':'50% 50%',transform:`scale(${1+local*.008})`}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 70%,#000a)'}}/><div style={{position:'absolute',bottom:24,left:22,fontSize:19,letterSpacing:2}}>{['行走之间','书页之间','桌边时光','林间漫步'][i]}</div></div>})}</div></>}
{scene===5&&<><div style={{position:'absolute',left:130,top:280}}><Label>05 / EXPLORE MY WORLD</Label><Big>我的坐标，<br/><span style={{color:green}}>不止于此。</span></Big><p style={{fontSize:28,color:muted,marginTop:38}}>贺佳琛 · 很高兴认识你。</p></div><div style={{position:'absolute',right:150,top:190,width:650,height:650,perspective:1100}}>{[0,1,2].map(i=><div key={i} style={{position:'absolute',inset:10+i*22,border:`2px solid ${['#c5fa7088','#69caff55','#bc98ff44'][i]}`,borderRadius:'50%',transform:`rotateZ(${t*13+i*55}deg) rotateX(${55+i*12}deg)`}}/>)}<div style={{position:'absolute',inset:205,transformStyle:'preserve-3d',transform:`rotateX(-20deg) rotateY(${local*27}deg)`}}>{['HJ','贺','佳','琛','✳','✳'].map((s,i)=><div key={i} style={{position:'absolute',width:240,height:240,border:'2px solid #c5fa70aa',background:'#bbf9780b',display:'grid',placeItems:'center',fontSize:70,color:green,transform:['translateZ(120px)','rotateY(180deg) translateZ(120px)','rotateY(90deg) translateZ(120px)','rotateY(-90deg) translateZ(120px)','rotateX(90deg) translateZ(120px)','rotateX(-90deg) translateZ(120px)'][i]}}>{s}</div>)}</div></div></>}

 </AbsoluteFill></AbsoluteFill>
}
function Film(){
 const f=useCurrentFrame(),t=f/30,beat=Math.exp(-((t%.5)/.5)*8),endFade=1-smooth((t-29.25)/.75);
 return <AbsoluteFill style={{background:'#070b10',color:'#f1f4ed',fontFamily:'PingFang SC, sans-serif',overflow:'hidden'}}>
 <Audio src={staticFile('rhythm-score.wav')} volume={.9}/>
 <AbsoluteFill style={{opacity:endFade}}>
 {starts.map((start,scene)=><Sequence key={scene} from={start*30} durationInFrames={Math.min(900-start*30,(ends[scene]-start)*30+cutFrames)}><Scene scene={scene}/></Sequence>)}
 {/* A single brief light accent at selected edit points, never a strobe. */}
 {[4,12,25].map(at=><AbsoluteFill key={at} style={{pointerEvents:'none',background:'linear-gradient(110deg,#d7ffc4,transparent 65%)',opacity:t>=at&&t<at+.2?Math.sin((t-at)/.2*Math.PI)*.14:0}}/>)}
 <div style={{position:'absolute',top:48,left:85,right:85,display:'flex',justifyContent:'space-between',fontSize:16,letterSpacing:4,color:'#c4d0ca',opacity:.8}}><span>HJ / PERSONAL SPACE</span><span>HE JIACHEN</span></div>
 <div style={{position:'absolute',bottom:48,left:85,right:85,height:1,background:'#ffffff22'}}><div style={{height:2,width:`${f/899*100}%`,background:green,boxShadow:`0 0 ${4+beat*9}px #c5f78888`}}/></div>
 <div style={{position:'absolute',bottom:20,left:85,fontSize:13,letterSpacing:3,color:'#9baea3'}}>贺佳琛 / 个人空间</div>
 <div style={{position:'absolute',right:85,bottom:20,display:'flex',alignItems:'center',height:18,gap:4}}>{Array.from({length:16},(_,i)=><div key={i} style={{width:3,height:3+(5+Math.sin(i*1.8+t*3)*4)*(1+beat),background:green,opacity:.5}}/>)}</div>
 </AbsoluteFill></AbsoluteFill>
}
registerRoot(()=><Composition id="JiachenIntro2026" component={Film} durationInFrames={900} fps={30} width={1920} height={1080}/>);
