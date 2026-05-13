import { createFileRoute } from "@tanstack/react-router";
import { Phone, Clock, MapPin, Plane, Stethoscope, ShieldCheck, Star, CheckCircle2, Mountain, Calendar, Users, ArrowRight, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImg from "@/assets/hero-baoloc.jpg";
import vanImg from "@/assets/van-7seat.jpg";

const PAGE_TITLE = "Tài Phát - Xe 7 chỗ Bảo Lộc Sài Gòn 300k/vé, 2h/chuyến";
const PAGE_DESC = "Nhà xe Tài Phát: tuyến Bảo Lộc ⇄ Sài Gòn, xe 7 chỗ đời mới, giá 300.000đ/vé, tần suất 2 tiếng/chuyến. Đưa đón tận nơi, hỗ trợ đi bệnh viện, sân bay. Hotline 24/7.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { name: "keywords", content: "xe Bảo Lộc Sài Gòn, nhà xe Tài Phát, xe 7 chỗ Bảo Lộc, đưa đón sân bay, xe đi bệnh viện Sài Gòn" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "geo.region", content: "VN-LD" },
      { name: "geo.placename", content: "Bảo Lộc" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Tài Phát - Nhà xe Bảo Lộc Sài Gòn",
          description: PAGE_DESC,
          telephone: "+84909999999",
          priceRange: "300.000đ",
          image: heroImg,
          areaServed: [
            { "@type": "City", name: "Bảo Lộc" },
            { "@type": "City", name: "Hồ Chí Minh" },
          ],
          address: { "@type": "PostalAddress", addressLocality: "Bảo Lộc", addressRegion: "Lâm Đồng", addressCountry: "VN" },
          openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1280" },
          offers: { "@type": "Offer", price: "300000", priceCurrency: "VND", description: "Vé xe 7 chỗ Bảo Lộc - Sài Gòn" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Giá vé Tài Phát Bảo Lộc Sài Gòn bao nhiêu?", acceptedAnswer: { "@type": "Answer", text: "Giá vé chỉ 300.000đ/người/chuyến, đã bao gồm đưa đón tận nơi." } },
            { "@type": "Question", name: "Tần suất chạy xe như thế nào?", acceptedAnswer: { "@type": "Answer", text: "Xe khởi hành liên tục 2 tiếng/chuyến cả 2 chiều Bảo Lộc - Sài Gòn." } },
            { "@type": "Question", name: "Có hỗ trợ sân bay và bệnh viện không?", acceptedAnswer: { "@type": "Answer", text: "Có. Tài Phát hỗ trợ đưa đón sân bay Tân Sơn Nhất, các bệnh viện lớn tại TP.HCM và hỗ trợ đặt lịch khám." } },
          ],
        }),
      },
    ],
  }),
});

// Conversion tracking helper — pushes to dataLayer (GA4/GTM/Meta Pixel friendly)
function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params, timestamp: Date.now() });
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  if (typeof w.fbq === "function" && event === "lead") w.fbq("track", "Lead", params);
}

function trackCall(source: string) {
  trackEvent("call_click", { source, phone: "0909999999", value: 300000, currency: "VND" });
}

