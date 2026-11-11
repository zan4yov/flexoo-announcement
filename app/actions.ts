"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";

export type HasilCek =
  | { status: "idle" }
  | { status: "invalid"; nrp: string }
  | { status: "notfound"; nrp: string }
  | { status: "lolos" | "tidak"; nrp: string; nama: string };

type Pelamar = { nama: string; lolos: boolean };

const CSV_PATH = path.join(process.cwd(), "data", "hasil.csv");

// Data is read on the server only, so the full applicant list never reaches the browser.
// Read per request so edits to the CSV apply without a restart; the file is small.
async function bacaHasil(): Promise<Map<string, Pelamar>> {
  const raw = (await readFile(CSV_PATH, "utf8")).replace(/^﻿/, "");
  const [header, ...baris] = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
  // Excel with Indonesian locale exports with ";" instead of ",".
  const sep = header.includes(";") ? ";" : ",";
  const kolom = header.split(sep).map((k) => k.trim().toLowerCase());
  const iNrp = kolom.indexOf("nrp");
  const iNama = kolom.indexOf("nama");
  const iHasil = kolom.indexOf("hasil");
  if (iNrp < 0 || iNama < 0 || iHasil < 0) {
    throw new Error('hasil.csv harus punya kolom "nrp", "nama", dan "hasil"');
  }

  const data = new Map<string, Pelamar>();
  baris.forEach((line, i) => {
    const sel = line.split(sep).map((s) => s.trim());
    const nrp = sel[iNrp];
    const hasil = sel[iHasil]?.toLowerCase();
    // Fail loudly on bad rows: a typo must never silently show someone the wrong result.
    if (hasil !== "lolos" && hasil !== "tidak") {
      throw new Error(`hasil.csv baris ${i + 2}: kolom hasil harus "lolos" atau "tidak", bukan "${sel[iHasil]}"`);
    }
    if (data.has(nrp)) {
      throw new Error(`hasil.csv baris ${i + 2}: NRP ${nrp} muncul dua kali`);
    }
    data.set(nrp, { nama: sel[iNama], lolos: hasil === "lolos" });
  });
  return data;
}

export async function cekHasil(_prev: HasilCek, formData: FormData): Promise<HasilCek> {
  const nrp = String(formData.get("nrp") ?? "").replace(/\s+/g, "");
  if (!/^\d{1,20}$/.test(nrp)) return { status: "invalid", nrp };

  const pelamar = (await bacaHasil()).get(nrp);
  if (!pelamar) return { status: "notfound", nrp };
  return { status: pelamar.lolos ? "lolos" : "tidak", nrp, nama: pelamar.nama };
}
