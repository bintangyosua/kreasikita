<h1 style="text-align: center;">KreasiKita</h1>

Website Kreasi Kita adalah platform untuk mendukung kreator. Pengguna dapat memberikan donasi untuk kreator favorit mereka.

![Snapshot](./public/snapshot.png)

embantu penggalangan dana. Platform ini menyediakan proses donasi yang mudah dan aman, transparansi, dan komunitas yang suportif. Mari bergabung dan dukung kreativitas dan kepedulian!

## Technologies

<div align="center">
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" alt="Nest.js" title="Nest.js"/>
	<img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" title="MySQL"/>
</div>

## Deploy KreasiKita di Local Environment

Karena website KreasiKita terdiri dari dua environment yang berbeda, kita perlu menjalankan dua aplilkasi yang berbeda pula.

### Clone

1. Clone Project `git clone https://github.com/bintangyosua/kreasikita.git`
2. Membuat database di MySQL bernama `kreasikita`.

### Menjalankan Server

1. Ketikkan perintah `cd server` untuk berpindah ke direktori server
2. Edit filei `.env.example`, ubah nama file menjadi `.env` dan token Midtrans anda
3. Lalu, ketik `npm install`
4. Setelah itu, ketik `npx prisma migrate deploy`
5. Ketikkan `npm prisma db seed` untuk mengenerate kategori dan default user
6. Lalu, langkah untuk menjalankan server backend yaitu dengan mengetik perintah `npm run build && npm run start:prod`

### Menjalankan Client

1. Ketikkan perintah `cd client` untuk berpindah ke direktori client
2. Edit filei `.env.example`, ubah nama file menjadi `.env` dan token Midtrans anda
3. Lalu, ketik `npm install`
4. Setelah itu, ketikkan `npm run build`
5. Selanjutnya, ketik perintah `npm run start` untuk menjalankan client,

## Spesifikasi

### Daftar User

- Admin
- Kreator

## Roadmap

Daftar fitur yang dikerjakan beserta progres yang telah dikerjakan

### M1 Setup Website

- [x] Setup client dan server
- [x] Membuat UI/UX halaman utama
- [x] Slicing UI/UX halaman utama ke Client
- [x] Membuat proses logika bisnis di Server (autentikasi dan manajemen user)

### M2 Fitur Kreator

- [x] Halaman daftar kreator
- [x] Halaman Kreator

### M3 Fitur Donasi

- [x] Halaman daftar donasi
- [x] Halaman per donasi

### M4 Payment Gateway

- [x] Metode Pembayaran
