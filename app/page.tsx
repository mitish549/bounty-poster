export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      
      {/* Top bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
        <h1 className="text-xl font-black tracking-[0.2em]">
          BOUNTY
        </h1>

        <button className="rounded-md bg-red-700 px-5 py-2 font-bold hover:bg-red-600 transition">
          CREATE YOUR BOUNTY
        </button>
      </header>

      {/* Three-column layout */}
      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-12">

        {/* Left sidebar */}
        <aside className="col-span-2 border-r border-white/10 p-6">
          <p className="mb-6 text-xs tracking-widest text-white/40">
            MENU
          </p>

          <nav className="space-y-4">
            <div className="font-semibold">🏴 Bounty</div>
            <div className="text-white/50">🎨 Templates</div>
            <div className="text-white/50">🏆 Bounty Board</div>
          </nav>
        </aside>

        {/* Main content */}
        <section className="col-span-7 flex items-center justify-center p-10">
          <div className="max-w-xl text-center">

            <p className="mb-5 text-sm tracking-[0.4em] text-red-500">
              THE WORLD GOVERNMENT
            </p>

            <h2 className="text-6xl font-black leading-tight">
              WHAT'S YOUR
              <br />
              BOUNTY?
            </h2>

            <p className="mt-6 text-white/50">
              Create your own wanted poster and let the world know your name.
            </p>

            <button className="mt-8 rounded-md bg-red-700 px-8 py-4 font-bold hover:bg-red-600 transition">
              CREATE POSTER
            </button>

          </div>
        </section>

        {/* Poster preview */}
        <aside className="col-span-3 border-l border-white/10 p-6">
          <p className="mb-6 text-xs tracking-widest text-white/40">
            LIVE PREVIEW
          </p>

          <div className="flex aspect-[3/4] items-center justify-center bg-[#d8c49a] text-black">
            <div className="text-center">
              <h3 className="text-4xl font-black">
                WANTED
              </h3>

              <p className="mt-4 font-bold">
                YOUR NAME
              </p>

              <p className="mt-6 text-2xl font-black">
                ฿ 0
              </p>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}