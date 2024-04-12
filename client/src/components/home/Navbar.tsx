export default function Navbar() {
  return (
    <nav className="bg-purple h-16 ">
      <div className="container mx-auto h-full">
        <div className="flex justify-between items-center h-full">
          <h1 className="text-white text-4xl font-bold">LOGO</h1>
          <div className="flex gap-10">
            <a href="#" className="text-white text-md">
              Kategori
            </a>
            <a href="#" className="text-white text-md">
              Donasi
            </a>
            <a href="#" className="text-white text-md">
              Blog
            </a>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-white text-md">
              Masuk
            </a>
            <a href="#" className="text-white text-md">
              Daftar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
