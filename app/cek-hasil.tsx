"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { cekHasil, type HasilCek } from "./actions";
import type { Penerimaan } from "./divisi";

export function CekHasil() {
  const [state, formAction, pending] = useActionState<HasilCek, FormData>(cekHasil, { status: "idle" });
  const hasilRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (state.status === "lolos" || state.status === "tidak") hasilRef.current?.focus();
  }, [state]);

  const ada = state.status === "lolos" || state.status === "tidak";

  return (
    <div className="page">
      <div className="stage">
        <Image className="chev chev-a" src="/brand/chevron-yellow.svg" alt="" width={865} height={868} priority />
        <Image className="chev chev-b" src="/brand/chevron-yellow.svg" alt="" width={865} height={868} />

        <header className="topbar">
          <div className="brand">
            <Image src="/brand/logo-mark.svg" alt="" width={250} height={251} className="brand-mark" />
            <p>
              <span className="brand-name">FLEXOO</span>
              <span className="brand-sub">SOFTWARE HOUSE</span>
            </p>
          </div>
          <p className="social">
            <Image src="/brand/social-1.svg" alt="" width={21} height={21} />
            <Image src="/brand/social-2.svg" alt="" width={21} height={21} />
            <span>@flexoo.id</span>
          </p>
        </header>

        <div className="hero">
          <figure className="polaroid" aria-hidden="true">
            <Image className="pin" src="/brand/thumbtack.png" alt="" width={76} height={76} priority />
            <div className="polaroid-photo">
              <Image src="/brand/logo-mark-dark.svg" alt="" width={263} height={264} />
            </div>
            <figcaption>
              <span className="polaroid-name">
                <Image className="polaroid-swash" src="/brand/logo-wordmark-underline.svg" alt="" width={203} height={31} />
                <span>FLEXOO</span>
              </span>
              <span className="polaroid-sub">SOFTWARE HOUSE</span>
            </figcaption>
          </figure>

          <div className="panel-stack">
            <section className="panel">
              <h1 className="judul">
                <span>CEK</span>
                <span>HASILMU</span>
              </h1>
              <p className="lead">Pengumuman Open Recruitment Flexoo 2027</p>

              <form action={formAction} className="cari">
                <label htmlFor="nrp">Masukkan NRP kamu</label>
                <div className="cari-baris">
                  <input
                    id="nrp"
                    name="nrp"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="5025241001"
                    defaultValue={state.status === "idle" ? "" : state.nrp}
                    required
                    aria-describedby="nrp-pesan"
                  />
                  <button type="submit" className="pill" disabled={pending}>
                    {pending ? "Mengecek…" : "Cek hasil"}
                  </button>
                </div>
                <p id="nrp-pesan" className="pesan-form" aria-live="polite">
                  {state.status === "invalid" && "NRP terdiri dari 10 angka. Periksa lagi lalu cek ulang."}
                </p>
              </form>
            </section>
          </div>
        </div>
      </div>

      <section
        ref={hasilRef}
        tabIndex={-1}
        className="editor"
        data-hasil={ada ? state.status : undefined}
        aria-labelledby="hasil-judul"
        aria-live="polite"
      >
        <div className="tabs" aria-hidden="true">
          <span className="tab">
            <b>&lt;&gt;</b> nrp.jsx
          </span>
          <span className="tab tab-aktif">
            <b>&lt;&gt;</b> hasil.jsx <i>×</i>
          </span>
        </div>

        <div className="kode">
          <Kode state={state} pending={pending} />

          <div className="pesan" key={ada ? state.nrp : "kosong"}>
            {state.status === "lolos" && <Diterima nrp={state.nrp} p={state.penerimaan} />}
            {state.status === "tidak" && (
              <>
                <p className="pesan-nrp">
                  Hasil untuk NRP <b>{state.nrp}</b>. Kalau NRP-nya salah ketik, perbaiki di atas lalu cek ulang.
                </p>
                <h2 id="hasil-judul">Tetap semangat!</h2>
                <p>
                  Terima kasih sudah mendaftar dan mempercayakan waktumu pada Oprec Flexoo 2027. 🙏 Untuk kali
                  ini kamu belum bisa bergabung bersama Flexoo 2027. Itu bukan akhir perjalananmu: Oprec Flexoo
                  Academy 14–23 Desember 2027. Kami tunggu pendaftaranmu! Pantau info di Instagram{" "}
                  <a href="https://www.instagram.com/flexoo.id/">@flexoo.id</a>. 💛
                </p>
              </>
            )}
            {!ada && (
              <h2 id="hasil-judul" className="pesan-kosong">
                Hasil seleksi kamu akan muncul di sini.
              </h2>
            )}
          </div>
        </div>
      </section>

      <footer className="kaki">© 2027 Flexoo Software House</footer>
    </div>
  );
}

