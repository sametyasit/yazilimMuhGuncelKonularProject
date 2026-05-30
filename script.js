/* LiveCare AR - script.js */

window.addEventListener('DOMContentLoaded', () => {
  let pct=0;
  const fill=document.getElementById('splashFill');
  const loading=document.getElementById('splashLoading');
  const msgs=['Kamera hazırlanıyor…','Veriler yükleniyor…','Neredeyse hazır…','Başlatılıyor!'];
  let msgIdx=0;
  const iv=setInterval(()=>{
    pct+=1.4; fill.style.width=Math.min(pct,100)+'%';
    if(pct%25<1.5&&msgIdx<msgs.length) loading.textContent=msgs[msgIdx++];
    if(pct>=100){clearInterval(iv);setTimeout(hideSplash,400);}
  },30);
  startCamera(); renderEmergencyList(); renderDrugList();
  updateMainProgress(); renderMotivation(); checkNotifDot(); initDrugTimer();
  const saved=localStorage.getItem('theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
  document.getElementById('darkBtn').textContent=saved==='light'?'Gunduz':'Gece';
});

function hideSplash(){
  const s=document.getElementById('splashScreen');
  s.style.transition='opacity 0.6s ease'; s.style.opacity='0';
  setTimeout(()=>{s.style.display='none';document.getElementById('mainScreen').classList.remove('hidden');},600);
}

function startCamera(){
  const v=document.getElementById('cameraFeed');
  if(!navigator.mediaDevices?.getUserMedia)return;
  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false})
    .then(s=>{v.srcObject=s;})
    .catch(()=>{v.style.background='linear-gradient(135deg,#0a0a1a,#1a0a2e,#0a1a2e)';});
}

function toggleDark(){
  const html=document.documentElement;
  const next=html.getAttribute('data-theme')==='light'?'dark':'light';
  html.setAttribute('data-theme',next);
  document.getElementById('darkBtn').textContent=next==='light'?'Gunduz':'Gece';
  localStorage.setItem('theme',next);
}

const motivations=[
  'Her yeni gün, iyileşme yolculuğunda bir adım daha!',
  'Küçük adımlar, büyük değişimler yaratır. Devam et!',
  'Sağlığın için attığın her adım önemlidir.',
  'Bugün ilaçlarını aldın mı? Küçük hatırlatma, büyük fark!',
  'Güçlüsün. Bu yolculuk zorlu ama sen daha güçlüsün.',
  'Su içmeyi unutma, vücudun sana minnettar olur.',
  'Sağlıklı beslenme en iyi ilaçtır.',
  'Her kontrol muayenesi geleceğine yatırımdır.',
];
function renderMotivation(){document.getElementById('motiveStrip').textContent=motivations[new Date().getHours()%motivations.length];}

function openPanel(id){document.getElementById(id).classList.remove('hidden');}
function closePanel(id){
  document.getElementById(id).classList.add('hidden');
  if(id==='aiPanel' && aiStream){ aiStream.getTracks().forEach(t=>t.stop()); aiStream=null; }
}

let toastTimer;
function showToast(msg,dur=2800){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.add('hidden'),dur);
}

