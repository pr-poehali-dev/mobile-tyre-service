CREATE TABLE IF NOT EXISTS price_list (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_price_list_category ON price_list(category);
CREATE INDEX IF NOT EXISTS idx_price_list_sort ON price_list(sort_order);

INSERT INTO price_list (category, name, price, sort_order) VALUES
('legkovye', 'Снятие/установка колеса R13–R15', '350 ₽', 1),
('legkovye', 'Снятие/установка колеса R16–R18', '450 ₽', 2),
('legkovye', 'Снятие/установка колеса R19+', '650 ₽', 3),
('legkovye', 'Балансировка колеса', '300 ₽', 4),
('legkovye', 'Ремонт прокола (жгут)', '500 ₽', 5),
('legkovye', 'Ремонт прокола (грибок)', '900 ₽', 6),
('legkovye', 'Полный комплект «переобувка» (4 колеса)', '2 800 ₽', 7),
('gruzovye', 'Снятие/установка колеса (до 17.5")', '900 ₽', 1),
('gruzovye', 'Снятие/установка колеса (от 19.5")', '1 400 ₽', 2),
('gruzovye', 'Балансировка грузового колеса', '700 ₽', 3),
('gruzovye', 'Ремонт камеры', '600 ₽', 4),
('gruzovye', 'Замена вентиля', '350 ₽', 5),
('gruzovye', 'Бортировка бескамерной шины', '1 200 ₽', 6),
('gruzovye', 'Выезд спецтехники', '2 500 ₽', 7);