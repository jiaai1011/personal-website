"""Original 30-second, 120 BPM instrumental, synthesized locally. Requires numpy."""
from pathlib import Path
import numpy as np
import wave
SR=44100
rng=np.random.default_rng(77)
mix=np.zeros((SR*30,2),np.float64)
def add(x,start,gain=1,pan=0,echo=False):
    pos=int(start*SR); off=max(0,-pos); pos=max(0,pos); n=min(len(x)-off,len(mix)-pos)
    if n<=0:return
    x=x[off:off+n]*gain
    mix[pos:pos+n,0]+=x*np.sqrt((1-pan)/2)
    mix[pos:pos+n,1]+=x*np.sqrt((1+pan)/2)
    if echo:
        for delay,amount in [(0.375,.23),(.75,.10)]:add(x,start+delay,amount,-pan)
def freq(m):return 440*2**((m-69)/12)
def pluck(m,d=.8):
    t=np.arange(int(SR*d))/SR; hz=freq(m)
    env=(1-np.exp(-t*300))*np.exp(-t*5.5)
    return (np.sin(2*np.pi*hz*t)+.28*np.sin(2*np.pi*2*hz*t)*np.exp(-t*5)+.09*np.sin(2*np.pi*3*hz*t))*env
chords=[[57,60,64,71],[53,57,60,64],[48,55,59,64],[55,59,62,69]]
# Soft, wide evolving pad: Am9 / Fmaj7 / Cmaj7 / Gadd9.
for bar in range(15):
    st=bar*2; notes=chords[(bar//2)%4]; t=np.arange(int(2.9*SR))/SR
    env=np.minimum(t/.18,1)*np.minimum((2.9-t)/.9,1)
    for j,m in enumerate(notes):
        hz=freq(m); pad=(np.sin(2*np.pi*hz*t)+.35*np.sin(2*np.pi*hz*1.003*t)+.12*np.sin(2*np.pi*hz*2*t))
        pump=1-.22*np.exp(-((t+st)%.5)*18)
        add(pad*env*pump,st,.043,(j-1.5)/2.2)
# Sub bass, kicks, claps, closed/open hats and bright syncopated notes.
for b in range(60):
    st=b*.5; chord=chords[(int(st//2)//2)%4]; quiet=7<=st<12
    if st>=2 and st<29:
        t=np.arange(int(.38*SR))/SR
        kick=np.sin(2*np.pi*(47*t+3.3*(1-np.exp(-t*35))))*np.exp(-t*15)
        kick+=rng.normal(0,1,len(t))*.035*np.exp(-t*160)
        if not quiet or b%2==0:add(kick,st,.48 if not quiet else .30)
        t=np.arange(int(.40*SR))/SR; hz=freq(chord[0]-12)
        bass=(np.sin(2*np.pi*hz*t)+.17*np.sin(4*np.pi*hz*t))*np.minimum(t/.015,1)*np.exp(-t*5)
        add(bass,st+.055,.24 if not quiet else .14)
    if st>=4 and st<29 and b%2==1 and (not quiet or b%4==3):
        t=np.arange(int(.18*SR))/SR; noise=rng.normal(size=len(t)); noise=np.r_[0,np.diff(noise)]*.42
        env=np.exp(-t*24)*(1+.5*np.cos(2*np.pi*80*t))*np.minimum(t/.003,1)
        add(noise*env,st,.12,0,True)
    for half in range(2):
        when=st+half*.25
        if when<2 or when>28.7:continue
        t=np.arange(int(.065*SR))/SR; n=rng.normal(size=len(t)); n=np.r_[0,np.diff(n)]
        hat=n*np.exp(-t*85)*np.minimum(t/.002,1)
        add(hat,when,.022 if quiet else (.035 if half else .025),(-1 if b%2 else 1)*.45)
    if st<29:
        pattern=[0,2,1,3,2,1,3,2]
        m=chord[pattern[b%8]]+12
        add(pluck(m),st+.25,.085 if not quiet else .055,np.sin(b*1.3)*.65,True)
        if 18<=st<25 and b%2==0:add(pluck(chord[1]+24,.55),st+.375,.035,.55,True)
# Sparse recognizable melody, leaving air for the type and photos.
for start,notes in [(0,[76,71,69]),(12,[76,79,76,74]),(18,[72,76,79,83]),(25,[79,76,74,71,69])]:
    for i,note in enumerate(notes):add(pluck(note,1.4),start+i*.75,.075,(-1)**i*.22,True)
# Short rising whooshes and low accents synchronize with all five picture edits.
for boundary in [4,7,12,18,25]:
    d=.55;t=np.arange(int(d*SR))/SR;noise=rng.normal(size=len(t));soft=np.convolve(noise,np.ones(12)/12,mode='same')
    env=(t/d)**2*np.sin(np.pi*t/d)**.7
    add(soft*env,boundary-d,.24,-.15)
    t=np.arange(int(.7*SR))/SR
    add(np.sin(2*np.pi*(39*t+1.2*(1-np.exp(-t*20))))*np.exp(-t*8),boundary,.23)
    n=rng.normal(size=len(t));add(n*np.exp(-t*11),boundary,.023,.4)
# Final tonic resolves and fades out.
for m in [45,57,60,64,69]:add(pluck(m,1.4),28.5,.09,0,True)
t=np.arange(len(mix))/SR
fade=np.minimum(t/.12,1)*np.minimum((30-t)/1.15,1)
mix*=fade[:,None]
mix=np.tanh(mix*1.3)
mix*=.89/np.max(np.abs(mix))
out=Path(__file__).parent/'public/rhythm-score.wav'
with wave.open(str(out),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
print(f'{out}: 30s stereo, peak {20*np.log10(np.max(np.abs(mix))):.1f} dBFS, RMS {20*np.log10(np.sqrt(np.mean(mix**2))):.1f} dBFS')