/* -- BİLGİLENDİRME -- */
const infoData=[
  {icon:'-',text:'Alkol kesinlikle kullanılmamalıdır. Nakledilen karaciğere ciddi zarar verir.',cat:'Yaşam Tarzı'},
  {icon:'-',          text:'Bağışıklık basklayıcı ilaçları her gün aynı saatte aksatmadan alın.',cat:'İlaç'},
  {icon:'-',          text:'Sebze, meyve, tam tahıl ve yağsız protein ağırlıklı dengeli beslenin.',cat:'Beslenme'},
  {icon:'-',          text:'Enfeksiyona karşı hijyene dikkat edin; sık el yıkayın.',cat:'Hijyen'},
  {icon:'-',          text:'Doktor kontrollerinizi asla aksatmayın. Düzenli tahlil önemlidir.',cat:'Kontrol'},
  {icon:'-',        text:'Güneşe uzun süre doğrudan maruz kalmayın; cilt kanseri riskini artırır.',cat:'Güvenlik'},
  {icon:'-',          text:'Doktorun onayladığı hafif egzersizleri (yürüyüş) düzenli yapın.',cat:'Egzersiz'},
  {icon:'-',    text:'38°C+ ateş nakil reddi veya enfeksiyon işareti. Hemen doktorunuzu arayın!',cat:'Acil'},
  {icon:'-',          text:'Sigara ve tütün ürünleri kesinlikle yasaktır.',cat:'Yaşam Tarzı'},
  {icon:'-',          text:'Günde en az 2 litre su için. Böbrek sağlığını destekler.',cat:'Beslenme'},
];
let curInfo=0;
function openInfo(){curInfo=0;renderInfo();openPanel('infoPanel');}
function renderInfo(){
  const d=infoData[curInfo];
  document.getElementById('infoCardIcon').textContent=d.icon;
  document.getElementById('infoCardText').textContent=d.text;
  document.getElementById('infoCategory').textContent=d.cat;
  document.getElementById('infoIndex').textContent=curInfo+1;
  document.getElementById('infoTotal').textContent=infoData.length;
  document.getElementById('infoProgressFill').style.width=((curInfo+1)/infoData.length*100)+'%';
  const c=document.getElementById('infoCard');
  c.style.animation='none';requestAnimationFrame(()=>{c.style.animation='';});
}
function nextInfo(){curInfo=(curInfo+1)%infoData.length;renderInfo();if(!curInfo)showToast('Tüm kartlari okudun!');}
function prevInfo(){curInfo=(curInfo-1+infoData.length)%infoData.length;renderInfo();}

/* -- OYUN -- */
const foodItems=[
  {emoji:'',name:'Su',           suitable:true, reason:'Vücudun temel ihtiyacı. Bol bol içebilirsiniz.'},
  {emoji:'',name:'Alkol',         suitable:false,reason:'Nakledilen karaciğeri doğrudan tahrip eder.'},
  {emoji:'',name:'Brokoli',       suitable:true, reason:'Antioksidan açısından zengin, faydalıdır.'},
  {emoji:'',name:'Sigara',        suitable:false,reason:'Bağışıklık sistemi zayıflatır.'},
  {emoji:'',name:'Fast Food',     suitable:false,reason:'Yüksek yağ ve tuz karaciğeri zorlar.'},
  {emoji:'',name:'Elma',          suitable:true, reason:'Antioksidanlarla dolu, harika meyve.'},
  {emoji:'',name:'Bitki Çayı',  suitable:false,reason:'Bazı bitkiler ilaçlarla etkileşir.'},
  {emoji:'',name:'İzgara Balık',suitable:true, reason:'Omega-3 zengin hafif protein.'},
  {emoji:'',name:'Tuzlu Yemek',  suitable:false,reason:'Fazla tuz böbrek hasarına yol açar.'},
  {emoji:'',name:'Yulaf',         suitable:true, reason:'Lif zengin, sindirim dostu.'},
  {emoji:'',name:'Greyfurt Suyu', suitable:false,reason:'İlaç kan düzeyini tehlikeli artırır!'},
  {emoji:'',name:'Yaban Mersini',suitable:true,reason:'Karaciğeri koruyucu antioksidan.'},
  {emoji:'',name:'Çiğ Et',       suitable:false,reason:'Enfeksiyon riski. Tüm etler iyi pişirilmeli.'},
  {emoji:'',name:'Yeşil Çay',    suitable:true, reason:'Ölçülü tüketimde antioksidan etkisi.'},
  {emoji:'',name:'Pizza',         suitable:false,reason:'Yüksek yağ, tuz, işlenmiş malzeme.'},
];
let gameQueue=[],gameScore=0,gameWrong=0,answered=false;
function openGame(){gameQueue=shuffle([...foodItems]);gameScore=0;gameWrong=0;answered=false;updateGameBoard();loadQuestion();openPanel('gamePanel');}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function loadQuestion(){
  if(!gameQueue.length){showFinalScore();return;}
  answered=false;
  const item=gameQueue[0];
  document.getElementById('foodEmoji').textContent=item.emoji;
  document.getElementById('foodName').textContent=item.name;
  const fb=document.getElementById('gameFeedback');fb.className='feedback hidden';fb.textContent='';
  document.getElementById('gameButtons').classList.remove('hidden');
  document.getElementById('nextQBtn').classList.add('hidden');
  const c=document.getElementById('foodCard');c.style.animation='none';requestAnimationFrame(()=>{c.style.animation='';});
  updateGameBoard();
}
function answerGame(yes){
  if(answered)return;answered=true;
  const item=gameQueue.shift();const ok=yes===item.suitable;
  if(ok)gameScore++;else gameWrong++;
  const fb=document.getElementById('gameFeedback');fb.classList.remove('hidden');
  if(ok){fb.className='feedback correct';fb.innerHTML='Dogru: '+item.reason;launchConfetti();vibrate([60]);}
  else{fb.className='feedback wrong';fb.innerHTML='Yanlis: '+item.reason;vibrate([40,30,40]);}
  document.getElementById('gameButtons').classList.add('hidden');
  document.getElementById('nextQBtn').classList.remove('hidden');
  updateGameBoard();
}
function nextQuestion(){loadQuestion();}
function showFinalScore(){
  document.getElementById('foodEmoji').textContent='';
  document.getElementById('foodName').textContent='Oyun Bitti!';
  const pct=Math.round(gameScore/foodItems.length*100);
  const msg=pct>=80?'Mukemmel!':pct>=50?'Iyi gidiyorsun!':'Tekrar dene!';
  const fb=document.getElementById('gameFeedback');fb.className='feedback correct';
  fb.innerHTML='<strong>'+gameScore+'/'+foodItems.length+' (%'+pct+')</strong><br>'+msg;
  fb.classList.remove('hidden');
  document.getElementById('gameButtons').classList.add('hidden');
  document.getElementById('nextQBtn').classList.add('hidden');
  if(pct>=80)launchConfetti(true);
}
function updateGameBoard(){document.getElementById('gameScore').textContent=gameScore;document.getElementById('gameWrong').textContent=gameWrong;document.getElementById('gameLeft').textContent=gameQueue.length;}

