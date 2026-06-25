import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/files/dd3a6cda-1fa4-4b1c-9b3d-5d9b91b8087b.jpg';

const NAV = [
  ['Услуги', 'services'],
  ['О компании', 'about'],
  ['Портфолио', 'portfolio'],
  ['Отзывы', 'reviews'],
  ['Прайс', 'pricing'],
  ['Блог', 'blog'],
  ['Контакты', 'contacts'],
];

const SERVICES = [
  { icon: 'Car', title: 'Легковые авто', desc: 'Замена, балансировка, ремонт проколов прямо у вашего дома или офиса' },
  { icon: 'Truck', title: 'Грузовой транспорт', desc: 'Шиномонтаж фур, автобусов и спецтехники любого тоннажа на месте' },
  { icon: 'Gauge', title: 'Балансировка', desc: 'Точная компьютерная балансировка с выездным оборудованием' },
  { icon: 'Wrench', title: 'Ремонт проколов', desc: 'Жгуты, заплатки, грибки — устраним прокол за 15 минут' },
  { icon: 'Snowflake', title: 'Сезонная замена', desc: 'Переобуем зимой и летом без очередей и ожидания' },
  { icon: 'CircleAlert', title: 'Аварийный выезд', desc: 'Работаем 24/7 — приедем на трассу или во двор в любое время' },
];

const PRICING = [
  {
    title: 'Легковые автомобили',
    icon: 'Car',
    rows: [
      ['Снятие/установка колеса R13–R15', '350 ₽'],
      ['Снятие/установка колеса R16–R18', '450 ₽'],
      ['Снятие/установка колеса R19+', '650 ₽'],
      ['Балансировка колеса', '300 ₽'],
      ['Ремонт прокола (жгут)', '500 ₽'],
      ['Ремонт прокола (грибок)', '900 ₽'],
      ['Полный комплект «переобувка» (4 колеса)', '2 800 ₽'],
    ],
  },
  {
    title: 'Грузовой транспорт',
    icon: 'Truck',
    rows: [
      ['Снятие/установка колеса (до 17.5")', '900 ₽'],
      ['Снятие/установка колеса (от 19.5")', '1 400 ₽'],
      ['Балансировка грузового колеса', '700 ₽'],
      ['Ремонт камеры', '600 ₽'],
      ['Замена вентиля', '350 ₽'],
      ['Бортировка бескамерной шины', '1 200 ₽'],
      ['Выезд спецтехники', '2 500 ₽'],
    ],
  },
];

const PORTFOLIO = [
  { tag: 'Грузовик', title: 'Замена комплекта на фуре MAN', loc: 'Трасса М4, 03:40' },
  { tag: 'Легковой', title: 'Сезонная переобувка BMW X5', loc: 'ЖК «Северный»' },
  { tag: 'Авария', title: 'Прокол на парковке ТЦ', loc: 'Центр города' },
  { tag: 'Грузовик', title: 'Бортировка автобуса', loc: 'Автопарк №7' },
];

const REVIEWS = [
  { name: 'Андрей М.', car: 'Toyota Camry', text: 'Приехали за 20 минут ночью, поменяли пробитое колесо. Спасли поездку!', rate: 5 },
  { name: 'ИП Логистика', car: 'Парк из 12 фур', text: 'Обслуживают весь автопарк. Цены честные, работают быстро и аккуратно.', rate: 5 },
  { name: 'Елена В.', car: 'Kia Rio', text: 'Переобули прямо у подъезда, не пришлось стоять в очередях. Очень удобно!', rate: 5 },
];

const BLOG = [
  { cat: 'Советы', title: 'Когда менять летнюю резину на зимнюю?', date: '12 окт' },
  { cat: 'Грузовым', title: 'Как продлить срок службы грузовых шин', date: '28 сен' },
  { cat: 'Безопасность', title: 'Что делать при проколе на трассе', date: '15 сен' },
];

const FAQ = [
  ['Как быстро вы приезжаете?', 'В черте города среднее время прибытия — 20–30 минут. На аварийный выезд по трассе выезжаем немедленно, 24/7.'],
  ['Работаете ли вы с грузовым транспортом?', 'Да, у нас есть выездное оборудование для шиномонтажа фур, автобусов и спецтехники любого тоннажа.'],
  ['Можно ли вызвать ночью?', 'Конечно. Мы работаем круглосуточно без выходных, включая праздники.'],
  ['Как происходит оплата?', 'Наличными или картой на месте после выполнения работ. Для юрлиц возможен безналичный расчёт и договор.'],
  ['Есть ли гарантия на работы?', 'Да, мы даём гарантию на все виды ремонта. Если что-то пойдёт не так — вернёмся и исправим бесплатно.'],
];

