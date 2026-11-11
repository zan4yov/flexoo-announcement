"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { cekHasil, type HasilCek } from "./actions";

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
                  {state.status === "invalid" && "NRP hanya berisi angka. Periksa lagi lalu cek ulang."}
                  {state.status === "notfound" &&
                    `NRP ${state.nrp} tidak ada di daftar pendaftar. Pastikan angkanya benar.`}
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
            {state.status === "lolos" && (
              <>
                <h2 id="hasil-judul">Selamat, {state.nama}!</h2>
                <p>
                  Kamu lolos seleksi Open Recruitment Flexoo 2027. Info tahap berikutnya akan kami
                  kirimkan lewat kontak yang kamu daftarkan.
                </p>
              </>
            )}
            {state.status === "tidak" && (
              <>
                <h2 id="hasil-judul">Tetap semangat, {state.nama}!</h2>
                <p>
                  Kamu belum lolos di Open Recruitment kali ini. Terima kasih sudah meluangkan waktu untuk
                  mendaftar, dan semoga kita bertemu lagi di kesempatan berikutnya.
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