/* -- HATIRLATICI -- */
const reminders={
  daily:[
    {id:'d1',text:'Ilacini ictin mi?'},
    {id:'d2',text:'En az 2 litre su ictin mi?'},
    {id:'d3',text:'Yürüyüşünü yaptın mı?'},
    {id:'d4',text:'Atesini olctun mu?'},
    {id:'d5',text:'Dengeli beslendin mi?'},
    {id:'d6',text:'7-8 saat uyudun mu?'},
  ],
  weekly:[
    {id:'w1',text:'Doktor kontrolünü planladın mı?'},
    {id:'w2',text:'Kan tahlilini yaptırdın mı?'},
    {id:'w3',text:'Beslenme düzenini kontrol ettin mi?'},
    {id:'w4',text:'Ilaçların miktarı yeterli mi?'},
    {id:'w5',text:'Cilt ve hijyen kontrolünü yaptın mı?'},
  ]
};
let doneSet=new Set(JSON.parse(localStorage.getItem('doneTasks')||'[]'));
let activeTab='daily';
function openReminder(){activeTab='daily';document.getElementById('tabDaily').classList.add('active');document.getElementById('tabWeekly').classList.remove('active');renderReminderList();openPanel('reminderPanel');}
function switchTab(t){activeTab=t;document.getElementById('tabDaily').classList.toggle('active',t==='daily');document.getElementById('tabWeekly').classList.toggle('active',t==='weekly');renderReminderList();}
function renderReminderList(){
  const list=document.getElementById('reminderList');list.innerHTML='';
  reminders[activeTab].forEach(item=>{
    const done=doneSet.has(item.id);
    const div=document.createElement('div');div.className='reminder-item'+(done?'done':'');
    div.innerHTML='<span class="reminder-text">'+item.text+'</span>'
      +'<button class="btn-done" onclick="toggleReminder(\''+item.id+'\')">'+(done?'Yapıldı':'Tamamlandı')+'</button>';
    list.appendChild(div);
  });
  const allDone=reminders[activeTab].every(i=>doneSet.has(i.id));
  document.getElementById('completionBanner').classList.toggle('hidden',!allDone);
  if(allDone)launchConfetti();
  updateMainProgress();checkNotifDot();
}
function toggleReminder(id){doneSet.has(id)?doneSet.delete(id):doneSet.add(id);saveDone();renderReminderList();if(doneSet.has(id))showToast('Tamamlandi!');}
function doneAll(){reminders[activeTab].forEach(i=>doneSet.add(i.id));saveDone();renderReminderList();showToast('Hepsi tamamlandi!');}
function resetReminders(){reminders[activeTab].forEach(i=>doneSet.delete(i.id));saveDone();renderReminderList();showToast('Sifirlandi');}
function saveDone(){localStorage.setItem('doneTasks',JSON.stringify([...doneSet]));}
function updateMainProgress(){
  const all=[...reminders.daily,...reminders.weekly];
  const done=all.filter(i=>doneSet.has(i.id)).length;
  const pct=Math.round(done/all.length*100);
  document.getElementById('mainProgressFill').style.width=pct+'%';
  document.getElementById('mainProgressPct').textContent=pct+'%';
}
function checkNotifDot(){
  document.getElementById('notifDot').classList.toggle('hidden',!reminders.daily.some(i=>!doneSet.has(i.id)));
  const all=[...reminders.daily,...reminders.weekly];
  document.getElementById('reminderSubLabel').textContent=(all.length-all.filter(i=>doneSet.has(i.id)).length)+'bekliyor';
}