const HOTLINE = "0909 999 999";
const HOTLINE_TEL = "0909999999";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Header />
      <Hero />
      <PriceBar />
      <Services />
      <Route2Hour />
      <Vehicle />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Bảo Lộc ⇄ Sài Gòn — Đưa đón tận nơi</span>
        <a href={`tel:${HOTLINE_TEL}`} className="flex items-center gap-2 font-semibold hover:text-gold transition-colors">
          <Phone className="w-4 h-4" /> Hotline: {HOTLINE}
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
            <Mountain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight">TÀI PHÁT</div>
            <div className="text-xs text-muted-foreground -mt-1">Nhà xe Bảo Lộc — Sài Gòn</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#dich-vu" className="hover:text-primary">Dịch vụ</a>
          <a href="#tuyen" className="hover:text-primary">Tuyến đường</a>
          <a href="#xe" className="hover:text-primary">Phương tiện</a>
          <a href="#danh-gia" className="hover:text-primary">Đánh giá</a>
        </nav>
        <Button asChild size="lg" className="bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold font-bold">
          <a href={`tel:${HOTLINE_TEL}`}><Phone className="w-4 h-4 mr-2" /> Đặt xe ngay</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Đèo Bảo Lộc xanh mướt" width={1920} height={1280} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36">
        <div className="max-w-2xl text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur border border-gold/40 text-gold text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-gold" /> Nhà xe uy tín #1 tuyến Bảo Lộc — Sài Gòn
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Nhà xe <span className="text-gold">7 chỗ</span> <br />
            Bảo Lộc ⇄ Sài Gòn
          </h1>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/90">
            Chỉ <span className="font-bold text-gold">300.000đ/vé</span> — tần suất <span className="font-bold text-gold">2 tiếng/chuyến</span>. Đưa đón tận nhà, hỗ trợ đi bệnh viện & sân bay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold font-bold text-base h-14 px-8">
              <a href={`tel:${HOTLINE_TEL}`}><Phone className="w-5 h-5 mr-2" /> Gọi {HOTLINE}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary-foreground/40 bg-primary-foreground/10 backdrop-blur text-primary-foreground hover:bg-primary-foreground hover:text-primary h-14 px-8 font-bold">
              <a href="#dich-vu">Xem dịch vụ <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { n: "10+", l: "Năm kinh nghiệm" },
              { n: "50K+", l: "Khách hài lòng" },
              { n: "12", l: "Chuyến/ngày" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl md:text-4xl font-black text-gold">{s.n}</div>
                <div className="text-sm text-primary-foreground/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceBar() {
  const items = [
    { icon: Users, t: "300.000đ", s: "Giá vé/người" },
    { icon: Clock, t: "2 giờ", s: "Mỗi chuyến" },
    { icon: MapPin, t: "Tận nơi", s: "Đưa đón tại nhà" },
    { icon: Calendar, t: "24/7", s: "Đặt xe mọi lúc" },
  ];
  return (
    <section className="bg-gradient-primary text-primary-foreground -mt-px">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.s} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
              <i.icon className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="text-2xl font-black text-gold">{i.t}</div>
              <div className="text-sm opacity-90">{i.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Users, title: "Xe ghép 7 chỗ Bảo Lộc — Sài Gòn", desc: "Tuyến cố định, khởi hành đúng giờ, ghế êm, máy lạnh mát. Phù hợp khách đi công tác, du lịch, về quê." },
    { icon: Stethoscope, title: "Hỗ trợ đi bệnh viện", desc: "Hỗ trợ đặt lịch khám, đưa đón tận cửa bệnh viện tại Sài Gòn. Tài xế kinh nghiệm, hỗ trợ người lớn tuổi." },
    { icon: Plane, title: "Đưa đón sân bay Tân Sơn Nhất", desc: "Đặt giờ chính xác theo lịch bay. Hỗ trợ hành lý, đến sớm, không lo trễ chuyến." },
    { icon: ShieldCheck, title: "Đặt xe riêng theo yêu cầu", desc: "Bao xe gia đình, nhóm bạn, đi tour Đà Lạt — Bảo Lộc — Sài Gòn linh hoạt theo lịch trình." },
  ];
  return (
    <section id="dich-vu" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-sm font-bold mb-3">DỊCH VỤ</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Phục vụ tận tâm <br className="hidden md:block" />trên mọi hành trình</h2>
          <p className="mt-4 text-muted-foreground">Tài Phát mang đến giải pháp di chuyển tiện lợi cho mọi nhu cầu của bạn.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-6 rounded-2xl bg-card border-2 border-transparent hover:border-primary hover:shadow-elegant transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Route2Hour() {
  const stops = ["Bảo Lộc", "Đèo Bảo Lộc", "Madagui", "Dầu Giây", "Sài Gòn"];
  return (
    <section id="tuyen" className="py-20 px-4 bg-secondary/40">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-gold/20 text-primary text-sm font-bold mb-3">TUYẾN ĐƯỜNG</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Bảo Lộc — Sài Gòn <br /> chỉ <span className="text-primary">2 tiếng</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Tài xế thông thuộc cung đường, biết rõ từng đoạn đèo. Xe chạy đúng giờ, an toàn tuyệt đối — đưa bạn đến nơi nhanh nhất.</p>
          <div className="mt-8 space-y-3">
            {["Đón tận nhà tại Bảo Lộc & Sài Gòn", "Hỗ trợ điểm dọc đường: Madagui, Dầu Giây", "Khởi hành liên tục cách nhau 2 tiếng", "Tài xế lâu năm, am hiểu đèo Bảo Lộc"].map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative p-8 rounded-3xl bg-card shadow-elegant border">
          <div className="text-sm font-bold text-muted-foreground mb-6">LỘ TRÌNH CHUẨN</div>
          <div className="space-y-1">
            {stops.map((s, i) => (
              <div key={s}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0 ${i === 0 || i === stops.length - 1 ? "bg-gradient-gold text-gold-foreground shadow-gold" : "bg-secondary text-primary"}`}>
                    {i === 0 ? <MapPin className="w-5 h-5" /> : i === stops.length - 1 ? <MapPin className="w-5 h-5" /> : i}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{s}</div>
                  </div>
                  {(i === 0 || i === stops.length - 1) && <div className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded">ĐIỂM CHÍNH</div>}
                </div>
                {i < stops.length - 1 && <div className="ml-5 h-8 border-l-2 border-dashed border-primary/30" />}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Thời gian</div>
              <div className="text-2xl font-black text-primary">~2 giờ</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Giá vé</div>
              <div className="text-2xl font-black text-gold">300.000đ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Vehicle() {
  return (
    <section id="xe" className="py-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-elegant order-2 lg:order-1">
          <img src={vanImg} alt="Xe 7 chỗ Tài Phát" width={1280} height={896} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-sm font-bold mb-3">PHƯƠNG TIỆN</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Xe 7 chỗ đời mới <br /> <span className="text-primary">êm ái — an toàn</span></h2>
          <p className="mt-4 text-muted-foreground text-lg">Đội xe Tài Phát được bảo dưỡng định kỳ, ghế da rộng rãi, máy lạnh mát, wifi miễn phí. Tài xế kinh nghiệm trên 5 năm.</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { t: "Ghế da êm ái", d: "Tựa lưng cao, không gian rộng" },
              { t: "Wifi & nước miễn phí", d: "Phục vụ trên mỗi chuyến" },
              { t: "BHTN toàn diện", d: "An tâm trên mọi hành trình" },
              { t: "Tài xế 5+ năm", d: "Lái an toàn, đúng giờ" },
            ].map((f) => (
              <div key={f.t} className="p-4 rounded-xl bg-secondary/50 border">
                <div className="font-bold text-primary">{f.t}</div>
                <div className="text-sm text-muted-foreground">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Gọi hotline đặt xe", d: "Liên hệ trực tiếp hotline 24/7 để đặt chuyến nhanh chóng." },
    { n: "02", t: "Xác nhận giờ & điểm đón", d: "Tổng đài viên xác nhận giờ khởi hành và địa chỉ đón tận nơi." },
    { n: "03", t: "Tài xế đón tận nhà", d: "Xe đến đúng giờ, hỗ trợ hành lý, khởi hành an toàn." },
    { n: "04", t: "Đến nơi, thanh toán", d: "Đến điểm trả khách tận nơi, thanh toán linh hoạt tiền mặt/CK." },
  ];
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-bold mb-3">QUY TRÌNH</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Đặt xe trong <span className="text-gold">60 giây</span></h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-gold/50 transition-colors">
              <div className="text-5xl font-black text-gold mb-3">{s.n}</div>
              <div className="font-bold text-lg mb-2">{s.t}</div>
              <div className="text-sm opacity-80">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { n: "Chị Lan", r: "Khách thường xuyên", q: "Đi Tài Phát hơn 2 năm rồi, tài xế vui vẻ, xe sạch, luôn đúng giờ. Giá 300k mà phục vụ như VIP." },
    { n: "Anh Tuấn", r: "Doanh nhân", q: "Tuần nào cũng đi Sài Gòn họp. Tài Phát đưa đón tận văn phòng, đỡ phải gọi taxi nối chuyến. Rất tiện." },
    { n: "Bác Hải", r: "Đi khám bệnh", q: "Nhà xe hỗ trợ đặt lịch khám luôn cho tôi, đưa thẳng đến cửa bệnh viện Chợ Rẫy. Chu đáo lắm." },
  ];
  return (
    <section id="danh-gia" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-sm font-bold mb-3">KHÁCH HÀNG NÓI GÌ</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Hơn 50.000 khách hài lòng</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.n} className="p-7 rounded-2xl bg-card border shadow-sm hover:shadow-elegant transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-5">"{r.q}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-primary-foreground">{r.n[0]}</div>
                <div>
                  <div className="font-bold">{r.n}</div>
                  <div className="text-sm text-muted-foreground">{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-16 shadow-elegant relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/20 rounded-full blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Sẵn sàng lên đường?</h2>
            <p className="mt-4 text-lg opacity-90">Gọi ngay để đặt chuyến gần nhất. Tài Phát luôn có xe phục vụ bạn.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`tel:${HOTLINE_TEL}`} className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold hover:scale-[1.02] transition-transform">
              <div>
                <div className="text-sm font-bold opacity-80">HOTLINE 24/7</div>
                <div className="text-3xl font-black">{HOTLINE}</div>
              </div>
              <div className="w-14 h-14 rounded-full bg-gold-foreground/10 flex items-center justify-center">
                <Phone className="w-7 h-7" />
              </div>
            </a>
            <div className="text-sm text-center opacity-80">Giá vé chỉ <span className="font-bold text-gold">300.000đ</span> — Tần suất <span className="font-bold text-gold">2 tiếng/chuyến</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/80 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Mountain className="w-6 h-6 text-gold-foreground" />
            </div>
            <div>
              <div className="text-xl font-black text-primary-foreground">TÀI PHÁT</div>
              <div className="text-xs">Nhà xe Bảo Lộc — Sài Gòn</div>
            </div>
          </div>
          <p className="text-sm max-w-md">Nhà xe uy tín — tiện lợi — phục vụ tận tâm. Đồng hành cùng bạn trên mọi hành trình Bảo Lộc ⇄ Sài Gòn.</p>
        </div>
        <div>
          <div className="font-bold text-primary-foreground mb-3">Liên hệ</div>
          <div className="space-y-2 text-sm">
            <a href={`tel:${HOTLINE_TEL}`} className="flex items-center gap-2 hover:text-gold"><Phone className="w-4 h-4" /> {HOTLINE}</a>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bảo Lộc, Lâm Đồng</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 24/7 — 365 ngày</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-primary-foreground mb-3">Dịch vụ</div>
          <ul className="space-y-2 text-sm">
            <li>Xe 7 chỗ Bảo Lộc — Sài Gòn</li>
            <li>Đưa đón sân bay</li>
            <li>Hỗ trợ đi bệnh viện</li>
            <li>Bao xe theo yêu cầu</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/10 text-sm text-center">
        © {new Date().getFullYear()} Tài Phát. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}
