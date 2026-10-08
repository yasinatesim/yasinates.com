import { LegalLayout } from './LegalLayout'

const CONTACT_EMAIL = 'yasinatesim@gmail.com'

const thirdPartyServices = [
  { name: 'Google AdSense (reklam)', href: 'https://policies.google.com/technologies/ads' },
  { name: 'Google Fonts (yazı tipleri)', href: 'https://policies.google.com/privacy' },
  { name: 'YouTube (video küçük resimleri ve bağlantılar)', href: 'https://policies.google.com/privacy' },
  { name: 'GitHub (proje listesi)', href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
  { name: 'Medium (blog yazıları)', href: 'https://policy.medium.com/medium-privacy-policy-f03bf92035c9' },
  { name: 'DEV Community (blog yazıları)', href: 'https://dev.to/privacy' },
  { name: 'Netlify (barındırma)', href: 'https://www.netlify.com/privacy/' },
]

export function PrivacyPolicy() {
  return (
    <LegalLayout badge="Yasal" title="Gizlilik Politikası" updatedAt="9 Ekim 2026">
      <p>
        Bu gizlilik politikası, <a href="https://yasinates.com">yasinates.com</a> (“Site”) ziyaretçilerine ait
        bilgilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar. Site, Yasin Ateş tarafından kişisel
        web sitesi ve blog olarak yayınlanmaktadır. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
        veri sorumlusu Yasin Ateş’tir.
      </p>

      <h2>1. Toplanan Bilgiler</h2>
      <p>
        Sitede üyelik, yorum veya form bulunmaz; doğrudan sizden kişisel veri istenmez. Bununla birlikte aşağıdaki
        bilgiler işlenebilir:
      </p>
      <ul>
        <li>
          <strong>Sunucu kayıtları:</strong> Siteyi barındıran hizmet sağlayıcı (Netlify), güvenlik ve işletim amacıyla
          IP adresi, tarayıcı türü, ziyaret tarihi ve istenen sayfa gibi teknik bilgileri otomatik olarak kaydedebilir.
        </li>
        <li>
          <strong>E-posta ile iletişim:</strong> Bana e-posta gönderdiğinizde, adınız, e-posta adresiniz ve mesajınızın
          içeriği yalnızca size yanıt vermek amacıyla kullanılır ve üçüncü kişilerle paylaşılmaz.
        </li>
        <li>
          <strong>Çerezler:</strong> Reklam ve üçüncü taraf hizmetler tarafından kullanılan çerezler aşağıda
          açıklanmıştır.
        </li>
      </ul>

      <h2>2. Çerezler ve Google Reklamları</h2>
      <p>
        Site, reklam göstermek için Google AdSense hizmetini kullanır. Çerezler, tarayıcınıza kaydedilen küçük metin
        dosyalarıdır.
      </p>
      <ul>
        <li>
          Google dahil üçüncü taraf satıcılar, kullanıcının bu web sitesine veya diğer web sitelerine yaptığı önceki
          ziyaretlere dayalı olarak reklam yayınlamak için çerezleri kullanır.
        </li>
        <li>
          Google’ın reklam çerezlerini kullanması, Google’ın ve iş ortaklarının, kullanıcılarına bu siteye ve/veya
          internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak reklam sunmasını sağlar.
        </li>
        <li>
          Kullanıcılar, <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google
          Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilir.
        </li>
        <li>
          Üçüncü taraf satıcıların ve reklam ağlarının kişiselleştirilmiş reklamcılık için çerez kullanımını{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>{' '}
          veya (Avrupa’daki kullanıcılar için){' '}
          <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">www.youronlinechoices.eu</a>{' '}
          adreslerinden devre dışı bırakabilirsiniz.
        </li>
      </ul>
      <p>
        Google’ın, iş ortaklarının sitelerinden elde edilen bilgileri nasıl kullandığı hakkında ayrıntılı bilgiye{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          Google iş ortağı siteleri politikası
        </a>{' '}
        ve{' '}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          Google reklam politikası
        </a>{' '}
        sayfalarından ulaşabilirsiniz.
      </p>
      <p>
        Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre’deki ziyaretçilerden, kişiselleştirilmiş reklamlar için
        Google sertifikalı bir izin yönetim platformu aracılığıyla onay istenir. Tarayıcı ayarlarınızdan çerezleri
        dilediğiniz zaman silebilir veya engelleyebilirsiniz; bu durumda reklamlar kişiselleştirilmeden gösterilmeye
        devam edebilir.
      </p>

      <h2>3. Üçüncü Taraf Hizmetler</h2>
      <p>
        Site, içerik ve altyapı için aşağıdaki hizmetlerden yararlanır. Bu hizmetler, sayfayı görüntülediğinizde
        tarayıcınızdan doğrudan bilgi (ör. IP adresi) alabilir ve kendi gizlilik politikalarına tabidir:
      </p>
      <ul>
        {thirdPartyServices.map((service) => (
          <li key={service.name}>
            <a href={service.href} target="_blank" rel="noopener noreferrer">{service.name}</a>
          </li>
        ))}
      </ul>
      <p>
        Sitede yer alan dış bağlantılar (GitHub, YouTube, sosyal medya vb.) üzerinden ulaştığınız sitelerin gizlilik
        uygulamalarından sorumlu değilim.
      </p>

      <h2>4. Verilerin Saklanması ve Güvenliği</h2>
      <p>
        E-posta yazışmaları, iletişim amacı sona erene kadar saklanır. Site HTTPS üzerinden sunulur. Üçüncü taraf
        hizmetlerin topladığı verilerin saklama süreleri ilgili hizmetin politikasına tabidir.
      </p>

      <h2>5. KVKK Kapsamındaki Haklarınız</h2>
      <p>KVKK’nın 11. maddesi uyarınca kişisel verilerinizle ilgili olarak;</p>
      <ul>
        <li>işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme,</li>
        <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>aktarıldığı üçüncü kişileri bilme,</li>
        <li>eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme,</li>
        <li>kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
      </ul>
      <p>
        haklarına sahipsiniz. Taleplerinizi <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> adresine
        iletebilirsiniz.
      </p>

      <h2>6. Çocukların Gizliliği</h2>
      <p>
        Site 13 yaşın altındaki çocuklara yönelik değildir ve bilerek bu yaş grubundan kişisel veri toplanmaz.
      </p>

      <h2>7. Değişiklikler</h2>
      <p>
        Bu politika gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfada, son güncelleme tarihiyle birlikte
        yayınlanır.
      </p>

      <h2>8. İletişim</h2>
      <p>
        Gizlilik politikasıyla ilgili sorularınız için <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
        adresinden veya <a href="/iletisim">iletişim sayfası</a> üzerinden bana ulaşabilirsiniz.
      </p>
    </LegalLayout>
  )
}