/* -- ACİL DURUM -- */
const emergencySymptoms=[
  {icon:'-',text:'38°C ve üzeri ateş — nakil reddi veya enfeksiyon işareti.'},
  {icon:'-',      text:'Aşırı halsizlik, yorgunluk veya ani güç kaybı.'},
  {icon:'-',text:'Cilt ya da gözlerde sararma (sarılık).'},
  {icon:'-',      text:'Şiddetli bulantı, kusma veya karın ağrısı.'},
  {icon:'-',      text:'İdrarda koyulaşma, azalma veya idrar yapamama.'},
  {icon:'-',      text:'Nefes darlığı veya göğüs ağrısı.'},
  {icon:'-',      text:'Şiddetli baş ağrısı, görme bozukluğu, biliç değişikliği.'},
  {icon:'-',      text:'Ameliyat bölgesinde kızarıklık, şişlik veya akıntı.'},
  {icon:'-',      text:'Ani kilo artışı (1-2 günde 2 kg+) — sıvı birikmesi.'},
  {icon:'-',      text:'Kontrolsüz titreme ve üşüme eşliğinde yüksek ateş.'},
];
function openEmergency(){openPanel('emergencyPanel');}
function renderEmergencyList(){
  const list=document.getElementById('emergencyList');
  emergencySymptoms.forEach(s=>{
    const d=document.createElement('div');d.className='emergency-item';
    d.innerHTML='<span class="emergency-item-icon">'+s.icon+'</span><span class="emergency-item-text">'+s.text+'</span>';
    list.appendChild(d);
  });
}

/* -- İLAÇ TAKİP -- */
let drugs=JSON.parse(localStorage.getItem('drugs')||'[]');
function openDrug(){renderDrugList();openPanel('drugPanel');}
function addDrug(){
  const name=document.getElementById('drugNameInput').value.trim();
  const time=document.getElementById('drugTimeInput').value;
  if(!name){showToast('Ilac adi girin');return;}
  drugs.push({id:Date.now(),name,time});
  localStorage.setItem('drugs',JSON.stringify(drugs));
  document.getElementById('drugNameInput').value='';
  renderDrugList();updateNextDrug();showToast(name+'eklendi');
}
function deleteDrug(id){
  drugs=drugs.filter(d=>d.id!==id);
  localStorage.setItem('drugs',JSON.stringify(drugs));
  renderDrugList();updateNextDrug();showToast('Ilac silindi');
}
function renderDrugList(){
  const list=document.getElementById('drugList');list.innerHTML='';
  if(!drugs.length){list.innerHTML='<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:10px 0">Henüz ilaç eklenmedi.</p>';return;}
  [...drugs].sort((a,b)=>a.time.localeCompare(b.time)).forEach(d=>{
    const div=document.createElement('div');div.className='drug-item';
    div.innerHTML='<div class="drug-item-info">'
      +'<span class="drug-item-name"> '+d.name+'</span>'
      +'<span class="drug-item-time">'+d.time+'</span>'
      +'</div><button class="drug-delete" onclick="deleteDrug('+d.id+')">&#128465;</button>';
    list.appendChild(div);
  });
  updateNextDrug();
}
function updateNextDrug(){
  if(!drugs.length){document.getElementById('nextDrugTime').textContent='Ayarlanmadı — Ayarlamak için dokun';return;}
  const now=new Date(),mins=now.getHours()*60+now.getMinutes();
  const sorted=[...drugs].sort((a,b)=>a.time.localeCompare(b.time));
  const next=sorted.find(d=>{const[h,m]=d.time.split(':').map(Number);return h*60+m>mins;})||sorted[0];
  document.getElementById('nextDrugTime').textContent=next.name+' — '+next.time;
}
function initDrugTimer(){updateNextDrug();setInterval(updateNextDrug,60000);}

