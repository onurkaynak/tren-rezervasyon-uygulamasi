# Başlangıç #
---

`Bu bir Expressjs projesidir.`
## Projeyi Çalıştırmak İçin Gereklilikler ##

  ### *Nodejs* ###
  * Bilgisayarınızda Nodejs'in kurulu olması gerekmektedir.
  * Nodejs kurulumu yapıldıktan sonra, gerekli paketleri yüklemek için, projenin ana yolunda *`npm install`* komutu çalıştırılmalıdır.

  ## Kullanım ##
  * Request almak için *8080* portu kullanılıyor. Server'ı localhost:8080 üzerinden dinlemeye açmak için projenin ana yolunda *`npm start`* komutunu çalıştırınız. Daha sonra server'a request yapılabilir.

# Endpoint Bilgileri #
---

* **URL**

  `localhost:8080/rezervasyon`

* **Method:**

  `POST`

* **Content-Type:**

  `application/json`

**Request JSON değerleri aşağıdaki gibi olmalıdır:**

   ```json
     {
         "Tren": {
             "Vagonlar": [
                 {
                     "Ad": string,
                     "Kapasite": int,
                     "DoluKoltukAdet": int
                 },
             ],
             "RezervasyonYapilacakKisiSayisi": int,
             "KisilerFarkliVagonlaraYerlestirilebilir": boolean
         }
     }
   ```  

### Validasyon Hatası Durumunda Response Bilgileri ###

Request üzerinden gelen JSON verilerinin validasyon işlemleri sonucunda, olası hatalar liste haline getirilip aşağıdaki formatta Response olarak döndürülür. Hatanın nedeni, ilgili error objesinin içerisinde yer alan `msg`, hatanın kaynaklandığı yer `param`, hataya neden olan değerin içeriğiyse `value` değerleri üzerinden görülebilir.

Kod içerisinde validasyon işlemlerinin bulunduğu yer `routes` klasöründe `rezervasyon.js` dosyasıdır.

* **Code:** 422 Unprocessable Entity

**Örnek JSON Response verileri:**

   ```json
     {
         "errors": [
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "Tren.Vagonlar[0].Kapasite",
                 "location": "body"
             },
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "Tren.Vagonlar[1].Kapasite",
                 "location": "body"
             },
             {
                 "value": "field value",
                 "msg": "error message",
                 "param": "Tren.Vagonlar",
                 "location": "body"
             }    
         ]
     }
   ```  

### Başarılı İşlem Durumunda Response Bilgileri ###

Hiçbir hata ile karşılaşılmaması durumunda aşağıdaki formatta Response döndürülür.

Rezervasyon yapılabilir sonucuna ulaşıldıysa `RezervasyonYapilabilir` değeri `true`, `YerlesimAyrinti` değeri vagon ve her vagona yerleşecek kişi sayısını içeren objeler listesi bilgilerini içerir.

Rezervasyon yapılamaz sonucuna ulaşıldıysa `RezervasyonYapilabilir` değeri `false` ve `YerlesimAyrinti` değeri boş liste bilgilerini içerir.

* **Code:** 200

**Örnek JSON Response verileri:**

   ```json
     {
         "RezervasyonYapilabilir": bool,
         "YerlesimAyrinti": [      
             {
                 "VagonAdi": string,
                 "KisiSayisi": int
             }   
         ]
     }
   ```
