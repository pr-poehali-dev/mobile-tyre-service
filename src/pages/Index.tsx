import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG = 'https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/files/74357bcc-f5a7-402d-9e80-8b9d02102fc2.jpg';
const WORK_IMG = 'https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/files/dd3a6cda-1fa4-4b1c-9b3d-5d9b91b8087b.jpg';

const NAV = [
  ['Услуги', 'services'],
  ['О нас', 'about'],
  ['Портфолио', 'portfolio'],
  ['Отзывы', 'reviews'],
  ['Прайс', 'pricing'],
  ['Блог', 'blog'],
  ['Контакты', 'contacts'],
];

const SERVICES = [
  { icon: 'Car', title: 'Легковые авто', desc: 'Замена, балансировка, ремонт проколов прямо у вашего дома или офиса', color: 'pink' },
  { icon: 'Truck', title: 'Грузовой транспорт', desc: 'Шиномонтаж фур, автобусов и спецтехники любого тоннажа на месте', color: 'cyan' },
  { icon: 'Gauge', title: 'Балансировка', desc: 'Точная компьютерная балансировка с выездным оборудованием', color: 'pink' },
  { icon: 'Wrench', title: 'Ремонт проколов', desc: 'Жгуты, заплатки, грибки — устраним прокол за 15 минут', color: 'cyan' },
  { icon: 'Snowflake', title: 'Сезонная замена', desc: 'Переобуем зимой и летом без очередей и ожидания', color: 'pink' },
  { icon: 'Zap', title: 'Аварийный выезд', desc: 'Работаем 24/7 — приедем на трассу или во двор в любое время', color: 'cyan' },
];