function Diterima({ nrp, p }: { nrp: string; p: Penerimaan }) {
  return (
    <>
      <p className="pesan-nrp">
        Hasil untuk NRP <b>{nrp}</b>
      </p>
      <h2 id="hasil-judul">🎉 CONGRATULATIONS! YOU&apos;RE IN!</h2>
      <p>
        <b>Welcome to Flexoo 2027!</b>
      </p>
      <p>
        Selamat! Kamu telah berhasil melewati seluruh tahapan seleksi Open Recruitment Flexoo 2027 dan resmi
        diterima sebagai{p.management && " bagian dari"}:
      </p>
      <p className="posisi">
        {p.posisi}
        {p.subdivisi && <span>Divisi: {p.subdivisi}</span>}
      </p>
      <p>We&apos;re excited to have you on board!</p>
      <p>Terima kasih atas usaha, antusiasme, dan komitmen yang telah kamu tunjukkan selama proses seleksi.</p>
      {p.management ? (
        <>
          <p>Perjalanan barumu bersama Flexoo dimulai di sini!</p>
          <p>Sebagai langkah awal, silakan bergabung ke grup WhatsApp resmi sesuai divisi pilihan kamu melalui tautan berikut.</p>
        </>
      ) : (
        <p>
          Perjalanan barumu bersama Flexoo dimulai di sini! Sebagai langkah awal, silakan bergabung ke grup WhatsApp
          resmi {p.posisi} melalui tautan berikut.
        </p>
      )}
      <p>
        <a className="pill" href={p.link} target="_blank" rel="noopener noreferrer">
          🔗 {p.grup}
        </a>
      </p>
      <p>
        {p.management
          ? "Pastikan kamu bergabung ke grup divisi yang sesuai dengan hasil seleksi, menggunakan nomor WhatsApp aktif, serta mengikuti informasi dan arahan selanjutnya di dalam grup."
          : "Pastikan kamu bergabung menggunakan nomor WhatsApp aktif dan mengikuti informasi serta arahan selanjutnya di dalam grup."}
      </p>
      <p className="penutup">
        {p.management ? "Let's lead, collaborate, and grow together! 🚀" : "Let's build something great together! 🚀"}
        <br />
        Flexoo Software House 2027
      </p>
    </>
  );
}

/** Decorative code lines echoing the oprec poster; the real message is in the heading below. */
function Kode({ state, pending }: { state: HasilCek; pending: boolean }) {
  const nrp = state.status === "idle" ? "" : state.nrp;
  const ada = state.status === "lolos" || state.status === "tidak";

  const baris: ReactNode[] = [
    <>
      import {"{ "}
      <mark>hasil</mark>
      {" }"} from &quot;@/oprec-2027&quot;;
    </>,
    "",
    <>const nrp = &quot;{nrp}&quot;;</>,
    <>const status = await hasil(nrp);</>,
    "",
    pending ? (
      <>
        {"// mengecek"}
        <span className="kursor" />
      </>
    ) : ada ? (
      <>
        {"// → "}
        <mark className="mark-hasil">{state.status === "lolos" ? "\"LOLOS\"" : "\"BELUM LOLOS\""}</mark>
      </>
    ) : (
      <>
        {"// ketik NRP di atas"}
        <span className="kursor" />
      </>
    ),
  ];

  return (
    <ol className="baris" aria-hidden="true">
      {baris.map((isi, i) => (
        <li key={i}>
          <code>{isi}</code>
        </li>
      ))}
    </ol>
  );
}
