import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getServiceBySlug, SERVICES } from '@/data/services';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/files/dd3a6cda-1fa4-4b1c-9b3d-5d9b91b8087b.jpg';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug ?? '');

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">Услуга не найдена</p>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </div>
    );
  }

  const scrollToForm = () => {
    document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="font-medium">Назад</span>
          </button>
          <span className="text-border">|</span>
          <div className="flex items-center">
            <img src="https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/bucket/b444a318-cc7e-4b5b-9859-02e3dfdf2e30.jpg" alt="Pit Stop Moscow" className="h-10 w-auto object-contain" />
          </div>
          <div className="ml-auto hidden md:flex items-center gap-3">
            <a href="tel:+78001234567" className="font-display text-lg font-600 hover:text-primary transition-colors">
              8 800 123-45-67
            </a>
            <Button onClick={scrollToForm} className="font-display uppercase font-600">
              Вызвать
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt={service.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 grid-texture opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name={service.icon} size={34} className="text-primary" />
            </div>
            <span className="inline-flex items-center gap-2 text-primary font-display uppercase tracking-[0.2em] text-sm">
              <span className="w-8 h-px bg-primary" /> Услуга
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-700 uppercase leading-[0.9] mb-4">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
            {service.fullDesc}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={scrollToForm} className="font-display uppercase text-base font-600 glow h-14 px-8">
              <Icon name="Phone" size={20} /> Вызвать мастера
            </Button>
            <div className="font-display text-2xl font-700 text-primary">{service.price}</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Steps */}
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-700 uppercase mb-6">
            <span className="text-primary">Как</span> это работает
          </h2>
          <ol className="space-y-4">
            {service.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-display font-700 text-lg flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="pt-1 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-700 uppercase mb-6">
            <span className="text-primary">Почему</span> выбирают нас
          </h2>
          <ul className="space-y-4">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-4">
                <Icon name="CheckCircle" size={22} className="text-primary shrink-0" />
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-card border-y border-border px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-700 uppercase mb-8">
            Другие <span className="text-primary">услуги</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
              <button
                key={s.slug}
                onClick={() => { navigate(`/services/${s.slug}`); window.scrollTo(0, 0); }}
                className="group bg-background border border-border rounded-xl p-5 text-left hover:border-primary transition-all hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                  <Icon name={s.icon} size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-lg font-600 uppercase leading-tight mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="service-form" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grid-texture opacity-10" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-700 uppercase leading-[0.95] mb-4">
                  Заказать «{service.title}»
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-6">
                  Оставьте заявку — мастер приедет в течение 20 минут.
                </p>
                <div className="space-y-3">
                  <a href="tel:+78001234567" className="flex items-center gap-3 font-display text-2xl font-700">
                    <Icon name="Phone" size={24} /> 8 800 123-45-67
                  </a>
                  <div className="flex items-center gap-3 text-primary-foreground/80">
                    <Icon name="Clock" size={20} /> Круглосуточно, без выходных
                  </div>
                </div>
              </div>
              <form
                className="bg-background text-foreground rounded-2xl p-7 space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className="font-display text-2xl font-600 uppercase">Оставить заявку</h3>
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="Ваше имя"
                />
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors"
                  placeholder="Телефон"
                />
                <input
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors"
                  defaultValue={service.title}
                  placeholder="Услуга"
                  readOnly
                />
                <textarea
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors resize-none"
                  rows={2}
                  placeholder="Адрес и марка авто"
                />
                <Button type="submit" className="w-full font-display uppercase font-600 h-12 text-base">
                  Вызвать мастера
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center">
            <img src="https://cdn.poehali.dev/projects/b998f748-dc8d-44b0-b142-24efe796f2fc/bucket/b444a318-cc7e-4b5b-9859-02e3dfdf2e30.jpg" alt="Pit Stop Moscow" className="h-10 w-auto object-contain" />
          </div>
          <p>© 2026 Pit Stop Moscow. Выездной шиномонтаж 24/7.</p>
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
            На главную →
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;