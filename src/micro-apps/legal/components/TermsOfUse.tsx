import { LegalLayout } from './LegalLayout'

const CONTACT_EMAIL = 'yasinatesim@gmail.com'

export function TermsOfUse() {
  return (
    <LegalLayout badge="Yasal" title="Kullanım Koşulları" updatedAt="9 Ekim 2026">
      <p>
        <a href="https://yasinates.com">yasinates.com</a> (“Site”) Yasin Ateş’in kişisel web sitesi ve blogudur.
        Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız lütfen siteyi
        kullanmayın.
      </p>

      <h2>1. İçeriğin Niteliği</h2>
      <p>
        Sitedeki blog yazıları, projeler ve diğer içerikler genel bilgilendirme amaçlıdır. İçeriklerin doğru ve güncel
        olması için özen gösterilir; ancak eksiksizliği ve belirli bir amaca uygunluğu garanti edilmez. İçeriklerin
        kullanımından doğabilecek sonuçlar kullanıcının sorumluluğundadır.
      </p>

      <h2>2. Fikri Mülkiyet</h2>
      <p>
        Aksi belirtilmedikçe sitedeki yazı, görsel ve tasarımların hakları Yasin Ateş’e aittir. İçerikler, kaynak
        gösterilerek ve <a href="https://yasinates.com">yasinates.com</a> bağlantısı verilerek kısmen alıntılanabilir;
        izinsiz olarak tamamen kopyalanamaz veya ticari amaçla çoğaltılamaz. GitHub’da açık kaynak olarak yayınlanan
        projeler, ilgili depodaki lisans koşullarına tabidir.
      </p>

      <h2>3. Dış Bağlantılar</h2>
      <p>
        Site; GitHub, YouTube, Medium, DEV Community ve sosyal medya gibi üçüncü taraf sitelere bağlantılar içerir. Bu
        sitelerin içeriği, kullanım koşulları ve gizlilik uygulamalarından sorumlu değilim.
      </p>

      <h2>4. Reklamlar</h2>
      <p>
        Sitede Google AdSense aracılığıyla reklamlar gösterilir. Reklam içerikleri Google ve reklamverenler tarafından
        belirlenir; reklamı yapılan ürün veya hizmetler tarafımdan önerilmiş ya da onaylanmış sayılmaz. Reklamlarda
        kullanılan çerezler hakkında bilgi için <a href="/gizlilik-politikasi">Gizlilik Politikası</a> sayfasına göz
        atabilirsiniz.
      </p>

      <h2>5. Kabul Edilebilir Kullanım</h2>
      <p>
        Siteyi; hizmetin işleyişini bozacak, güvenliğini tehlikeye atacak veya yürürlükteki mevzuata aykırı şekilde
        kullanmamayı, otomatik araçlarla aşırı yük oluşturmamayı ve reklamlarla yapay etkileşim (ör. sahte tıklama)
        oluşturmamayı kabul edersiniz.
      </p>

      <h2>6. Değişiklikler</h2>
      <p>
        Bu koşullar gerektiğinde güncellenebilir. Güncel sürüm her zaman bu sayfada, son güncelleme tarihiyle birlikte
        yayınlanır.
      </p>

      <h2>7. Uygulanacak Hukuk</h2>
      <p>
        Bu koşullar Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklarda İstanbul mahkemeleri ve icra daireleri
        yetkilidir.
      </p>

      <h2>8. İletişim</h2>
      <p>
        Sorularınız için <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> adresinden veya{' '}
        <a href="/iletisim">iletişim sayfası</a> üzerinden bana ulaşabilirsiniz.
      </p>
    </LegalLayout>
  )
}