/* -- KONFETİ -- */
function launchConfetti(big=false){
  const canvas=document.getElementById('confettiCanvas');
  const ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const colors=['#6c63ff','#ff6b9d','#22c55e','#f59e0b','#4a9eff','#a855f7','#fb923c'];
  const pieces=Array.from({length:big?160:70},()=>({
    x:Math.random()*canvas.width,y:-20,r:Math.random()*8+4,
    color:colors[Math.floor(Math.random()*colors.length)],
    vx:(Math.random()-0.5)*4,vy:Math.random()*4+2,
    gravity:0.12,spin:(Math.random()-0.5)*0.3,angle:Math.random()*Math.PI*2,
  }));
  let frame=0;
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=p.gravity;p.angle+=p.spin;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);
      ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,1-frame/80);
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*0.5);ctx.restore();
    });
    frame++;if(frame<90)requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  })();
}

function vibrate(pattern){if(navigator.vibrate)navigator.vibrate(pattern);}

/* -- YAPAY ZEKA YEMEK TANI -- */
let aiStream = null;

function openAI(){
  openPanel('aiPanel');
  startAICamera();
  const saved = localStorage.getItem('geminiKey')||'';
  if(saved){ document.getElementById('geminiKey').value=saved; updateKeyStatus(true); }
}

function saveApiKey(){
  const key = document.getElementById('geminiKey').value.trim();
  if(!key){ showToast('API anahtari bos olamaz'); return; }
  localStorage.setItem('geminiKey', key);
  updateKeyStatus(true);
  showToast('API anahtari kaydedildi');
}

function updateKeyStatus(ok){
  const el = document.getElementById('aiKeyStatus');
  el.textContent = ok ? 'Anahtar kayitli. Analiz yapilabilir.' : 'Anahtar girilmedi.';
  el.style.color = ok ? '#22c55e' : '';
}

function startAICamera(){
  const v = document.getElementById('aiVideo');
  const snap = document.getElementById('aiSnapshot');
  snap.classList.add('hidden'); v.style.display='block';
  document.getElementById('aiOverlayLabel').textContent='Kamera hazir';
  document.getElementById('aiResult').classList.add('hidden');
  document.getElementById('aiLoading').classList.add('hidden');
  if(aiStream) return;
  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false})
    .then(s=>{ aiStream=s; v.srcObject=s; })
    .catch(()=>{ document.getElementById('aiOverlayLabel').textContent='Kamera acilamadi'; });
}

function aiCapture(){
  const v  = document.getElementById('aiVideo');
  const c  = document.getElementById('aiCanvas');
  const img= document.getElementById('aiSnapshot');
  c.width=v.videoWidth||640; c.height=v.videoHeight||480;
  c.getContext('2d').drawImage(v,0,0,c.width,c.height);
  const dataUrl = c.toDataURL('image/jpeg',0.85);
  img.src = dataUrl;
  img.classList.remove('hidden'); v.style.display='none';
  document.getElementById('aiOverlayLabel').textContent='Fotograf cekildi';
  analyzeFood(dataUrl);
}

function aiRetake(){
  document.getElementById('aiSnapshot').classList.add('hidden');
  document.getElementById('aiVideo').style.display='block';
  document.getElementById('aiResult').classList.add('hidden');
  document.getElementById('aiLoading').classList.add('hidden');
  document.getElementById('aiOverlayLabel').textContent='Kamera hazir';
}

