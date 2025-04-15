# WordPecker - Dil Öğrenme Uygulaması

WordPecker, dil öğrenme sürecini kolaylaştırmak için tasarlanmış bir mobil uygulamadır. React Native ve Expo kullanılarak geliştirilmiştir.

## Özellikler

- 🔐 Kullanıcı kimlik doğrulama sistemi
- 📝 Kelime listeleri oluşturma ve yönetme
- 📚 İnteraktif öğrenme modu
- ✍️ Quiz modu ile kendini test etme
- 📊 İlerleme takibi ve istatistikler
- 🔔 Bildirimler ile motivasyon

## Başlangıç

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Firebase hesabı

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/wordpecker.git
cd wordpecker
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve Firebase yapılandırma bilgilerinizi ekleyin:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Uygulamayı başlatın:
```bash
npm start
```

## Proje Yapısı

```
src/
  ├── api/          # API istekleri
  ├── components/   # Yeniden kullanılabilir bileşenler
  ├── config/       # Yapılandırma dosyaları
  ├── context/      # React Context dosyaları
  ├── navigation/   # Navigasyon yapılandırması
  ├── screens/      # Ekran bileşenleri
  ├── styles/       # Stil dosyaları
  └── types/        # TypeScript tip tanımlamaları
```

## Kullanılan Teknolojiler

- React Native
- Expo
- TypeScript
- Firebase (Authentication & Firestore)
- React Navigation
- React Native Paper

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Dalınıza push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## İletişim

Proje Sahibi - [@yourusername](https://twitter.com/yourusername)

Proje Linki: [https://github.com/yourusername/wordpecker](https://github.com/yourusername/wordpecker)