const PRICING = [
  {
    title: 'Легковые',
    icon: 'Car',
    color: 'pink',
    rows: [
      ['Снятие/установка R13–R15', '350 ₽'],
      ['Снятие/установка R16–R18', '450 ₽'],
      ['Снятие/установка R19+', '650 ₽'],
      ['Балансировка колеса', '300 ₽'],
      ['Ремонт прокола (жгут)', '500 ₽'],
      ['Ремонт прокола (грибок)', '900 ₽'],
      ['Переобувка 4 колеса', '2 800 ₽'],
    ],
  },
  {
    title: 'Грузовые',
    icon: 'Truck',
    color: 'cyan',
    rows: [
      ['Снятие/установка до 17.5"', '900 ₽'],
      ['Снятие/установка от 19.5"', '1 400 ₽'],
      ['Балансировка грузового', '700 ₽'],
      ['Ремонт камеры', '600 ₽'],
      ['Замена вентиля', '350 ₽'],
      ['Бортировка бескамерной', '1 200 ₽'],
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

const STATS = [['8 лет', 'на рынке'], ['24/7', 'выезд'], ['20 мин', 'время прибытия'], ['12K+', 'клиентов']];

const PINK = 'var(--neon-pink)';
const CYAN = 'var(--neon-cyan)';

const neonColor = (c: string) => c === 'pink' ? PINK : CYAN;
const neonShadow = (c: string) => `0 0 20px ${neonColor(c)}`;
const neonBorder = (c: string) => `1px solid ${c === 'pink' ? 'rgba(255,45,155,0.3)' : 'rgba(0,245,255,0.3)'}`;

const NeonTag = ({ children, color = 'pink' }: { children: React.ReactNode; color?: string }) => (
  <span
    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm"
    style={{
      color: neonColor(color),
      border: `1px solid ${neonColor(color)}`,
      textShadow: `0 0 8px ${neonColor(color)}`,
      boxShadow: `0 0 6px ${neonColor(color)}`,
    }}
  >
    {children}
  </span>
);

const NeonHeading = ({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) => (
  <div className="mb-12">
    <NeonTag>{kicker}</NeonTag>
    <h2 className="font-display text-5xl md:text-7xl uppercase mt-4 leading-none" style={{ textShadow: '0 0 30px rgba(255,45,155,0.4)' }}>
      {title}{sub && <> <span style={{ color: CYAN, textShadow: `0 0 30px ${CYAN}` }}>{sub}</span></>}
    </h2>
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
      <header className="fixed top-0 inset-x-0 z-50 border-b" style={{ background: 'rgba(8,4,18,0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,45,155,0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1 font-display text-2xl uppercase tracking-wider">
            <Icon name="Disc3" size={26} className="animate-spin-slow" style={{ color: PINK, filter: `drop-shadow(0 0 8px ${PINK})` }} />
            <span style={{ color: PINK, textShadow: `0 0 12px ${PINK}` }}>Шин</span>
            <span style={{ color: CYAN, textShadow: `0 0 12px ${CYAN}` }}>Выезд</span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="transition-all hover:scale-105"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = CYAN; (e.target as HTMLElement).style.textShadow = `0 0 10px ${CYAN}`; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.target as HTMLElement).style.textShadow = 'none'; }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78001234567" className="font-display text-lg" style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>
              8 800 123-45-67
            </a>
            <button
              onClick={() => scrollTo('contacts')}
              className="font-display uppercase text-sm px-5 py-2 rounded-sm font-bold tracking-widest transition-all hover:scale-105"
              style={{ background: PINK, color: '#fff', boxShadow: `0 0 20px ${PINK}` }}
            >
              Вызвать
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: PINK }}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={28} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t px-6 py-4 flex flex-col gap-3 animate-fade-in" style={{ background: 'rgba(8,4,18,0.97)', borderColor: 'rgba(255,45,155,0.2)' }}>
            {NAV.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 font-display uppercase text-lg tracking-wider" style={{ color: CYAN }}>
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo('contacts')} className="mt-2 font-display uppercase px-5 py-3 rounded-sm font-bold" style={{ background: PINK, color: '#fff', boxShadow: `0 0 20px ${PINK}` }}>
              Вызвать мастера
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(8,4,18,0.97) 0%, rgba(20,4,40,0.85) 50%, rgba(8,4,18,0.92) 100%)' }} />
          <div className="absolute inset-0 grid-texture" />
          <div className="absolute bottom-0 left-0 right-0 h-64 retro-grid opacity-25" />
        </div>
        <div className="absolute top-24 right-8 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: PINK }} />
        <div className="absolute bottom-32 left-8 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: CYAN }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="mb-6 animate-fade-in">
            <NeonTag color="cyan">Выезд 24/7 · Легковые & Грузовые</NeonTag>
          </div>

          <h1 className="font-display uppercase leading-none mb-6 animate-fade-in-up" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
            <span style={{ color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.15)' }}>ВЫЕЗДНОЙ</span><br />
            <span style={{ color: PINK, textShadow: `0 0 40px ${PINK}, 0 0 80px rgba(255,45,155,0.3)` }}>ШИНОМОНТАЖ</span><br />
            <span className="text-stroke" style={{ fontSize: '85%' }}>ЗА 20 МИНУТ</span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl mb-10 animate-fade-in-up" style={{ color: 'rgba(255,255,255,0.6)', animationDelay: '0.15s', opacity: 0 }}>
            Профессиональное оборудование — прямо к вашей машине. Город, двор, трасса. В любое время суток.
          </p>

          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <button
              onClick={() => scrollTo('contacts')}
              className="font-display uppercase text-base px-8 h-14 rounded-sm font-bold tracking-widest flex items-center gap-2 transition-all hover:scale-105"
              style={{ background: PINK, color: '#fff', boxShadow: `0 0 30px ${PINK}, 0 0 60px rgba(255,45,155,0.3)` }}
            >
              <Icon name="Phone" size={20} /> Вызвать мастера
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="font-display uppercase text-base px-8 h-14 rounded-sm font-bold tracking-widest flex items-center gap-2 transition-all hover:scale-105"
              style={{ border: `1px solid ${CYAN}`, color: CYAN, boxShadow: `0 0 15px ${CYAN}`, background: 'transparent' }}
            >
              Прайс-лист
            </button>
          </div>

          <div className="flex flex-wrap gap-10 animate-fade-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
            {STATS.map(([n, l], i) => (
              <div key={l}>
                <div className="font-display text-4xl md:text-5xl" style={{ color: i % 2 === 0 ? PINK : CYAN, textShadow: `0 0 20px ${i % 2 === 0 ? PINK : CYAN}` }}>{n}</div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 overflow-hidden border-y" style={{ background: PINK, borderColor: PINK }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center font-display uppercase text-lg font-bold text-white">
              {['Балансировка', 'Замена колёс', 'Ремонт проколов', 'Грузовой шиномонтаж', 'Сезонная переобувка', 'Аварийный выезд'].map((t) => (
                <span key={t} className="flex items-center px-6">
                  <Icon name="Asterisk" size={16} className="mr-4" /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 relative">
        <div className="absolute inset-0 grid-texture opacity-40" />
        <div className="relative max-w-6xl mx-auto">
          <NeonHeading kicker="Услуги" title="Что мы" sub="делаем" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-sm p-7 transition-all hover:-translate-y-1 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: neonBorder(s.color) }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = neonShadow(s.color); }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div className="w-14 h-14 rounded-sm flex items-center justify-center mb-5" style={{ background: `${neonColor(s.color)}18`, border: `1px solid ${neonColor(s.color)}` }}>
                  <Icon name={s.icon} size={26} style={{ color: neonColor(s.color), filter: `drop-shadow(0 0 6px ${neonColor(s.color)})` }} />
                </div>
                <h3 className="font-display text-2xl uppercase mb-2" style={{ color: neonColor(s.color) }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 relative border-y" style={{ borderColor: 'rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.02)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <NeonHeading kicker="О компании" title="Сервис, который" sub="приезжает сам" />
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Восемь лет помогаем водителям не терять время в очередях. Мобильные бригады с профессиональным оборудованием работают круглосуточно — частные клиенты и корпоративные автопарки.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[['ShieldCheck', 'Гарантия на все работы', 'pink'], ['Clock', 'Быстрый выезд 24/7', 'cyan'], ['BadgeRussianRuble', 'Честные фиксированные цены', 'pink'], ['Users', 'Опытные мастера', 'cyan']].map(([icon, text, c]) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon} size={20} style={{ color: neonColor(c), filter: `drop-shadow(0 0 5px ${neonColor(c)})`, flexShrink: 0 }} />
                  <span className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={WORK_IMG} alt="Наша работа" className="rounded-sm w-full" style={{ border: `1px solid rgba(0,245,255,0.3)`, boxShadow: '0 0 40px rgba(0,245,255,0.12)' }} />
            <div className="absolute -bottom-6 -left-6 rounded-sm p-6 hidden md:block" style={{ background: PINK, boxShadow: `0 0 30px ${PINK}` }}>
              <div className="font-display text-4xl text-white">12 000+</div>
              <div className="uppercase text-xs font-bold tracking-widest text-white/80">выполненных выездов</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <NeonHeading kicker="Прайс-лист" title="Цены на все" sub="виды работ" />
          <div className="grid md:grid-cols-2 gap-6">
            {PRICING.map((block) => (
              <div key={block.title} className="rounded-sm overflow-hidden" style={{ border: neonBorder(block.color) }}>
                <div className="flex items-center gap-3 px-7 py-5" style={{ background: `${neonColor(block.color)}18`, borderBottom: neonBorder(block.color) }}>
                  <Icon name={block.icon} size={26} style={{ color: neonColor(block.color), filter: `drop-shadow(0 0 6px ${neonColor(block.color)})` }} />
                  <h3 className="font-display text-3xl uppercase" style={{ color: neonColor(block.color), textShadow: `0 0 10px ${neonColor(block.color)}` }}>{block.title}</h3>
                </div>
                <div>
                  {block.rows.map(([name, price]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between px-7 py-4 transition-all"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{name}</span>
                      <span className="font-display text-xl" style={{ color: neonColor(block.color), textShadow: `0 0 8px ${neonColor(block.color)}` }}>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            * Выезд по городу — бесплатно при заказе от 1500 ₽. Точную стоимость уточняйте у оператора.
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6 border-y" style={{ borderColor: 'rgba(255,45,155,0.15)', background: 'rgba(255,45,155,0.02)' }}>
        <div className="max-w-6xl mx-auto">
          <NeonHeading kicker="Портфолио" title="Наши" sub="работы" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={p.title} className="group relative rounded-sm overflow-hidden aspect-[3/4]">
                <img src={i % 2 === 0 ? HERO_IMG : WORK_IMG} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,4,18,0.95) 0%, rgba(8,4,18,0.2) 60%, transparent 100%)' }} />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <NeonTag color={i % 2 === 0 ? 'pink' : 'cyan'}>{p.tag}</NeonTag>
                  <h3 className="font-display text-xl uppercase leading-tight mt-3 mb-1 text-white">{p.title}</h3>
                  <span className="text-sm flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <Icon name="MapPin" size={13} /> {p.loc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <NeonHeading kicker="Отзывы" title="Что говорят" sub="клиенты" />
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="rounded-sm p-7 flex flex-col" style={{ background: 'rgba(255,255,255,0.03)', border: neonBorder(i % 2 === 0 ? 'pink' : 'cyan') }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rate)].map((_, j) => (
                    <Icon key={j} name="Star" size={16} style={{ color: PINK, filter: `drop-shadow(0 0 4px ${PINK})` }} />
                  ))}
                </div>
                <p className="flex-1 mb-6 italic" style={{ color: 'rgba(255,255,255,0.7)' }}>«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center font-display text-xl font-bold" style={{ background: 'rgba(255,45,155,0.15)', color: PINK, border: `1px solid ${PINK}`, boxShadow: `0 0 8px ${PINK}` }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{r.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 px-6 border-y" style={{ borderColor: 'rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.02)' }}>
        <div className="max-w-6xl mx-auto">
          <NeonHeading kicker="Блог" title="Полезное для" sub="водителей" />
          <div className="grid md:grid-cols-3 gap-5">
            {BLOG.map((b, i) => (
              <article key={b.title} className="group rounded-sm overflow-hidden transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: neonBorder(i % 2 === 0 ? 'pink' : 'cyan') }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={i % 2 === 0 ? HERO_IMG : WORK_IMG} alt={b.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,4,18,0.8), transparent)' }} />
                  <span className="absolute top-4 left-4">
                    <NeonTag color={i % 2 === 0 ? 'pink' : 'cyan'}>{b.cat}</NeonTag>
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{b.date}</span>
                  <h3 className="font-display text-xl uppercase leading-tight mt-2 text-white">{b.title}</h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold mt-4" style={{ color: CYAN }}>
                    Читать <Icon name="ArrowRight" size={15} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <NeonHeading kicker="FAQ" title="Вопросы и" sub="ответы" />
          <Accordion type="single" collapsible className="max-w-3xl space-y-2">
            {FAQ.map(([q, a], i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-sm px-1"
                style={{ border: neonBorder(i % 2 === 0 ? 'pink' : 'cyan'), background: 'rgba(255,255,255,0.02)' }}
              >
                <AccordionTrigger className="font-display text-lg uppercase text-left px-5 hover:no-underline" style={{ color: i % 2 === 0 ? PINK : CYAN }}>
                  {q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 border-t" style={{ borderColor: 'rgba(255,45,155,0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-sm p-8 md:p-14 overflow-hidden" style={{ border: '1px solid rgba(255,45,155,0.3)', background: 'rgba(255,45,155,0.04)' }}>
            <div className="absolute inset-0 grid-texture opacity-30" />
            <div className="absolute top-0 right-0 w-72 h-72 opacity-15 blur-3xl rounded-full" style={{ background: PINK }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 opacity-10 blur-3xl rounded-full" style={{ background: CYAN }} />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display uppercase leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  <span className="text-white">Нужен</span><br />
                  <span style={{ color: PINK, textShadow: `0 0 30px ${PINK}` }}>мастер?</span><br />
                  <span style={{ color: CYAN, textShadow: `0 0 30px ${CYAN}` }}>Вызывайте!</span>
                </h2>
                <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Оставьте заявку или позвоните — бригада выедет к вам в течение 20 минут.
                </p>
                <div className="space-y-4">
                  <a href="tel:+78001234567" className="flex items-center gap-3 font-display text-2xl" style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>
                    <Icon name="Phone" size={24} /> 8 800 123-45-67
                  </a>
                  {[['Mail', 'zayavka@shinvyezd.ru'], ['Clock', 'Круглосуточно, без выходных'], ['MapPin', 'Выезд по городу и области']].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <Icon name={icon} size={18} style={{ color: PINK }} /> {text}
                    </div>
                  ))}
                </div>
              </div>

              <form
                className="rounded-sm p-7 space-y-4"
                style={{ background: 'rgba(8,4,18,0.85)', border: `1px solid rgba(0,245,255,0.25)`, boxShadow: `0 0 30px rgba(0,245,255,0.08)` }}
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className="font-display text-2xl uppercase" style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>Оставить заявку</h3>
                {['Ваше имя', 'Телефон'].map((ph) => (
                  <input
                    key={ph}
                    className="w-full rounded-sm px-4 py-3 outline-none text-white transition-all"
                    placeholder={ph}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = CYAN; (e.target as HTMLInputElement).style.boxShadow = `0 0 10px rgba(0,245,255,0.2)`; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
                  />
                ))}
                <textarea
                  className="w-full rounded-sm px-4 py-3 outline-none text-white resize-none transition-all"
                  rows={3}
                  placeholder="Какая услуга нужна? (адрес, авто)"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = CYAN; }}
                  onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                />
                <button
                  type="submit"
                  className="w-full font-display uppercase text-base py-3 rounded-sm font-bold tracking-widest transition-all hover:scale-[1.02]"
                  style={{ background: PINK, color: '#fff', boxShadow: `0 0 25px ${PINK}` }}
                >
                  Вызвать мастера
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10" style={{ borderColor: 'rgba(255,45,155,0.15)', background: 'rgba(8,4,18,0.9)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 font-display text-xl uppercase">
            <Icon name="Disc3" size={22} style={{ color: PINK, filter: `drop-shadow(0 0 6px ${PINK})` }} />
            <span style={{ color: PINK, textShadow: `0 0 10px ${PINK}` }}>Шин</span>
            <span style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>Выезд</span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>© 2026 ШинВыезд · Выездной шиномонтаж 24/7</p>
          <div className="flex gap-4">
            {['Send', 'MessageCircle', 'Phone'].map((icon) => (
              <Icon
                key={icon}
                name={icon}
                size={20}
                className="cursor-pointer transition-all hover:scale-110"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e: React.MouseEvent) => { (e.currentTarget as SVGElement).style.color = CYAN; (e.currentTarget as SVGElement).style.filter = `drop-shadow(0 0 6px ${CYAN})`; }}
                onMouseLeave={(e: React.MouseEvent) => { (e.currentTarget as SVGElement).style.color = 'rgba(255,255,255,0.3)'; (e.currentTarget as SVGElement).style.filter = 'none'; }}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
