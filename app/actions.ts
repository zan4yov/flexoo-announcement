"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { DIVISI, type Penerimaan } from "./divisi";

export type HasilCek =
  | { status: "idle" }
  | { status: "invalid"; nrp: string }
  | { status: "tidak"; nrp: string }
  | { status: "lolos"; nrp: string; penerimaan: Penerimaan };

const CSV_PATH = path.join(process.cwd(), "data", "lolos.csv");
const NRP = /^\d{10}$/;

// The list is read on the server only, so it never reaches the browser.
// Read per request so edits to the CSV apply without a restart; the file is small.
async function bacaLolos(): Promise<Map<string, Penerimaan>> {
  const raw = (await readFile(CSV_PATH, "utf8")).replace(/^﻿/, "");
  const [header, ...baris] = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
  // Excel with Indonesian locale exports with ";" instead of ",".
  const sep = header.includes(";") ? ";" : ",";
  const kolom = header.split(sep).map((k) => k.trim().toLowerCase());
  const iNrp = kolom.indexOf("nrp");
  const iDivisi = kolom.indexOf("divisi");
  if (iNrp < 0 || iDivisi < 0) throw new Error('lolos.csv harus punya kolom "nrp" dan "divisi"');

  const lolos = new Map<string, Penerimaan>();
  baris.forEach((line, i) => {
    const sel = line.split(sep);
    const nrp = (sel[iNrp] ?? "").replace(/\s+/g, "");
    const divisi = (sel[iDivisi] ?? "").trim();
    const penerimaan = DIVISI[divisi.toLowerCase()];
    // Fail loudly on bad rows: a typo must never silently show someone the wrong result.
    if (!NRP.test(nrp)) throw new Error(`lolos.csv baris ${i + 2}: "${nrp}" bukan NRP 10 digit`);
    if (lolos.has(nrp)) throw new Error(`lolos.csv baris ${i + 2}: NRP ${nrp} muncul dua kali`);
    if (!penerimaan) throw new Error(`lolos.csv baris ${i + 2}: divisi "${divisi}" tidak dikenal`);
    lolos.set(nrp, penerimaan);
  });
  return lolos;
}

export async function cekHasil(_prev: HasilCek, formData: FormData): Promise<HasilCek> {
  const nrp = String(formData.get("nrp") ?? "").replace(/\s+/g, "");
  if (!NRP.test(nrp)) return { status: "invalid", nrp };
  // Only passing NRPs are listed, so any other valid NRP did not pass.
  const penerimaan = (await bacaLolos()).get(nrp);
  return penerimaan ? { status: "lolos", nrp, penerimaan } : { status: "tidak", nrp };
}
