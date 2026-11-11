"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";

export type HasilCek =
  | { status: "idle" }
  | { status: "invalid"; nrp: string }
  | { status: "lolos" | "tidak"; nrp: string };

const CSV_PATH = path.join(process.cwd(), "data", "lolos.csv");
const NRP = /^\d{10}$/;

// The list is read on the server only, so it never reaches the browser.
// Read per request so edits to the CSV apply without a restart; the file is small.
async function bacaLolos(): Promise<Set<string>> {
  const raw = (await readFile(CSV_PATH, "utf8")).replace(/^﻿/, "");
  const [header, ...baris] = raw.split(/\r?\n/).filter((l) => l.trim() !== "");
  // Excel with Indonesian locale exports with ";" instead of ",".
  const sep = header.includes(";") ? ";" : ",";
  const iNrp = header.split(sep).map((k) => k.trim().toLowerCase()).indexOf("nrp");
  if (iNrp < 0) throw new Error('lolos.csv harus punya kolom "nrp"');

  const lolos = new Set<string>();
  baris.forEach((line, i) => {
    const nrp = (line.split(sep)[iNrp] ?? "").replace(/\s+/g, "");
    // Fail loudly on bad rows: a typo must never silently show someone the wrong result.
    if (!NRP.test(nrp)) throw new Error(`lolos.csv baris ${i + 2}: "${nrp}" bukan NRP 10 digit`);
    if (lolos.has(nrp)) throw new Error(`lolos.csv baris ${i + 2}: NRP ${nrp} muncul dua kali`);
    lolos.add(nrp);
  });
  return lolos;
}

export async function cekHasil(_prev: HasilCek, formData: FormData): Promise<HasilCek> {
  const nrp = String(formData.get("nrp") ?? "").replace(/\s+/g, "");
  if (!NRP.test(nrp)) return { status: "invalid", nrp };
  // Only passing NRPs are listed, so any other valid NRP did not pass.
  return { status: (await bacaLolos()).has(nrp) ? "lolos" : "tidak", nrp };
}
