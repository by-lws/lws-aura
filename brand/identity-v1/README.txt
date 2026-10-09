Aura by LWS — белый фирменный LWS на чёрном фоне

Источник: public/assets/lws-logo.jpg, существующий знак пользователя.
Буквы, молния, сердце и подтёки сохранены. SVG содержит настоящие
векторные контуры, полученные трассировкой исходного рисунка.
ImageGen не использован: задача решена без перерисовки фирменного знака.

Мастера:
- aura-lws-master.svg / aura-lws-master-1024.png — чёрная плитка.
- aura-lws-symbol.svg / aura-lws-transparent-1024.png — белый знак с альфой.
- aura-lws-symbol-dark.svg — тёмный знак для светлых поверхностей.
- aura-lws-preview.svg — исходник превью ссылок 1200×630.
- aura-lws-proof.png — реальные размеры 16–128 px на светлом/тёмном фоне.

Рабочие файлы сайта: public/brand/, public/favicon.svg,
public/favicon.ico, public/apple-touch-icon.png.
Manifest: app/manifest.ts. Metadata: app/layout.tsx.
PNG для maskable-иконок имеют чёрный фон на всю площадь и безопасные поля.

Пересборка: scripts/build-brand-icons.py
Зависимости генератора: Pillow, vtracer, resvg-py.
Они нужны только для пересборки графики, а не для запуска сайта.
