// fetch('https://sozluk.gov.tr/atasozu')
// .then(gelen=>gelen.json())
// .then(veri=>console.log(veri))

// Giriş ve Çıkış için kullanacağımız html nesnelerini değişkenlere atama
const sonuc=document.getElementById("sonuc");
const aramaKutusu=document.getElementById("aramaKutusu");
const aramaListesi=document.getElementById("aramaListesi");
const anahtarkelime=document.getElementById("anahtarkelime")

//JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri;

const anahtarKelimeler=[];
const deyimlerSozler=[];

verileriYukle();

async function verileriYukle(){
    const sunucuYaniti= await fetch('https://sozluk.gov.tr/atasozu');
    let veriler=await sunucuYaniti.json();



    veriler.forEach(eleman => {
        anahtarKelimeler.push(eleman.anahtar);
        deyimlerSozler.push(eleman.sozum);
      
    });
    
    const birlesmisKelimeler=[... new Set(anahtarKelimeler)];
   
    
    // tekrarlı ifadeleri teke düşürür;
    
    let sayac=0;

    
    birlesmisKelimeler.forEach(kelime=>{
        if (sayac<5) {
            const yeniOneri=document.createElement("option");
            aramaListesi.append(yeniOneri);
            yeniOneri.value=kelime;
        }
       sayac++;
        const anahtar=document.createElement('li');
        anahtarkelime.appendChild(anahtar);
        anahtar.innerText=kelime;

    })
    

}



function sonuclariFiltrele(aranankelime){
    sonuc.innerHTML='';
    const arananKriter=new RegExp(aranankelime,"gi");
    let eslesenler=deyimlerSozler.filter(soz=>arananKriter.test(soz));


    if (aranankelime.length<3) {
            eslesenler=[];

    }

    eslesenler.forEach(es =>{
        const yeniSonuc=document.createElement("li");
        yeniSonuc.classList.add("deyimler")
        sonuc.appendChild(yeniSonuc);
        yeniSonuc.innerHTML=es;
    })

}
aramaKutusu.addEventListener("input", (e)=>{
    sonuclariFiltrele(e.target.value);


})