const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Heading = ({ kicker, title }: { kicker: string; title: string }) => (
  <div className="mb-12">
    <span className="inline-flex items-center gap-2 text-primary font-display uppercase tracking-[0.2em] text-sm mb-4">
      <span className="w-8 h-px bg-primary" /> {kicker}
    </span>
    <h2 className="font-display text-4xl md:text-6xl font-700 uppercase leading-[0.95]">{title}</h2>
  </div>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-xl font-700 uppercase tracking-wide">
            <Icon name="Disc3" className="text-primary animate-spin-slow" size={26} />
            Шин<span className="text-primary">Выезд</span>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {NAV.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-primary transition-colors uppercase tracking-wide">
                {label}
              </button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+78001234567" className="font-display text-lg font-600 hover:text-primary transition-colors">
              8 800 123-45-67
            </a>
            <Button onClick={() => scrollTo('contacts')} className="font-display uppercase font-600">
              Вызвать
            </Button>
          </div>
          <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={28} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 uppercase font-display tracking-wide hover:text-primary">
                {label}
              </button>
            ))}
            <Button onClick={() => scrollTo('contacts')} className="font-display uppercase mt-2">Вызвать мастера</Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Выездной шиномонтаж" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 grid-texture opacity-30" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Работаем 24/7 без выходных
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-700 uppercase leading-[0.9] mb-6 animate-fade-in-up">
            Выездной<br />
            <span className="text-primary">шиномонтаж</span><br />
            <span className="text-stroke">за 20 минут</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
            Приедем к вам с профессиональным оборудованием. Легковые и грузовые авто. Город, двор, трасса — в любое время суток.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <Button size="lg" onClick={() => scrollTo('contacts')} className="font-display uppercase text-base font-600 glow h-14 px-8">
              <Icon name="Phone" size={20} /> Вызвать мастера
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo('pricing')} className="font-display uppercase text-base font-600 h-14 px-8 border-border">
              Прайс-лист
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 mt-14 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
            {[['8 лет', 'на рынке'], ['24/7', 'выезд'], ['20 мин', 'среднее время'], ['12k+', 'довольных клиентов']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl md:text-4xl font-700 text-primary">{n}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center font-display uppercase text-lg font-600">
              {['Балансировка', 'Замена колёс', 'Ремонт проколов', 'Грузовой шиномонтаж', 'Сезонная переобувка', 'Аварийный выезд'].map((t) => (
                <span key={t} className="flex items-center px-6">
                  <Icon name="Asterisk" size={18} className="mr-6" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <Section id="services">
        <Heading kicker="Что мы делаем" title="Услуги выездного сервиса" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="group bg-card border border-border rounded-2xl p-7 hover:border-primary transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Icon name={s.icon} size={28} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-2xl font-600 uppercase mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" className="bg-card border-y border-border">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Heading kicker="О компании" title="Сервис, который приезжает сам" />
            <p className="text-lg text-muted-foreground mb-6">
              Мы — команда профессиональных шиномонтажников с мобильным оборудованием. Восемь лет помогаем водителям не терять время в очередях. Наши бригады работают круглосуточно и обслуживают как частных автовладельцев, так и корпоративные автопарки.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['ShieldCheck', 'Гарантия на все работы'],
                ['Clock', 'Быстрый выезд 24/7'],
                ['BadgeRussianRuble', 'Честные фиксированные цены'],
                ['Users', 'Опытные мастера'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon} size={22} className="text-primary shrink-0" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={HERO_IMG} alt="Наша работа" className="rounded-2xl border border-border w-full" />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 hidden md:block glow">
              <div className="font-display text-4xl font-700">12 000+</div>
              <div className="uppercase text-sm font-600">выполненных выездов</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <Heading kicker="Прайс-лист" title="Цены на все виды работ" />
        <div className="grid md:grid-cols-2 gap-6">
          {PRICING.map((block) => (
            <div key={block.title} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 bg-primary text-primary-foreground px-7 py-5">
                <Icon name={block.icon} size={26} />
                <h3 className="font-display text-2xl font-700 uppercase">{block.title}</h3>
              </div>
              <div className="divide-y divide-border">
                {block.rows.map(([name, price]) => (
                  <div key={name} className="flex items-center justify-between px-7 py-4 hover:bg-secondary transition-colors">
                    <span className="text-muted-foreground pr-4">{name}</span>
                    <span className="font-display text-lg font-600 text-foreground whitespace-nowrap">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 text-sm">
          * Выезд по городу — бесплатно при заказе от 1500 ₽. Точную стоимость уточняйте у оператора.
        </p>
      </Section>

      {/* Portfolio */}
      <Section id="portfolio" className="bg-card border-y border-border">
        <Heading kicker="Наши работы" title="Портфолио выездов" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PORTFOLIO.map((p) => (
            <div key={p.title} className="group relative rounded-2xl overflow-hidden border border-border aspect-[3/4]">
              <img src={HERO_IMG} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-5">
                <span className="self-start bg-primary text-primary-foreground text-xs font-600 uppercase px-3 py-1 rounded-full mb-3">{p.tag}</span>
                <h3 className="font-display text-xl font-600 uppercase leading-tight mb-1">{p.title}</h3>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="MapPin" size={14} /> {p.loc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section id="reviews">
        <Heading kicker="Отзывы" title="Что говорят клиенты" />
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-2xl p-7 flex flex-col">
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(r.rate)].map((_, i) => <Icon key={i} name="Star" size={18} className="fill-primary" />)}
              </div>
              <p className="text-foreground mb-6 flex-1">«{r.text}»</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-display font-700 text-primary">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-600">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.car}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section id="blog" className="bg-card border-y border-border">
        <Heading kicker="Блог" title="Полезное для водителей" />
        <div className="grid md:grid-cols-3 gap-5">
          {BLOG.map((b) => (
            <article key={b.title} className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors">
              <div className="relative h-44 overflow-hidden">
                <img src={HERO_IMG} alt={b.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-600 uppercase px-3 py-1 rounded-full">{b.cat}</span>
              </div>
              <div className="p-6">
                <span className="text-sm text-muted-foreground">{b.date}</span>
                <h3 className="font-display text-xl font-600 uppercase leading-tight mt-2 group-hover:text-primary transition-colors">{b.title}</h3>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
                  Читать <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Heading kicker="FAQ" title="Вопросы и ответы" />
        <Accordion type="single" collapsible className="max-w-3xl">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="font-display text-lg md:text-xl font-500 uppercase text-left hover:text-primary hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Contacts / CTA */}
      <Section id="contacts" className="bg-card border-t border-border">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-texture opacity-10" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-700 uppercase leading-[0.95] mb-4">
                Нужен мастер? Вызывайте!
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Оставьте заявку или позвоните — бригада выедет к вам в течение 20 минут.
              </p>
              <div className="space-y-4">
                <a href="tel:+78001234567" className="flex items-center gap-3 font-display text-2xl font-700">
                  <Icon name="Phone" size={26} /> 8 800 123-45-67
                </a>
                <div className="flex items-center gap-3"><Icon name="Mail" size={22} /> zayavka@shinvyezd.ru</div>
                <div className="flex items-center gap-3"><Icon name="Clock" size={22} /> Круглосуточно, без выходных</div>
                <div className="flex items-center gap-3"><Icon name="MapPin" size={22} /> Выезд по городу и области</div>
              </div>
            </div>
            <form className="bg-background text-foreground rounded-2xl p-7 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-display text-2xl font-600 uppercase">Оставить заявку</h3>
              <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Ваше имя" />
              <input className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Телефон" />
              <textarea className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors resize-none" rows={3} placeholder="Какая услуга нужна? (адрес, авто)" />
              <Button type="submit" className="w-full font-display uppercase font-600 h-12 text-base">Вызвать мастера</Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-background border-t border-border px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2 font-display text-lg font-700 uppercase text-foreground">
            <Icon name="Disc3" className="text-primary" size={22} /> Шин<span className="text-primary">Выезд</span>
          </div>
          <p>© 2026 ШинВыезд. Выездной шиномонтаж 24/7.</p>
          <div className="flex gap-4">
            <Icon name="Send" size={20} className="hover:text-primary cursor-pointer transition-colors" />
            <Icon name="MessageCircle" size={20} className="hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Phone" size={20} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
