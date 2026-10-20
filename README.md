# Almanca Öğrenme Sistemi (A1 → A2)

Sıfırdan Almanca öğrenmek için kişisel, tarayıcı tabanlı bir öğrenme sistemi. Amaç: Almanya'da yaşayabilecek düzeyde (A1 → A2) pratik Almanca. İnternet ve kurulum gerektirmez.

## Nasıl kullanılır

1. Bu klasörü bilgisayarına indir (GitHub'da **Code › Download ZIP** veya `git clone`).
2. `index.html` dosyasına çift tıkla. **Chrome veya Edge** önerilir (Almanca sesler ve konuşma tanıma en iyi orada çalışır).
3. Her gün **Bugün** ekranında ne kadar vaktin olduğunu seç ve **Devam**'a bas. Sistem sırayla tekrarları, ünite testini ve yeni dersi getirir.

**Önemli — yedek:** İlerlemen tarayıcının deposunda durur. Tarayıcı verilerini temizlersen ya da başka bir tarayıcıda açarsan görünmez. **Ayarlar › Yedeği indir** ile haftada bir `almanca-ilerleme-….json` dosyası indir; gerekince **Yedekten yükle** ile geri al. Uygulama 7 günde bir hatırlatır.

## İçinde neler var

- **Ünite 0–3** (24 ders): sesler ve alfabe, tanışma, sayılar ve iletişim bilgileri, aile. 180 kelime ve kalıp, yaklaşık 280 alıştırma.
- **Ders akışı:** diyalog → yeni kelimeler (artikel renkli: der mavi, die kırmızı, das yeşil) → Türkçe ve İngilizce köprülerle gramer → alıştırmalar → Almanya'da hayat notu. Yanlış yapılan soru birkaç adım sonra tekrar sorulur.
- **9 alıştırma tipi:** çoktan seçmeli/dinleme, artikel, eşleştirme, çeviri yazma, boşluk doldurma, dikte, kelime sıralama, sesli tekrar (kayıt + model sesle karşılaştırma, isteğe bağlı konuşma tanıma), serbest yazma.
- **Akıllı cevap kontrolü:** ae/oe/ue/ss kabul edilir, küçük yazım hataları hoş görülür. Artikel, çekim ve kelime sırası hataları ise ayrı ayrı teşhis edilip Türkçe açıklanır.
- **Aralıklı tekrar (FSRS):** biten dersin kelimeleri ertesi gün tekrar destesine gelir. Kart türleri: anlam, artikel ve sonradan açılan "Türkçeden Almancaya yaz".
- **Ünite testi** (%80 geçme sınırı), **Hata Defteri** (zayıf noktalar), **Kelimeler** (arama, sahte arkadaş uyarıları), **Gramer** referansı.
- **Yapay zekâya sor:** yazma görevlerinde ve hatalarda hazır bir istemi panoya kopyalar, ChatGPT/Claude/Gemini'yi açar. Hesap veya API anahtarı gerekmez; servis listesi Ayarlar'dan düzenlenir.

## Geliştirme

Uygulamayı çalıştırmak için hiçbir şey gerekmez. Aşağıdakiler yalnızca içerik veya kod değiştirirken kullanılır (Node 18+):

```
npm test            # birim testleri (cevap kontrolü, FSRS, planlayıcı, içerik)
npm run validate    # içerik şeması ve üniteler arası tutarlılık
```

- Mimari ve kararlar: [docs/00-ANA-PLAN.md](docs/00-ANA-PLAN.md)
- Yeni ünite yazmak için şema: [docs/icerik-semasi.md](docs/icerik-semasi.md)
- Detaylı analizler: [docs/analiz/](docs/analiz/)
