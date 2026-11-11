"use client";

import { useActionState, useEffect, useRef, type CSSProperties } from "react";
import { cekHasil, type HasilCek } from "./actions";

const HURUF = ["f", "l", "e", "x", "o", "o"];

export function CekHasil() {
  const [state, formAction, pending] = useActionState<HasilCek, FormData>(cekHasil, { status: "idle" });
  const hasilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") hasilRef.current?.focus();
  }, [state]);

  const mode = pending ? "pending" : state.status;

  return (
    <main className="wrap">
      <p className="wordmark" data-mode={mode} aria-label="flexoo">
        {HURUF.map((h, i) => (
          <span key={i} aria-hidden="true" style={{ "--i": i } as CSSProperties}>
            {h}
          </span>
        ))}
      </p>

      <h1 className="judul">Pengumuman hasil rekrutmen Flexoo Software House</h1>
      <p className="intro">
        Terima kasih sudah mendaftar. Masukkan NRP kamu untuk melihat hasil seleksi.
      </p>

      <form action={formAction} className="cari">
        <label htmlFor="nrp">NRP</label>
        <div className="cari-baris">
          <input
            id="nrp"
            name="nrp"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Contoh: 5025241001"
            defaultValue={state.status === "idle" ? "" : state.nrp}
            required
            aria-describedby="nrp-pesan"
          />
          <button type="submit" disabled={pending}>
            {pending ? "Mengecek…" : "Cek hasil"}
          </button>
        </div>
        <p id="nrp-pesan" className="pesan-form" aria-live="polite">
          {state.status === "invalid" && "NRP hanya berisi angka. Periksa lagi lalu coba cek ulang."}
          {state.status === "notfound" &&
            `NRP ${state.nrp} tidak ada di daftar pendaftar. Pastikan angkanya benar.`}
        </p>
      </form>

      <div ref={hasilRef} tabIndex={-1} aria-live="polite" className="hasil-slot">
        {(state.status === "lolos" || state.status === "tidak") && (
          <section key={state.nrp} className="hasil" data-hasil={state.status}>
            {state.status === "lolos" ? (
              <>
                <h2>Selamat, {state.nama}!</h2>
                <p>
                  Kamu lolos seleksi rekrutmen Flexoo Software House. Info tahap berikutnya akan kami
                  kirimkan lewat kontak yang kamu daftarkan.
                </p>
              </>
            ) : (
              <>
                <h2>Tetap semangat, {state.nama}.</h2>
                <p>
                  Kamu belum lolos di rekrutmen kali ini. Terima kasih sudah meluangkan waktu untuk
                  mendaftar, dan semoga kita bertemu lagi di kesempatan berikutnya.
                </p>
              </>
            )}
            <p className="hasil-nrp">NRP {state.nrp}</p>
          </section>
        )}
      </div>

      <footer className="kaki">© 2026 Flexoo Software House</footer>
    </main>
  );
}