async function analyzeFood(dataUrl){
  const key = process?.env?.GROQ_KEY || 'GROQ_API_KEY_HERE';

  document.getElementById('aiLoading').classList.remove('hidden');
  document.getElementById('aiResult').classList.add('hidden');

  // Kahvalti veri seti - karaciger nakli hastalari icin
  const dataset = `
KARACIGER NAKLI HASTALARI ICIN KAHVALTI VERI SETI:

=== UYGUN KAHVALTILIKLAR ===
- Yulaf lapasi (sade, az tatli): Lif zengin, sindirimi kolay, kolesterolu duzenler. UYGUN.
- Tam bugday ekmegi (1-2 dilim): Lif kaynagi, glisemik indeksi dusuk. UYGUN.
- Beyaz peynir (az tuzlu, %30 yag): Protein kaynagi. Tuz az olursa UYGUN.
- Lor peyniri / suzme yogurt: Dusuk yag, yuksek protein. UYGUN.
- Haslama yumurta (1 adet): Protein zengin, pismis olmali. UYGUN.
- Omlet (yagsiz, az tuzlu): Pismis yumurta guvenli. UYGUN.
- Domates (taze): Licopeni ile karacigeri korur. UYGUN.
- Salatalik: Su icerigi yuksek, hafif. UYGUN.
- Elma (kabuklu): Antioksidan, pektin sindirime yardim. UYGUN.
- Muz (olgun): Kolay sindirilen enerji kaynagi. UYGUN.
- Armut: Yumusak lif, hafif. UYGUN.
- Seftali / kayisi (taze): C vitamini, antioksidan. UYGUN.
- Yaban mersini / cilek: Antioksidan zengin. UYGUN.
- Yulaf ezmesi sade: Lif ve beta-glukan. UYGUN.
- Az yagly sut (yarim yag): Kalsiyum kaynagi, olculu tuketim. UYGUN.
- Sade yogurt (probiyotik): Bagisiklik sistemi destekler. UYGUN.
- Taze sikilas portakal suyu (az): C vitamini, kucuk miktarda kabul. UYGUN.
- Su, bitki cayi (ihlamur, nane - doktor onayli): Hidrasyon. UYGUN.
- Ceviz (3-4 adet): Omega-3, antiinflamatuar. UYGUN (az miktarda).
- Badem (8-10 adet): E vitamini, saglikli yag. UYGUN (az miktarda).
- Avokado (yari adet): Saglikli yag, K vitamini - doktor onayli miktarda. UYGUN.
- Zeytin (3-5 adet, az tuzlu): Saglikli yag. UYGUN (az).
- Zeytinyagi (1 tatli kasigi): Tek omurgasizlanmamis yag. UYGUN (az).
- Tam bugday gevrek (sekersiz): Lif kaynagi. UYGUN.

=== DIKKATLI TUKETILMELI ===
- Bal (dogal, az miktarda): Yuksek seker, olculu olmali. DIKKATLI.
- Recelbaz / marmelat (az sekerli): Seker icerigi yuksek. DIKKATLI.
- Tost ekmegi (beyaz): Rafine karbonhidrat, az tuketilmeli. DIKKATLI.
- Simit: Yuksek karbonhidrat, tuz. Az miktarda DIKKATLI.
- Sucuk (az yagly, az): Yuksek tuz ve katkili et. DIKKATLI.
- Pastirma (cok az): Nitrat ve tuz icerigi. DIKKATLI.
- Tam sut: Yuksek doymus yag. DIKKATLI.
- Greyfurt suyu: Bazi immunsupresanlarla (takrolimus, siklosporin) tehlikeli etkilesim - doktora sor. DIKKATLI.
- Kivi: K vitamini yuksek, bazi ilaclarla etkilesim. DIKKATLI.
- Ispanak (pismis): K vitamini cok yuksek, warfarin kullananlar dikkat. DIKKATLI.
- Kahve (1 fincan, sekerssiz): Kafein karacigeri zorlayabilir, az miktarda. DIKKATLI.
- Cay (siyah, 1 bardak): Tanen demiri emilimini azaltir, ilactan 1 saat once icilmemeli. DIKKATLI.
- Tatli (az miktarda, ev yapimi): Seker ve yag icerigi. DIKKATLI.
- Tereyagi (cok az, seyrek): Doymus yag. DIKKATLI.
- Findik ezmesi (dogal, sekerssiz, az): Yag icerigi yuksek. DIKKATLI.

=== ZARARLI / KACININ ===
- Greyfurt (meyve olarak): Takrolimus ve siklosporin seviyesini tehlikeli arttirir. ZARARLI.
- Alkol (bira, sarap, raki vb.): Nakledilen karacigeri dogrudan tahrip eder. ZARARLI.
- Cig yumurta: Salmonella enfeksiyonu riski (bagisiklik baskili hastalarda olumcul). ZARARLI.
- Cig sut / pastorize edilmemis sut: Bakteri riski. ZARARLI.
- Hazir meyve sulari (kutu/sise): Asiri seker, koruyucu madde. ZARARLI.
- Enerji icecekleri (Red Bull vb.): Kafein, taurin, seker - kalp ve karacigere zararli. ZARARLI.
- Hazir tatli / pasta / pogaca (dukkan): Trans yag, asiri seker, katkili. ZARARLI.
- Hazir kahvaltilik gevrek (sekerli): Asiri seker ve katkili. ZARARLI.
- Salam / sosis / hazir et urunleri: Yuksek tuz, nitrat, katkili madde. ZARARLI.
- Cips / krakerler: Trans yag, asiri tuz. ZARARLI.
- Nutella / tatli kremalar: Trans yag, asiri seker. ZARARLI.
- Hazir recel (sekerli): Asiri seker. ZARARLI.
- Margarin: Trans yag, karacigere zararli. ZARARLI.
- Meyve aromalı yogurtlar (hazır): Şeker ve katkı maddesi. ZARARLI.
`;

  const prompt =
    'Sen karaciger nakli hastalari icin kahvalti analizi yapan uzman bir diyetisyen yapay zekasisin.\n\n' +
    'Asagida karaciger nakli hastalari icin hazirlanmis bir kahvalti veri seti var. Bu veri setini referans al ve goruntudeki yiyecegin bu hastalara uygunlugunu degerlendir:\n\n' +
    dataset +
    '\n\nGoruntudeki yiyecegi tani ve yukaridaki veri setine gore degerlendirme yap.\n' +
    'Eger goruntude kahvaltilik olmayan bir yiyecek varsa (ornegin oglen veya aksam yemegi) bunu da belirt.\n' +
    'Sadece asagidaki JSON formatinda cevap ver, baska hicbir sey yazma:\n' +
    '{"yiyecek":"tespit edilen yiyecek adi", "durum":"UYGUN" veya "DIKKATLI" veya "ZARARLI", "kisa_aciklama":"1 cumlelik ozet", "detay":"neden uygun/dikkatli/zararli oldugu, varsa oneriler"}';

  try {
    const res = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+key
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages:[{
            role:'user',
            content:[
              {type:'text', text: prompt},
              {type:'image_url', image_url:{url: dataUrl}}
            ]
          }],
          temperature: 0.1,
          max_tokens: 700
        })
      }
    );
    const json = await res.json();
    if(json.error){ showToast('API Hatasi: '+json.error.message); document.getElementById('aiLoading').classList.add('hidden'); return; }
    const raw = json.choices?.[0]?.message?.content||'';
    const match = raw.match(/\{[\s\S]*\}/);
    if(!match){ showToast('AI yaniti anlasilamadi'); document.getElementById('aiLoading').classList.add('hidden'); return; }
    const data = JSON.parse(match[0]);
    showAIResult(data);
  } catch(e){
    showToast('Baglanti hatasi: '+e.message);
    document.getElementById('aiLoading').classList.add('hidden');
  }
}

function showAIResult(data){
  document.getElementById('aiLoading').classList.add('hidden');
  const result = document.getElementById('aiResult');
  const badge  = document.getElementById('aiResultBadge');
  result.classList.remove('hidden');
  document.getElementById('aiResultFood').textContent   = data.yiyecek||'Bilinmiyor';
  document.getElementById('aiResultReason').textContent = data.kisa_aciklama||'';
  document.getElementById('aiResultDetail').textContent = data.detay||'';
  const durum = (data.durum||'').toUpperCase();
  if(durum==='UYGUN'){
    badge.textContent='UYGUN'; badge.className='ai-result-badge safe';
    launchConfetti(); vibrate([50]);
  } else if(durum==='ZARARLI'){
    badge.textContent='ZARARLI'; badge.className='ai-result-badge unsafe';
    vibrate([80,40,80]);
  } else {
    badge.textContent='DIKKATLI TUKETİN'; badge.className='ai-result-badge caution';
    vibrate([40]);
  }
}
